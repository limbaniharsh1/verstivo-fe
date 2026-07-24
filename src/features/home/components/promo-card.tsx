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
    <article className="group relative isolate h-[340px] min-[390px]:h-[380px] sm:h-[440px] md:h-[480px] lg:h-[560px] xl:h-[620px] w-full overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 767px) 100vw, 50vw"
        className={`-z-20 object-cover transition-transform duration-500 group-hover:scale-[1.025] ${imagePosition}`}
      />
      <div className="promo-overlay absolute inset-0 -z-10" />

      <div className="flex h-full items-end px-5 py-6 min-[375px]:px-6 min-[375px]:py-7 sm:px-9 sm:py-8 md:px-8 md:py-8 lg:px-11 lg:py-10 xl:px-12 xl:py-11 text-primary-contrast">
        <div className="max-w-[380px]">
          <h2 className="text-[22px] min-[375px]:text-[24px] min-[425px]:text-[26px] sm:text-[30px] md:text-[28px] lg:text-[34px] xl:text-[36px] font-semibold leading-tight tracking-[-0.02em]">
            {title}
          </h2>
          <p className="mt-1.5 sm:mt-2 max-w-[320px] text-[11.5px] min-[375px]:text-[12px] sm:text-[13px] lg:text-[14px] leading-relaxed whitespace-pre-line text-primary-contrast/90 font-medium">
            {description}
          </p>
          <Link
            href={href}
            className="promo-cta mt-3.5 min-[375px]:mt-4 sm:mt-5 inline-flex h-9 min-[375px]:h-9.5 sm:h-10 items-center justify-center rounded-full bg-surface px-4.5 min-[375px]:px-5 sm:px-6 text-[11.5px] min-[375px]:text-[12px] sm:text-[13px] lg:text-[14px] font-semibold text-foreground transition-all hover:bg-surface-muted active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-contrast shadow-sm"
          >
            {linkLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}

