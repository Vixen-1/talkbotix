"use client";
import React from "react";
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
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: FormSchema) {
    try {
      if (!isSignIn) {
        console.log("sign-up", values);
        toast.success("Account created successfully!");
        router.push("/sign-in");
      } else {
        console.log("sign-in", values);
        toast.success("SignIn Successful!");
      }
    } catch (e) {
      console.error(e);
      toast.error(`An unknown error occurred: ${e}`);
    }
  }

  const FormFields: FormFieldConfig[] = isSignIn
    ? [
        { name: "email", label: "Email", placeholder: "Your Email Here", type: "email" },
        { name: "password", label: "Password", placeholder: "Your Password Here", type: "password" },
      ]
    : [
        { name: "name", label: "Name", placeholder: "Your Name Here", type: "text" },
        { name: "email", label: "Email", placeholder: "Your Email Here", type: "email" },
        { name: "password", label: "Password", placeholder: "Your Password Here", type: "password" },
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
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "No Account Yet?" : "Have an account already"}
          <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-user-primary ml-1">
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;