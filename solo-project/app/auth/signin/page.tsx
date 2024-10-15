"use client";

import SignInForm from "../../components/SignInForm";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        <SignInForm />
      </div>
    </div>
  );
}
