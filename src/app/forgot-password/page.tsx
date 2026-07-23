import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ResetPasswordForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Reset Password | Verstivo",
  description: "Reset your Verstivo account password.",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-white">
        <ResetPasswordForm />
      </main>
      <SiteFooter />
    </>
  );
}
