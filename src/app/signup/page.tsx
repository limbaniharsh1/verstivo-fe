import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CreateAccountForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Create Account | Verstivo",
  description: "Create a new Verstivo account.",
};

export default function SignupPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-white">
        <CreateAccountForm />
      </main>
      <SiteFooter />
    </>
  );
}
