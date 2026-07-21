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

const PAYMENT_METHODS = ["Razorpay", "RuPay", "G Pay", "PhonePe", "Paytm", "BHIM"] as const;

const getFooterHref = (label: string) =>
  `/${label.toLowerCase().replaceAll("&", "and").replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-contrast">
      <div className="border-b border-primary-border py-7 text-center">
        <Link
          href="/"
          className="inline-block text-[38px] font-black tracking-[-0.07em] sm:text-[44px]"
          aria-label="Verstivo home"
        >
          VERSTIVO
        </Link>
      </div>

      <div className="grid border-b border-primary-border lg:grid-cols-2">
        <div className="flex min-h-[220px] items-center border-b border-primary-border px-7 py-10 sm:px-10 lg:border-r lg:border-b-0">
          <div className="w-full max-w-[440px]">
            <h2 className="max-w-[360px] text-[22px] leading-[1.05] font-medium">
              Expert advice, updates, and surprises for your inbox
            </h2>
            <form className="mt-7 flex h-11 max-w-[400px] rounded-full border border-primary-contrast p-0.5">
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
                className="footer-email-input min-w-0 flex-1 bg-transparent px-4 text-[12px] outline-none placeholder:text-on-primary-muted"
              />
              <button
                type="submit"
                className="rounded-full bg-surface px-5 text-[12px] font-medium text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-contrast"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <nav
          className="grid grid-cols-2 gap-x-7 gap-y-9 px-7 py-10 sm:grid-cols-4 sm:px-10"
          aria-label="Footer navigation"
        >
          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="text-[12px] font-medium">{group.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link}>
                    <Link
                      href={getFooterHref(link)}
                      className="text-[10px] text-on-primary-muted transition-colors hover:text-primary-contrast"
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

      <div className="flex flex-col gap-5 px-7 py-6 text-[10px] sm:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-1.5" aria-label="Accepted payment methods">
          {PAYMENT_METHODS.map((method) => (
            <span
              key={method}
              className="rounded-sm bg-surface px-1.5 py-1 text-[7px] font-semibold text-foreground"
            >
              {method}
            </span>
          ))}
        </div>

        <p className="text-on-primary-muted">© 2026 VERSTIVO. All rights reserved.</p>

        <div className="flex flex-wrap items-center gap-4">
          <Link href="/privacy" className="text-on-primary-muted hover:text-primary-contrast">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-on-primary-muted hover:text-primary-contrast">
            Terms of Service
          </Link>
          <Link href="https://www.instagram.com/" aria-label="Instagram">
            <span className="text-[11px] font-semibold" aria-hidden="true">
              IG
            </span>
          </Link>
          <Link href="https://www.facebook.com/" aria-label="Facebook">
            <span className="text-[16px] font-semibold" aria-hidden="true">
              f
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
