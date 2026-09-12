import { BenefitsBar } from "@/components/common/benefits-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionRenderer } from "@/features/home/components/section-renderer";
import { getHomepageData } from "@/features/home/services/homepage.service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { sections } = await getHomepageData();

  return (
    <>
      <SiteHeader />
      <main className="overflow-x-clip">
        <SectionRenderer sections={sections} />
        <BenefitsBar />
      </main>
      <SiteFooter />
    </>
  );
}
