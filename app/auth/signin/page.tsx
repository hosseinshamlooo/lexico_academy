"use client";

import { SignIn } from "@clerk/nextjs";

export default function SigninPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-100/70">
      <div>
        <SignIn
          path="/signin"
          routing="path"
          signUpUrl="/signup"
          afterSignInUrl="/dashboard"
          appearance={{
            elements: {
              card: "rounded-3xl border-3 border-[#1D5554] shadow-[0_8px_0_0_#1D5554] bg-white p-8 md:p-10",
              formButtonPrimary: "btn-lifted-green w-full",
              headerTitle:
                "text-4xl md:text-5xl font-extrabold text-center tracking-tighter mb-2 text-[#1D5554] font-[var(--font-body)]",
              headerSubtitle:
                "text-gray-400 text-base font-bold md:text-lg text-center max-w-2xl mb-6",
              formFieldInput: "input input-bordered w-full placeholder",
              footerActionText: "text-[#1D5554] text-center",
              footerActionLink: "text-[#1D5554] hover:underline font-semibold",
            },
            variables: {
              colorPrimary: "#1D5554",
              colorText: "#1D5554",
              fontFamily: "var(--font-body), Inter, sans-serif",
            },
          }}
        />
      </div>
    </div>
  );
}
