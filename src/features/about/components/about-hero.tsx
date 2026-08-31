import Image from "next/image";

export function AboutHero() {
  return (
    <section className="w-full bg-[#f4f4ff] overflow-hidden" aria-labelledby="who-is-champls-heading">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[620px]">
        {/* Left Column - Craftsmanship Image */}
        <div className="relative min-h-[340px] sm:min-h-[440px] lg:min-h-[620px] w-full bg-slate-100">
          <Image
            src="/assets/images/b7bd49f0deb28b664665e620db64c07b27969e3f.jpg"
            alt="Shoemaker artisan carefully crafting premium footwear by hand"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/5 lg:hidden" />
        </div>

        {/* Right Column - Brand Story Content */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 md:px-12 lg:px-14 xl:px-20 lg:py-16">
          <div className="max-w-xl mx-auto lg:mx-0">
            <h1
              id="who-is-champls-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-semibold tracking-tight text-slate-900 leading-[1.18]"
            >
              Who is CHAMPLS?
            </h1>

            <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5 text-sm sm:text-base lg:text-[15px] xl:text-[16px] leading-relaxed text-slate-700 font-medium">
              <p>
                CHAMPL is a modern Indian comfort footwear brand inspired by the humble champal—an
                everyday essential reimagined through thoughtful design, premium craftsmanship, and lasting
                comfort.
              </p>
              <p>
                We believe great footwear should do more than complete an outfit. It should support every
                step, fit effortlessly into everyday life, and stand the test of time.
              </p>
              <p>
                At CHAMPL, we combine clean aesthetics, quality materials, and functional design to create
                footwear that is comfortable, durable, and timeless. Our products are made for people who
                value simplicity, authenticity, and exceptional comfort.
              </p>
              <p className="pt-1 text-slate-900 font-semibold">
                More than a footwear brand, CHAMPL is a movement to transform an everyday necessity into an
                iconic symbol of Indian design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
