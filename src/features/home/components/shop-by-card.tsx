import Image from "next/image";
import Link from "next/link";

type ShopByCardProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export function ShopByCard({ href, imageSrc, imageAlt }: ShopByCardProps) {
  return (
    <article>
      <Link
        href={href}
        className="group block focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
      >
        <div className="relative aspect-[0.88] overflow-hidden bg-surface-muted">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 48vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        </div>

        <div className="px-5 pt-7 pb-3">
          <p className="max-w-[260px] text-[10px] leading-relaxed uppercase text-muted">
            Durable, easy-care styles with everyday comfort.
          </p>
          <span className="mt-5 inline-flex min-h-9 items-center justify-center rounded-full bg-foreground px-4 text-[12px] font-medium text-primary-contrast transition-opacity group-hover:opacity-80">
            Shop Now
          </span>
        </div>
      </Link>
    </article>
  );
}
