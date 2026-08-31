/**
 * Parses a price string or number into a numeric value.
 * Example: "₹6,293.00" -> 6293
 */
export function parseNumericPrice(price: string | number, fallback = 7693): number {
  if (typeof price === "number") return price;
  const parsed = parseInt(price.replace(/[^0-9]/g, ""), 10);
  return isNaN(parsed) ? fallback : parsed;
}

/**
 * Formats a numeric price into INR currency format.
 * Example: 6293 -> "₹6,293.00"
 */
export function formatCurrency(amount: number, currencySymbol = "₹"): string {
  const formatted = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${currencySymbol}${formatted}`;
}

/**
 * Formats display price string safely.
 */
export function formatDisplayPrice(price: string | number): string {
  if (typeof price === "string" && price.startsWith("₹")) {
    return price;
  }
  const numeric = parseNumericPrice(price);
  return formatCurrency(numeric);
}
