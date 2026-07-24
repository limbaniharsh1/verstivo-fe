import Image from "next/image";
import Link from "next/link";

export function BestsellerHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#526145] text-white">
      {/* Aspect ratio banner container to display full lifestyle image */}
      <div className="relative w-full aspect-[3.3/1] min-h-[200px] max-h-[340px]">
        {/* Background Banner Image */}
        <Image
          src="/assets/banner/image 4.png"
          alt="Bestsellers banner featuring lifestyle models"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />

        {/* Hero Overlay Content - Centered vertically on left side */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto flex w-full max-w-[1585px] flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-1.5 sm:mb-2">
              <ol className="flex items-center text-xs sm:text-sm md:text-[15px] font-normal text-white">
                <li>
                  <Link href="/" className="transition-opacity hover:opacity-80">
                    Home
                  </Link>
                </li>
                <span className="mx-1 text-white/80">/</span>
                <li className="text-white" aria-current="page">
                  Bestsellers
                </li>
              </ol>
            </nav>

            {/* Main Page Title */}
            <h1 className="text-2xl font-semibold tracking-tight text-white min-[420px]:text-3xl sm:text-4xl md:text-[40px] lg:text-[44px] leading-tight">
              Bestsellers
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
