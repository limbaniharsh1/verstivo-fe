import Image from "next/image";
import Link from "next/link";

export function HeroBanner() {
  return (
    <section className="relative isolate min-h-[404px] overflow-hidden bg-hero">
      <div className="absolute inset-y-0 right-0 -z-20 w-full sm:w-[76%]">
        <Image
          src="/assets/images/hero-lifestyle.jpg"
          alt="Two people relaxing at home while wearing Verstivo footwear"
          fill
          priority
          quality={92}
          sizes="(max-width: 640px) 100vw, 76vw"
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-hero-overlay" />

      <div className="mx-auto flex min-h-[404px] max-w-[1440px] items-center px-6 py-16 sm:px-10">
        <div className="max-w-[320px] text-white">
          <h1 className="text-[40px] leading-[1.08] font-medium tracking-[-0.035em] sm:text-[42px]">
            Built for the ones
            <br />
            building
          </h1>
          <p className="mt-3 max-w-[310px] text-[13px] leading-[1.35]">
            Join 400,000+ people who have already received their recommendation.
          </p>
          <Link
            href="/bestsellers"
            className="mt-5 inline-flex min-h-8 items-center justify-center rounded-full bg-primary px-4 text-[10px] text-primary-contrast transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Shop Bestseller
          </Link>
        </div>
      </div>
    </section>
  );
}
