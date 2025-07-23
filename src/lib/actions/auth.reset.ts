import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth } from "@/firebase/client";
import { AuthError } from "firebase/auth";

export async function resetPassword(email: string): Promise<{ success: boolean; message: string }> {
  try {
    if (!email) {
      return {
        success: false,
        message: "Please enter a valid email address",
      };
    }

    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: "Password reset email sent successfully. Check your inbox.",
    };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    const firebaseError = error as AuthError;
    if (firebaseError.code === "auth/user-not-found") {
      return {
        success: false,
        message: "No user found with this email address.",
      };
    }
    if (firebaseError.code === "auth/invalid-email") {
      return {
        success: false,
        message: "Invalid email address.",
      };
    }
    return {
      success: false,
      message: `Failed to send password reset email: ${firebaseError.message || String(error)}`,
    };
  }
}

export async function logout(): Promise<{ success: boolean; message: string }> {
  try {
    // Sign out from Firebase Authentication
    await signOut(auth);

    // Clear session cookie via server-side API
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to clear session cookie:", error);
      return {
        success: false,
        message: `Failed to log out: ${error.message || "Server error"}`,
      };
    }

    return {
      success: true,
      message: "Logged out successfully.",
    };
  } catch (error) {
    console.error("Error during logout:", error);
    const firebaseError = error as AuthError;
    return {
      success: false,
      message: `Failed to log out: ${firebaseError.message || String(error)}`,
    };
  }
}