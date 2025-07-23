import { sendPasswordResetEmail } from "firebase/auth";
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