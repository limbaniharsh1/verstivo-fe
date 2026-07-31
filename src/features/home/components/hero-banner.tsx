import Image from "next/image";
import Link from "next/link";

export function HeroBanner() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-hero min-h-[360px] min-[390px]:min-h-[400px] sm:min-h-[460px] md:min-h-[510px] lg:min-h-[550px] xl:min-h-[600px] 3xl:min-h-[660px]">
      <div className="absolute inset-0 -z-20 h-full w-full">
        <Image
          src="/banner.png"
          alt="Built for the ones building - Blupair footwear banner"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[100%_top]"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-black/40 sm:hidden" />

      <div className="container-main flex min-h-[360px] min-[390px]:min-h-[400px] sm:min-h-[460px] md:min-h-[510px] lg:min-h-[550px] xl:min-h-[607px] 3xl:min-h-[660px] items-center py-8 sm:py-12 md:py-14">
        <div className="max-w-[300px] min-[375px]:max-w-[340px] sm:max-w-[420px] lg:max-w-[500px] 3xl:max-w-[650px] text-white">
          <h1 className="text-[34px] min-[425px]:text-[36px] sm:text-[44px] md:text-[48px] lg:text-[54px] xl:text-[61px] 3xl:text-[76px] font-medium leading-[1.05]  drop-shadow-xs">
            Built for the ones
            <br />
            building
          </h1>
          <p className="mt-3 sm:mt-4 max-w-[290px] min-[375px]:max-w-[320px] sm:max-w-[380px] lg:max-w-[460px] 3xl:max-w-[550px] text-base sm:text-[15px] lg:text-[19px] 3xl:text-[21px] font-normal leading-[1.4] text-white drop-shadow-xs">
            Join 400,000+ people who have already received their recommendation.
          </p>
          <Link
            href="/bestsellers"
            className="mt-6 sm:mt-7.75 inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary-hover px-6 py-3 text-[13px] sm:text-[15px] lg:text-[16px] font-normal text-white !text-white shadow-md transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Shop Bestseller
          </Link>
        </div>
      </div>
    </section>
  );
}

