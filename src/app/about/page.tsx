import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BenefitsBar } from "@/components/common/benefits-bar";
import { AboutView } from "@/features/about";

export const metadata: Metadata = {
  title: "About Us | CHAMPL - Modern Indian Comfort Footwear",
  description:
    "Discover the story behind CHAMPL, our founder Sahil Gol's vision, and our mission to transform everyday Indian footwear into iconic, comfortable, and handcrafted design.",
  keywords: ["CHAMPL", "About Us", "Sahil Gol", "Footwear Craftsmanship", "Comfort Footwear India", "Pairborn"],
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white overflow-x-clip">
        <AboutView />
        <BenefitsBar />
      </main>
      <SiteFooter />
    </>
  );
}
