"use server";
import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK: number = 60 * 60 * 24 * 7;
export async function signUp(params: SignUpParams) {
  const { uid, name, email, password } = params;
  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: `User already exists. Please sign in instead`,
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
      password
    });

    return {
      success: true,
      message: "You have successfully created an account!",
    };
  } catch (e) {
    console.error("Error creating user: ", e);
    return {
      success: false,
      message: `Failed to create an account`,
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
  } catch (e) {
    console.error("Error creating user: ", e);
    return {
      success: false,
      message: `Failed to log into an account: ${
        e instanceof Error ? e.message : String(e)
      }`,
    };
  }
}

export async function setSessionCookie(idToken: string) {
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
}
