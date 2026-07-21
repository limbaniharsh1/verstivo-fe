import Image from "next/image";
import Link from "next/link";

export function SocialGallery() {
  return (
    <section className="grid bg-soft-surface md:grid-cols-[38.3%_24.3%_37.4%]">
      <div className="flex min-h-[360px] items-center px-7 py-12 sm:px-12 lg:px-10 xl:px-16">
        <div className="w-full max-w-[360px]">
          <h2 className="text-[28px] leading-tight font-semibold tracking-[-0.03em]">
            @verstivo.in
          </h2>
          <p className="mt-5 max-w-[330px] text-[14px] leading-[1.35]">
            Share your VERSTIVO-Style and inspire others! Just mention @verstivo.in on Instagram
            to become part of our highlight gallery.
          </p>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="primary-cta mt-6 inline-flex min-h-10 items-center justify-center rounded-full bg-primary px-5 text-[12px] font-medium transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Follow Us
          </Link>
        </div>
      </div>

      <div className="relative min-h-[460px] md:min-h-[386px]">
        <Image
          src="/assets/footer/57ec43477f87aea1a99daaf3a971dcc37eeccede.png"
          alt="Verstivo community member wearing clogs by a marina"
          fill
          sizes="(max-width: 767px) 100vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="grid min-h-[460px] grid-rows-2 md:min-h-[386px]">
        <div className="relative">
          <Image
            src="/assets/footer/Rectangle 40128.png"
            alt="Black Verstivo sandals styled outdoors"
            fill
            sizes="(max-width: 767px) 100vw, 38vw"
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-0.5">
          <div className="relative">
            <Image
              src="/assets/footer/0a819d7e99ed18bdba7d06fd2491556cd0239060.png"
              alt="Verstivo community member wearing clogs by the sea"
              fill
              sizes="(max-width: 767px) 50vw, 19vw"
              className="object-cover"
            />
          </div>
          <div className="relative">
            <Image
              src="/assets/footer/d12d9f5e4cee99035a4e54e087dd77a83bb266f5.png"
              alt="Verstivo community member wearing sandals at a marina"
              fill
              sizes="(max-width: 767px) 50vw, 19vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
