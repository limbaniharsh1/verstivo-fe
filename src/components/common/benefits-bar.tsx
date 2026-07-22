import { PackageCheck, Repeat2, Truck } from "lucide-react";

const BENEFITS = [
  {
    title: "Free express shipping",
    description: "All India · 5–7 days",
    Icon: Truck,
  },
  {
    title: "Easy Exchange",
    description: "7-day size swap · Free",
    Icon: Repeat2,
  },
  {
    title: "Cash on Delivery",
    description: "Free · ₹0 COD fee",
    Icon: PackageCheck,
  },
] as const;

export function BenefitsBar() {
  return (
    <section className="border-y border-border bg-surface" aria-label="Shopping benefits">
      <div className="mx-auto grid max-w-[1585px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex min-h-18 items-center justify-center border-b border-border px-3 text-center text-[22px] font-medium sm:border-r lg:border-b-0">
          Only at verstivo.in
        </div>

        {BENEFITS.map(({ title, description, Icon }, index) => (
          <div
            key={title}
            className={`flex min-h-16 items-center justify-center gap-3 border-border px-5 ${
              index < BENEFITS.length - 1 ? "border-b sm:border-r lg:border-b-0" : ""
            }`}
          >
            <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <p className="text-[14px] font-medium">{title}</p>
              <p className="mt-0.5 text-[12px] font-medium text-muted">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
