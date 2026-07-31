import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AccountView } from "@/features/account/components/account-view";

export const metadata = {
  title: "Account | BLUPAIR",
  description: "Manage your personal information, address, and orders at BLUPAIR.",
};

export default function AccountPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-clip min-h-[65vh]">
        <Suspense fallback={<div className="min-h-[50vh] bg-white" />}>
          <AccountView />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
