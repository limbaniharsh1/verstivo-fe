import Image from "next/image";
import Link from "next/link";

export function HeroBanner() {
  return (
    <section className="relative isolate min-h-[420px] min-[390px]:min-h-[460px] sm:min-h-[520px] md:min-h-[560px] lg:min-h-[640px] xl:min-h-[680px] w-full overflow-hidden bg-hero">
      <div className="absolute inset-0 -z-20 h-full w-full">
        <Image
          src="/image 4.png"
          alt="Two people relaxing at home while wearing Verstivo footwear"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[65%_center] sm:object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/55 via-black/35 to-transparent sm:from-black/45 sm:via-black/20 sm:to-transparent" />

      <div className="mx-auto flex min-h-[420px] min-[390px]:min-h-[460px] sm:min-h-[520px] md:min-h-[560px] lg:min-h-[640px] xl:min-h-[680px] max-w-[1585px] items-center px-5 py-12 min-[375px]:px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-[300px] min-[375px]:max-w-[340px] sm:max-w-[420px] lg:max-w-[500px] text-white">
          <h1 className="text-[28px] min-[375px]:text-[32px] min-[425px]:text-[36px] sm:text-[44px] md:text-[48px] lg:text-[56px] xl:text-[64px] font-bold leading-[1.05] tracking-[-0.035em] drop-shadow-xs">
            Built for the ones
            <br />
            building
          </h1>
          <p className="mt-3 sm:mt-4 max-w-[290px] min-[375px]:max-w-[320px] sm:max-w-[380px] lg:max-w-[440px] text-[12.5px] min-[375px]:text-[13.5px] sm:text-[15px] lg:text-[17px] font-medium leading-[1.4] text-white/95 drop-shadow-xs">
            Join 400,000+ people who have already received their recommendation.
          </p>
          <Link
            href="/bestsellers"
            className="mt-6 sm:mt-8 inline-flex h-9.5 min-[375px]:h-10 sm:h-11 items-center justify-center rounded-full bg-primary px-5 sm:px-6 text-[12.5px] min-[375px]:text-[13.5px] sm:text-[15px] lg:text-[16px] font-semibold text-primary-contrast shadow-md transition-all hover:bg-primary-hover active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Shop Bestseller
          </Link>
        </div>
      </div>
    </section>
  );
}

