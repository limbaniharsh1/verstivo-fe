import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LoginForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Log In | Blupair",
  description: "Log in to your Blupair account.",
};

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-white">
        <LoginForm />
      </main>
      <SiteFooter />
    </>
  );
}
