import Image from "next/image";
import Link from "next/link";

export function HeroBanner() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-hero min-h-[360px] min-[390px]:min-h-[400px] sm:min-h-[460px] md:min-h-[510px] lg:min-h-[550px] xl:min-h-[600px]">
      <div className="absolute inset-0 -z-20 h-165 w-full">
        <Image
          src="/d621727966d80500cb8ab5b8dfba5627e47f588b.png"
          alt="Built for the ones building - Verstivo footwear banner"
          fill
          priority
          quality={95}
          sizes="60vw"
          className="object-cover object-[100%_top]"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/45 via-black/20 to-transparent sm:from-black/40 sm:via-black/15 sm:to-transparent" />

      <div className="mx-auto flex w-full max-w-[1720px] min-h-[360px] min-[390px]:min-h-[400px] sm:min-h-[460px] md:min-h-[510px] lg:min-h-[550px] xl:min-h-[600px] items-center px-3 min-[375px]:px-5 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-14">
        <div className="max-w-[300px] min-[375px]:max-w-[340px] sm:max-w-[420px] lg:max-w-[500px] text-white">
          <h1 className="text-[28px] min-[375px]:text-[32px] min-[425px]:text-[36px] sm:text-[44px] md:text-[48px] lg:text-[54px] xl:text-[60px] font-bold leading-[1.05] tracking-[-0.035em] drop-shadow-xs">
            Built for the ones
            <br />
            building
          </h1>
          <p className="mt-3 sm:mt-4 max-w-[290px] min-[375px]:max-w-[320px] sm:max-w-[380px] lg:max-w-[440px] text-[12.5px] min-[375px]:text-[13.5px] sm:text-[15px] lg:text-[16px] font-medium leading-[1.4] text-white/95 drop-shadow-xs">
            Join 400,000+ people who have already received their recommendation.
          </p>
          <Link
            href="/bestsellers"
            className="mt-6 sm:mt-8 inline-flex h-9.5 min-[375px]:h-10 sm:h-11 items-center justify-center rounded-full bg-primary hover:bg-primary-hover px-5 sm:px-6 text-[12.5px] min-[375px]:text-[13.5px] sm:text-[15px] lg:text-[16px] font-semibold text-white !text-white shadow-md transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Shop Bestseller
          </Link>
        </div>
      </div>
    </section>
  );
}

