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
    <section className="w-full max-w-full overflow-hidden border-t border-border bg-surface" aria-label="Shopping benefits">
      <div className="mx-auto grid max-w-[1585px] grid-cols-2 lg:grid-cols-4">
        <div className="flex min-h-20 py-3 items-center justify-center border-b border-r border-border px-2.5 sm:px-4 text-center text-[13px] min-[360px]:text-[15px] sm:text-[18px] lg:text-[22px] font-medium lg:border-b-0">
          Only at verstivo.in
        </div>

        {BENEFITS.map(({ title, description, Icon }, index) => {
          const mobileBorders =
            index === 0
              ? "border-b"
              : index === 1
              ? "border-r border-b min-[360px]:border-b-0"
              : "";

          return (
            <div
              key={title}
              className={`flex min-h-16 py-3 items-center justify-center gap-2 sm:gap-3 px-2 sm:px-4 text-left border-border ${mobileBorders} ${
                index < BENEFITS.length - 1 ? "lg:border-r" : ""
              }`}
            >
              <Icon className="size-4 shrink-0 min-[360px]:size-4.5 sm:size-5.5 text-foreground" strokeWidth={1.5} aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-[11px] min-[360px]:text-[12px] sm:text-[14px] font-semibold text-foreground leading-tight truncate">{title}</p>
                <p className="mt-0.5 text-[9.5px] min-[360px]:text-[10.5px] sm:text-[12px] font-medium text-muted leading-tight truncate">{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
