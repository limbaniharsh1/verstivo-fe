import Image from "next/image";
import Link from "next/link";

export function CraftsmanshipSection() {
  return (
    <section
      className="grid bg-soft-surface grid-cols-1 md:grid-cols-2 lg:grid-cols-[52%_48%]"
      aria-labelledby="craftsmanship-heading"
    >
      <div className="relative min-h-[320px] min-[420px]:min-h-[380px] sm:min-h-[440px] md:min-h-[480px] lg:min-h-[580px] xl:min-h-[640px] w-full h-full">
        <Image
          src="/assets/images/b7bd49f0deb28b664665e620db64c07b27969e3f.jpg"
          alt="Footwear artisan carefully crafting a shoe by hand"
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 52vw"
          className="object-cover object-center"
        />
      </div>

      <div className="flex items-center justify-center px-6 py-8 min-[420px]:px-7 sm:px-10 sm:py-10 md:px-6 md:py-8 lg:pl-12 lg:pr-8 lg:py-12 xl:pl-16 xl:pr-12 xl:py-16">
        <div className="max-w-[580px] w-full">
          <h2
            id="craftsmanship-heading"
            className="text-[22px] min-[420px]:text-[24px] sm:text-[28px] md:text-[24px] lg:text-[30px] xl:text-[36px] leading-tight font-semibold tracking-tight text-foreground"
          >
            Crafted for Every Step.
          </h2>

          <div className="mt-3 md:mt-3 lg:mt-4 space-y-2.5 sm:space-y-3 md:space-y-3 lg:space-y-4 xl:space-y-5 text-[14px] sm:text-[15px] md:text-[13.5px] lg:text-[15px] xl:text-[17px] leading-relaxed font-medium text-foreground/90">
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
            className="primary-cta mt-5 md:mt-4 lg:mt-6 inline-flex min-h-10 items-center justify-center rounded-full bg-primary px-5 text-[14px] sm:text-[15px] lg:text-[16px] font-medium transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            About Us
          </Link>
        </div>
      </div>
    </section>
  );
}

