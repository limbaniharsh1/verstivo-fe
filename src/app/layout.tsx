import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

import "./globals.css";
import { CartProvider } from "@/features/cart";

export const metadata: Metadata = {
  title: {
    default: "Pairborn",
    template: "%s | Pairborn",
  },
  description: "Built for the ones building.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="overflow-x-clip" suppressHydrationWarning>
      <body className="antialiased bg-surface text-foreground overflow-x-clip">
        <CartProvider>{children}</CartProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}

