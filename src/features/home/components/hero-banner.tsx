import Image from "next/image";
import Link from "next/link";

export function HeroBanner() {
  return (
    <section className="relative isolate min-h-[450px] overflow-hidden bg-hero sm:min-h-[540px] lg:min-h-[620px]">
      <div className="absolute -top-[115px] left-0 right-0 -z-20 h-[calc(100%+115px)] w-full">
        <Image
          src="/image 4.png"
          alt="Two people relaxing at home while wearing Verstivo footwear"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="mx-auto flex min-h-[450px] max-w-[1585px] items-center px-4 py-16 sm:min-h-[540px] sm:px-8 lg:min-h-[620px] 2xl:px-12">
        <div className="max-w-[320px] text-white sm:max-w-[400px] lg:max-w-[460px]">
          <h1 className="text-[32px] leading-[1.08] font-semibold tracking-[-0.035em] sm:text-[40px] lg:text-[46px] xl:text-[52px]">
            Built for the ones
            <br />
            building
          </h1>
          <p className="mt-4 max-w-[310px] text-[13px] leading-[1.4] text-white/95 sm:max-w-[360px] sm:text-[14px] lg:text-[15px]">
            Join 400,000+ people who have already received their recommendation.
          </p>
          <Link
            href="/bestsellers"
            className="mt-8 inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-[12px] font-semibold text-primary-contrast transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:h-11 lg:px-6 lg:text-[13px]"
          >
            Shop Bestseller
          </Link>
        </div>
      </div>
    </section>
  );
}
