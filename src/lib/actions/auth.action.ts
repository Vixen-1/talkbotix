"use server";
import { db, auth } from "@/firebase/admin";
import { FirebaseError } from "firebase/app";
import { cookies } from "next/headers";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth as clientAuth } from "@/firebase/client";

const ONE_WEEK: number = 60 * 60 * 24 * 7;
export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;
  try {
    if (!uid || !name || !email) {
      return {
        success: false,
        message: "Invalid input parameters",
      };
    }
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: `User already exists. Please sign in instead.`,
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (e: unknown) {
    console.error(`Error in signUp for email ${email}, uid ${uid}:`, e);
    if (e instanceof Error && "code" in e && typeof e.code === "string") {
      const firebaseError = e as FirebaseError;
      console.error(
        `Firebase error code: ${firebaseError.code}, message: ${firebaseError.message}`
      );
      return {
        success: false,
        message: `Failed to create an account: ${firebaseError.message} (code: ${firebaseError.code})`,
      };
    }
    return {
      success: false,
      message: `Failed to create an account: ${
        e instanceof Error ? e.message : String(e)
      }`,
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: `User does not exist. Create an account instead.`,
      };
    }
    await setSessionCookie(idToken);
    return {
      success: true,
      message: "Sign-in successful!",
    };
  } catch (e: unknown) {
    console.error(`Error signing in for email ${email}:`, e);
    return {
      success: false,
      message: `Failed to log into an account: ${e}`,
    };
  }
}

export async function setSessionCookie(idToken: string) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: ONE_WEEK * 1000,
    });
    cookieStore.set("session", sessionCookie, {
      maxAge: ONE_WEEK,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
  } catch (e: unknown) {
    console.error("Error creating session cookie:", e);
    throw e;
  }
}

// export async function deleteSessionCookie() {
//   try {
//     const cookieStore = cookies(); // No need for `await` here — cookies() is sync
//     await cookieStore.remove("session"); // Remove the session cookie
//   } catch (e: unknown) {
//     console.error("Error deleting session cookie:", e);
//     throw e;
//   }
// }


export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  // try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;
    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  // } catch (e) {
  //   console.error("Failed to get user details: ", e);
  //   return null;
  // }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}