"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/actions/auth.reset";
import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

type FormSchema = z.infer<ReturnType<typeof authFormSchema>>;

interface FormFieldConfig {
  name: keyof FormSchema;
  label: string;
  placeholder: string;
  type: string;
}

const AuthForm = ({ type }: { type: FormType }) => {
  const isSignIn = type === "sign-in";
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const [loading, setLoading] = useState<boolean>(false);
  const [resetLoading, setResetLoading] = useState<boolean>(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleSignUp({ name, email, password }: FormSchema) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const result = await signUp({
        uid: userCredential.user.uid,
        name: name!,
        email,
      });

      if (!result?.success) {
        toast.error(result?.message);
        return;
      }
      toast.success("Account created successfully! Please sign in.");
      router.push("/sign-in");
    } catch (error) {
      const firebaseError = error as AuthError;
      if (firebaseError.code === "auth/email-already-in-use") {
        toast.error(
          "This email is already in use. Please sign in or use a different email."
        );
        return;
      }
      throw error;
    }
  }

  async function handleSignIn({ email, password }: FormSchema) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();

      if (!idToken) {
        toast.error("Sign in failed: No ID token received.");
        return;
      }
      await signIn({ email, idToken });
      toast.success("Sign-in successful!");
      router.push("/");
    } catch (error) {
      const firebaseError = error as AuthError;
      if (firebaseError.code === "auth/invalid-credential") {
        toast.error("Please enter valid email or password");
        return;
      }
      throw error;
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      if (!isSignIn) {
        await handleSignUp(values);
      } else {
        await handleSignIn(values);
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast.error(`An unknown error occurred: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword() {
    setResetLoading(true);
    try {
      const email = form.getValues("email");
      const result = await resetPassword(email);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
    } catch (error) {
      console.error("Error in handleResetPassword:", error);
      toast.error(
        `Failed to send password reset email: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setResetLoading(false);
    }
  }

  const FormFields: FormFieldConfig[] = isSignIn
    ? [
        {
          name: "email",
          label: "Email",
          placeholder: "Your Email Here",
          type: "email",
        },
        {
          name: "password",
          label: "Password",
          placeholder: "Your Password Here",
          type: "password",
        },
      ]
    : [
        {
          name: "name",
          label: "Name",
          placeholder: "Your Name Here",
          type: "text",
        },
        {
          name: "email",
          label: "Email",
          placeholder: "Your Email Here",
          type: "email",
        },
        {
          name: "password",
          label: "Password",
          placeholder: "Your Password Here",
          type: "password",
        },
      ];

  return (
    <div className="card-border lg:min-[566px]">
      <div className="flex flex-col gap-6 card py-4 px-6">
        <div className="flex flex-row gap-2 justify-center">
          <Image src={"/logo.svg"} alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">TalkBotix</h2>
        </div>
        <h3 className="">Practice job interview with AI</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {FormFields.map((fields, index) => (
              <FormField
                key={index}
                control={form.control}
                name={fields.name}
                label={fields.label}
                placeholder={fields.placeholder}
                type={fields.type}
              />
            ))}
            <Button type="submit" className="btn">
              {isSignIn
                ? loading
                  ? "Signing In..."
                  : "Sign In"
                : loading
                ? "Creating Account......"
                : "Create an Account"}
            </Button>
            {isSignIn && (
              <div className="text-center">
                <Button
                  variant="link"
                  className="text-blue-700 underline"
                  onClick={handleResetPassword}
                  disabled={loading || resetLoading || !form.getValues("email")}
                >
                  {resetLoading ? "Sending..." : "Reset Password"}
                </Button>
              </div>
            )}
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "No Account Yet?" : "Have an account already"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
