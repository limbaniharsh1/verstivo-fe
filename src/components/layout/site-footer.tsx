"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight, CreditCard, Package } from "lucide-react";
import { PAYMENT_METHODS } from "@/constants/payment-methods";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const TOP_BENEFITS = [
  {
    title: "Free express shipping",
    subtitle: "All India · 5-7 days",
    icon: Package,
  },
  {
    title: "Easy Exchange",
    subtitle: "7-Day size swap · Free",
    icon: ArrowLeftRight,
  },
  {
    title: "Cash on Delivery",
    subtitle: "Free · ₹0 COD fee",
    icon: CreditCard,
  },
] as const;

const FOOTER_LINK_GROUPS = [
  {
    title: "Our products",
    links: [
      { label: "Login/Register", href: "/login" },
      { label: "My Profile", href: "/account" },
      { label: "Track Order", href: "/track-order" },
      { label: "My Order", href: "/orders" },
      { label: "Return Or Replace Order", href: "/returns" },
      { label: "Address Book", href: "/addresses" },
    ],
  },
  {
    title: "Pairborn",
    links: [
      { label: "About Pairborn", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Press", href: "/press" },
      { label: "Our Blog", href: "/blog" },
    ],
  },
  {
    title: "Login/Register",
    links: [
      { label: "Login/Register", href: "/login" },
      { label: "My Profile", href: "/account" },
      { label: "Order History", href: "/orders" },
      { label: "Shipping Address", href: "/addresses" },
      { label: "Track Order", href: "/track-order" },
      { label: "Return Or Replace Order", href: "/returns" },
    ],
  },
  {
    title: "Service & Help",
    links: [
      { label: "Shipping & Delivery", href: "/shipping-delivery" },
      { label: "Cancellation & Refund", href: "/cancellation-refund" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
] as const;


export function SiteFooter() {
  return (
    <footer className="w-full overflow-hidden bg-primary text-white border-t border-white">
      {/* 1. Top Benefits Bar */}
      <div className="grid grid-cols-1 border-b border-white min-[480px]:grid-cols-2 lg:grid-cols-[31%_1fr_1fr_1fr]">
        {/* Cell 1: Only at pairborn.in (Wider box) */}
        <div className="flex min-h-[80px] items-center justify-center border-b border-white border-r-0 min-[480px]:border-r lg:border-b-0 px-6 py-4 text-center">
          <span className="text-[17px] sm:text-[19px] lg:text-[21px] font-semibold tracking-tight text-white">
            Only at pairborn.in
          </span>
        </div>

        {/* Benefits Cells 2, 3, 4 */}
        {TOP_BENEFITS.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === TOP_BENEFITS.length - 1;
          return (
            <div
              key={item.title}
              className={`flex min-h-[68px] items-center justify-center gap-3 border-b border-white px-4 py-4 text-left ${
                index % 2 === 0 ? "min-[480px]:border-r" : "min-[480px]:border-r-0 lg:border-r"
              } ${isLast ? "border-b-0 lg:border-r-0" : "lg:border-b-0"}`}
            >
              <Icon className="size-5 sm:size-5.5 shrink-0 text-white stroke-[1.75]" />
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] sm:text-[14px] font-semibold leading-tight text-white truncate">
                  {item.title}
                </span>
                <span className="mt-0.5 text-[11px] sm:text-[12px] font-normal leading-tight text-white/80 truncate">
                  {item.subtitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Middle Section: Newsletter (50%) + Links (50%) */}
      <div className="mx-auto grid w-full grid-cols-1 lg:grid-cols-2 border-b border-white">
        {/* Left Newsletter Block (50%) */}
        <div className="lg:col-span-1 flex flex-col justify-start px-6 sm:px-10 lg:px-16 xl:px-20 py-6 sm:py-10 lg:py-16 border-b border-white lg:border-b-0 lg:border-r lg:border-white">
          <div className="max-w-[420px]">
            <h2 className="text-[22px] min-[390px]:text-[24px] sm:text-[28px] lg:text-[30px] font-medium leading-[1.25] tracking-tight text-white">
              Expert advice, updates, and
              <br className="hidden sm:inline" />
              {" "}surprises for your inbox
            </h2>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex h-11 sm:h-14 w-full max-w-[390px] items-center rounded-full border border-white bg-transparent p-1.5 pl-5"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full bg-transparent text-[13.5px] sm:text-[14px] text-white outline-none placeholder:text-white/80"
              />
              <button
                type="submit"
                className="flex h-full shrink-0 items-center justify-center rounded-full bg-white px-5 sm:px-6 text-[13px] sm:text-[14px] font-semibold text-black transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Right Navigation Links Block (50%) */}
        <div className="lg:col-span-1 px-6 sm:px-10 lg:px-14 py-6 sm:py-10 lg:py-16">
          <nav
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
            aria-label="Footer navigation"
          >
            {FOOTER_LINK_GROUPS.map((group) => (
              <div key={group.title} className="flex flex-col min-w-0">
                <h3 className="text-[15px] sm:text-[16px] font-semibold text-white leading-tight">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-1">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="relative text-[13px] sm:text-[14px] text-white/90 transition-all hover:text-white pb-0.5 leading-tight inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* 3. Bottom Logo Section */}
      <div className="w-full pb-3 pt-5 sm:pb-6 sm:pt-10 text-center">
        <Link
          href="/"
          className="inline-block text-[30px] min-[390px]:text-[35px] sm:text-[40px] lg:text-[48px] font-black tracking-[0.05em] text-white leading-none"
          style={{ fontFamily: "var(--font-monument)" }}
          aria-label="PAIRBORN homepage"
        >
          PAIRBORN
        </Link>
      </div>

      {/* 4. Bottom Legal & Social Bar */}
      <div className="mx-auto flex w-full max-w-[1720px] flex-col gap-4 sm:gap-6 px-6 sm:px-10 lg:px-12 pt-4 pb-8 sm:pt-6 sm:pb-15 lg:flex-row lg:items-center lg:justify-between text-[13px] text-white/80 items-center text-center">
        {/* Payment Icons */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2" aria-label="Accepted payment methods">
          {PAYMENT_METHODS.map((method) => (
            <span
              key={method.name}
              className="flex items-center justify-center rounded-sm bg-white shadow-2xs px-1 py-1"
            >
              <img
                src={method.icon}
                alt={method.name}
                className="max-h-[11px] lg:max-h-[14px] w-auto"
              />
            </span>
          ))}
        </div>

        {/* Copyright text */}
        <p className="text-center text-[12px] sm:text-[13px] font-medium lg:text-left">
          © {new Date().getFullYear()} BIRKENSTOCK DIGITAL GMBH All rights reserved.
        </p>

        {/* Legal links */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 font-medium">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-2.5">
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-white/80 hover:text-white transition-colors"
          >
            <InstagramIcon className="size-5.5" />
          </Link>
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="text-white/80 hover:text-white transition-colors"
          >
            <FacebookIcon className="size-5.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
