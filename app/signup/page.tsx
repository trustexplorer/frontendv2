"use client";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <div className="container mx-auto px-4 flex flex-col pb-10">
      <SignupForm />
    </div>
  );
}