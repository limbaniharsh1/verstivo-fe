import Image from "next/image";
import Link from "next/link";

export function CraftsmanshipSection() {
  return (
    <section
      className="grid bg-soft-surface md:grid-cols-[52%_48%]"
      aria-labelledby="craftsmanship-heading"
    >
      <div className="relative min-h-[420px] md:min-h-[520px]">
        <Image
          src="/assets/images/b7bd49f0deb28b664665e620db64c07b27969e3f.jpg"
          alt="Footwear artisan carefully crafting a shoe by hand"
          fill
          sizes="(max-width: 767px) 100vw, 52vw"
          className="object-cover object-center"
        />
      </div>

      <div className="flex items-center px-7 py-12 sm:px-12 md:px-14 lg:px-20">
        <div className="max-w-[460px]">
          <h2
            id="craftsmanship-heading"
            className="text-[28px] leading-tight font-semibold tracking-[-0.035em] sm:text-[32px]"
          >
            Crafted for Every Step.
          </h2>

          <div className="mt-4 space-y-5 text-[13px] leading-[1.35] sm:text-[14px]">
            <p>At VERSTIVO, we believe that every step should feel as good as it looks.</p>
            <p>
              Our journey began with a simple vision—to create premium footwear that blends
              timeless design, lasting comfort, and exceptional quality. Every pair is
              thoughtfully crafted to support your everyday lifestyle, whether you&apos;re at
              work, traveling, or enjoying life&apos;s everyday moments.
            </p>
            <p>
              We focus on clean aesthetics, durable materials, and comfort-driven construction,
              ensuring that every product delivers confidence with every step.
            </p>
            <p>
              VERSTIVO is more than a footwear brand—it&apos;s a commitment to craftsmanship,
              comfort, and modern living.
            </p>
          </div>

          <Link
            href="/about"
            className="primary-cta mt-6 inline-flex min-h-10 items-center justify-center rounded-full bg-primary px-5 text-[12px] font-medium transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
