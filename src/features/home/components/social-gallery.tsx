import Image from "next/image";
import Link from "next/link";

export function SocialGallery() {
  return (
    <section className="grid overflow-x-clip bg-soft-surface grid-cols-1 md:grid-cols-[36%_28%_36%] lg:grid-cols-[38.3%_24.3%_37.4%]">
      <div className="flex items-center justify-center px-5 py-8 min-[380px]:px-6 min-[380px]:py-9 sm:px-10 sm:py-10 md:px-6 md:py-8 lg:px-10 lg:py-12 xl:px-16">
        <div className="w-full max-w-[380px]">
          <h2 className="text-[24px] min-[380px]:text-[28px] sm:text-[34px] md:text-[26px] lg:text-[36px] xl:text-[42px] leading-tight font-semibold tracking-[-0.03em] text-foreground">
            @verstivo.in
          </h2>
          <p className="mt-2.5 sm:mt-4 md:mt-3 lg:mt-4 text-[13.5px] min-[380px]:text-[14.5px] sm:text-[15.5px] md:text-[13.5px] lg:text-[16px] xl:text-[17px] font-medium leading-relaxed md:leading-snug lg:leading-relaxed text-foreground/90">
            Share your VERSTIVO-Style and inspire others! Just mention @verstivo.in on Instagram
            to become part of our highlight gallery.
          </p>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="primary-cta mt-4 sm:mt-5 md:mt-4 lg:mt-6 inline-flex h-9.5 sm:h-10 md:h-9 lg:h-10.5 items-center justify-center rounded-full bg-primary px-5 md:px-4.5 lg:px-6 text-[12.5px] sm:text-[13.5px] md:text-[12.5px] lg:text-[14px] font-semibold text-primary-contrast transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Follow Us
          </Link>
        </div>
      </div>

      <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-auto min-h-[260px] min-[420px]:min-h-[300px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-[500px] xl:min-h-[549px] w-full pr-[5px]">
        <div className="relative h-full w-full">
          <Image
            src="/assets/footer/57ec43477f87aea1a99daaf3a971dcc37eeccede.png"
            alt="Verstivo community member wearing clogs by a marina"
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 28vw, 24vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="grid grid-rows-2 gap-1 min-h-[260px] min-[420px]:min-h-[300px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-[500px] xl:min-h-[549px] w-full">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-auto w-full h-full">
          <Image
            src="/assets/footer/Rectangle 40128.png"
            alt="Black Verstivo sandals styled outdoors"
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 36vw, 37vw"
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-1 w-full h-full">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-auto w-full h-full">
            <Image
              src="/assets/footer/0a819d7e99ed18bdba7d06fd2491556cd0239060.png"
              alt="Verstivo community member wearing clogs by the sea"
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1023px) 18vw, 19vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-auto w-full h-full">
            <Image
              src="/assets/footer/d12d9f5e4cee99035a4e54e087dd77a83bb266f5.png"
              alt="Verstivo community member wearing sandals at a marina"
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1023px) 18vw, 19vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

