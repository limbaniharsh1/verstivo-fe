import Image from "next/image";
import Link from "next/link";

type ShopByCardProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title?: string;
  subtitle?: string;
};

export function ShopByCard({
  href,
  imageSrc,
  imageAlt,
  title = "EXPLORE BIRKO-FLOR ®",
  subtitle = "DURABLE, EASY-CARE STYLES WITH EVERYDAY COMFORT.",
}: ShopByCardProps) {
  return (
    <article className="w-full">
      <Link
        href={href}
        className="group block focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
      >
        <div className="relative aspect-[0.9] sm:aspect-[0.88] w-full overflow-hidden bg-surface-muted rounded-xs">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 639px) 48vw, (max-width: 1023px) 24vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="pb-2 text-left px-0.5">
          <h3 className="text-responsive-lg font-bold text-foreground leading-tight tracking-tight pt-1.5 sm:pt-2.5 xl:pt-4">
            {title}
          </h3>
          <p className="text-responsive-subtitle font-medium leading-normal uppercase text-muted tracking-wide max-w-[280px] pt-0.5 3xl:pt-1">
            {subtitle}
          </p>
          <div className="mt-2.5 xl:mt-4 3xl:mt-5">
            <span className="inline-flex items-center justify-center rounded-full bg-black px-5 3xl:px-6 py-2 sm:py-2.5 3xl:py-3 text-responsive-lg !font-normal text-white transition-all group-hover:bg-neutral-800 shadow-2xs">
              Shop Now
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}


