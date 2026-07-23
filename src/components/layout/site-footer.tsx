import Image from "next/image";
import Link from "next/link";

const FOOTER_LINK_GROUPS = [
  {
    title: "Our products",
    links: ["Login/Register", "My Profile", "Track Order", "My Order", "Return Or Replace Order", "Address Book"],
  },
  {
    title: "Verstivo",
    links: ["About Verstivo", "Sustainability", "Press", "New Wave Group"],
  },
  {
    title: "Login/Register",
    links: ["Login/Register", "My Profile", "Track Order", "My Order", "Return Or Replace Order", "Address Book"],
  },
  {
    title: "Service & Help",
    links: ["Contact Us", "Help & FAQs", "Text & SMS"],
  },
] as const;

const PAYMENT_METHODS = [
  { name: "Razorpay", icon: "/assets/icons/Frame 1261153958.png" },
  { name: "RuPay", icon: "/assets/icons/Frame 1261153962.png" },
  { name: "G Pay", icon: "/assets/icons/Frame 1261153960.png" },
  { name: "PhonePe", icon: "/assets/icons/Frame 1261153961.png" },
  { name: "Paytm", icon: "/assets/icons/Frame 1261153959.png" },
  { name: "BHIM", icon: "/assets/icons/Frame 1261153963.png" },
] as const;

const getFooterHref = (label: string) =>
  `/${label.toLowerCase().replaceAll("&", "and").replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

export function SiteFooter() {
  return (
    <footer className="w-full overflow-x-clip bg-primary text-primary-contrast">
      <div className="border-b border-white py-4 text-center min-[400px]:py-7">
        <Link
          href="/"
          className="inline-block text-[22px] font-black tracking-[0.06em] min-[360px]:text-[28px] min-[400px]:text-[36px] sm:text-[44px]"
          style={{ fontFamily: "var(--font-monument)" }}
          aria-label="Verstivo home"
        >
          VERSTIVO
        </Link>
      </div>

      <div className="grid border-b border-white lg:grid-cols-[40%_60%] xl:grid-cols-2">
        <div className="flex flex-col items-center justify-center border-b border-white px-3 py-8 text-center min-[380px]:px-6 min-[400px]:py-12 sm:px-10 lg:border-r lg:border-b-0 lg:items-start lg:px-12 lg:py-14 lg:text-left">
          <div className="flex w-full max-w-[460px] flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="text-[18px] font-normal leading-tight tracking-tight min-[360px]:text-[21px] min-[400px]:text-[24px] min-[480px]:text-[26px] sm:text-[30px] lg:text-[32px] text-primary-contrast">
              Expert advice, updates, and surprises for your inbox
            </h2>
            <form className="mt-5 flex h-11 w-full max-w-[440px] items-center rounded-full border border-primary-contrast p-1 min-[360px]:h-12 sm:mt-8 sm:h-14">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter your email"
                className="footer-email-input min-w-0 flex-1 bg-transparent px-3 text-[12px] text-primary-contrast outline-none placeholder:text-primary-contrast/90 min-[360px]:px-4 min-[360px]:text-sm sm:px-5 sm:text-base"
              />
              <button
                type="submit"
                className="flex h-full shrink-0 items-center justify-center rounded-full bg-white px-4 text-[12px] font-semibold text-black transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-contrast min-[360px]:px-5 min-[360px]:text-sm sm:px-7 sm:text-base"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <nav
          className="grid grid-cols-2 gap-x-2 gap-y-6 px-3 py-7 min-[360px]:gap-x-4 min-[360px]:px-5 min-[400px]:px-7 min-[480px]:gap-x-5 sm:grid-cols-4 sm:px-6 xl:px-10 sm:py-10"
          aria-label="Footer navigation"
        >
          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.title} className="min-w-0 text-center sm:text-left">
              <h2 className="text-[13px] font-medium min-[360px]:text-[14px] min-[380px]:text-[16px] xl:text-[18px] leading-tight">{group.title}</h2>
              <ul className="mt-2.5 space-y-1.5 min-[360px]:mt-3 min-[360px]:space-y-2 min-[380px]:mt-4 min-[380px]:space-y-2.5">
                {group.links.map((link) => (
                  <li key={link} className="min-w-0">
                    <Link
                      href={getFooterHref(link)}
                      className="block text-[11px] min-[360px]:text-[12px] xl:text-[14px] leading-snug font-normal text-on-primary-muted transition-colors hover:text-primary-contrast break-words"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 px-3 pt-6 pb-12 text-center min-[360px]:gap-5 min-[360px]:px-5 min-[360px]:pt-7 min-[360px]:pb-14 min-[400px]:px-7 sm:px-8 sm:pt-8 sm:pb-16 xl:px-10 lg:pb-20 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-6 lg:gap-y-3 lg:text-left">
        <div className="flex flex-wrap items-center justify-center gap-1.5" aria-label="Accepted payment methods">
          {PAYMENT_METHODS.map((method) => (
            <span
              key={method.name}
              className="flex items-center justify-center rounded-sm bg-surface px-1.5 py-1"
            >
              <Image
                src={method.icon}
                alt={method.name}
                width={30}
                height={20}
                className="h-4 w-auto object-contain"
              />
            </span>
          ))}
        </div>

        <p className="text-center text-[11px] min-[360px]:text-[12px] text-on-primary-muted sm:text-[13px] xl:text-[14px]">
          © {new Date().getFullYear()} VERSTIVO DIGITAL GMBH All rights reserved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] min-[360px]:gap-4 min-[360px]:text-[12px] sm:text-[13px] xl:text-[14px]">
          <Link href="/privacy" className="text-on-primary-muted hover:text-primary-contrast">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-on-primary-muted hover:text-primary-contrast">
            Terms of Service
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="https://www.instagram.com/"
            aria-label="Instagram"
            className="text-on-primary-muted transition-colors hover:text-primary-contrast"
          >
            <Image
              src="/assets/icons/Group.png"
              alt="Instagram"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
          </Link>
          <Link
            href="https://www.facebook.com/"
            aria-label="Facebook"
            className="text-on-primary-muted transition-colors hover:text-primary-contrast"
          >
            <span className="text-[20px] font-semibold" aria-hidden="true">
              f
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
