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
        <div className="relative aspect-[0.88] w-full overflow-hidden bg-surface-muted">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 48vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        </div>

        <div className="pt-4 pb-2 text-left space-y-2">
          <h3 className="text-[16px] font-semibold text-foreground">
            {title}
          </h3>
          <p className="text-[11px] font-medium leading-snug uppercase text-muted tracking-wide max-w-[280px]">
            {subtitle}
          </p>
          <div className="pt-1.5">
            <span className="inline-flex h-10 items-center justify-center rounded-full bg-black px-5 text-[14px] font-semibold text-white transition-all group-hover:bg-neutral-800">
              Shop Now
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
