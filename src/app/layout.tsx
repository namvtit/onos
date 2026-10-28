import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ONOS Global | Apparel Manufacturing & Fulfillment",
  description: "Apparel printing, embroidery, personalized merchandise and fulfillment across Vietnam and the United States.",
  icons: {
    icon: "/assets/onos-favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
