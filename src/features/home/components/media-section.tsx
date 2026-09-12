import Image from "next/image";
import Link from "next/link";
import { MediaContent } from "@/types/homepage";

interface MediaSectionProps {
  content: MediaContent;
}

export function MediaSection({ content }: MediaSectionProps) {
  if (!content || !content.mediaUrl) {
    return null;
  }

  const {
    title,
    description,
    mediaType = "image",
    mediaUrl,
    posterUrl,
    button,
    settings = { autoPlay: true, loop: true, muted: true },
  } = content;

  return (
    <section className="relative isolate w-full overflow-hidden bg-black min-h-[360px] min-[390px]:min-h-[400px] sm:min-h-[460px] md:min-h-[510px] lg:min-h-[550px] xl:min-h-[600px] 3xl:min-h-[660px]">
      {/* Media Background */}
      <div className="absolute inset-0 -z-20 h-full w-full">
        {mediaType === "video" ? (
          <video
            src={mediaUrl}
            poster={posterUrl || undefined}
            autoPlay={settings.autoPlay !== false}
            loop={settings.loop !== false}
            muted={settings.muted !== false}
            playsInline
            preload="metadata"
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <Image
            src={mediaUrl}
            alt={title || "Campaign media banner"}
            fill
            sizes="100vw"
            unoptimized={mediaType === "gif" || (typeof mediaUrl === "string" && mediaUrl.toLowerCase().includes(".gif"))}
            className="object-cover object-center"
          />
        )}
      </div>

      {/* Dim Overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-black/40" />

      {/* Overlay Content */}
      {(title || description || button?.text) && (
        <div className="container-main flex min-h-[360px] min-[390px]:min-h-[400px] sm:min-h-[460px] md:min-h-[510px] lg:min-h-[550px] xl:min-h-[600px] 3xl:min-h-[660px] items-center py-8 sm:py-12 md:py-14">
          <div className="max-w-[320px] min-[375px]:max-w-[360px] sm:max-w-[440px] lg:max-w-[540px] 3xl:max-w-[680px] text-white">
            {title && (
              <h2 className="text-[30px] min-[425px]:text-[34px] sm:text-[40px] md:text-[44px] lg:text-[50px] xl:text-[56px] 3xl:text-[68px] font-medium leading-[1.08] drop-shadow-xs">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-3 sm:mt-4 max-w-[300px] min-[375px]:max-w-[340px] sm:max-w-[400px] lg:max-w-[480px] 3xl:max-w-[580px] text-base sm:text-[15px] lg:text-[18px] 3xl:text-[20px] font-normal leading-[1.4] text-white/95 drop-shadow-xs">
                {description}
              </p>
            )}

            {button?.text && button?.redirectUrl && (
              <Link
                href={button.redirectUrl}
                className="mt-6 sm:mt-7.5 inline-flex rounded-full bg-white text-black hover:bg-neutral-100 shadow-md transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white btn-banner-size"
              >
                {button.text}
              </Link>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
