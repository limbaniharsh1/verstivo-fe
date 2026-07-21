import Image from "next/image";
import Link from "next/link";

type PromoCardProps = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "object-center" | "object-[center_62%]" | "object-[center_68%]";
};

export function PromoCard({
  title,
  description,
  href,
  linkLabel,
  imageSrc,
  imageAlt,
  imagePosition = "object-center",
}: PromoCardProps) {
  return (
    <article className="group relative isolate h-[clamp(360px,42vw,620px)] overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 767px) 100vw, 50vw"
        className={`-z-20 object-cover transition-transform duration-500 group-hover:scale-[1.02] ${imagePosition}`}
      />
      <div className="promo-overlay absolute inset-0 -z-10" />

      <div className="flex h-full items-end px-7 py-7 text-primary-contrast sm:px-10 sm:py-9 lg:px-12 lg:py-11">
        <div className="max-w-[360px]">
          <h2 className="text-[28px] leading-tight font-medium tracking-[-0.035em] sm:text-[32px]">
            {title}
          </h2>
          <p className="mt-2 max-w-[320px] text-[12px] leading-relaxed whitespace-pre-line sm:text-[13px]">
            {description}
          </p>
          <Link
            href={href}
            className="promo-cta mt-5 inline-flex min-h-10 items-center justify-center rounded-full bg-surface px-5 text-[12px] font-medium transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-contrast"
          >
            {linkLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
