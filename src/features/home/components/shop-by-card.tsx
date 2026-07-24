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

        <div className="pt-2 sm:pt-3 pb-2 text-left space-y-1 sm:space-y-1.5 px-0.5">
          <h3 className="text-[11.5px] min-[375px]:text-[12.5px] min-[425px]:text-[13.5px] sm:text-[14.5px] lg:text-[16px] font-bold text-foreground leading-tight tracking-tight">
            {title}
          </h3>
          <p className="text-[8.5px] min-[375px]:text-[9.5px] sm:text-[10px] lg:text-[10.5px] font-medium leading-normal uppercase text-muted tracking-wide max-w-[280px]">
            {subtitle}
          </p>
          <div className="pt-1">
            <span className="inline-flex h-7 min-[375px]:h-7.5 sm:h-8.5 lg:h-9.5 items-center justify-center rounded-full bg-black px-3 min-[375px]:px-3.5 sm:px-4 lg:px-5 text-[10px] min-[375px]:text-[10.5px] sm:text-[12px] lg:text-[13px] font-semibold text-white transition-all group-hover:bg-neutral-800 shadow-2xs">
              Shop Now
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}


