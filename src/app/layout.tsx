import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manufactt- Webflow HTML website template",
  description: "Trusted by industries worldwide for quality manufacturing, advanced technology, and timely delivery.",
  icons: {
    icon: "/assets/23886552e67a-68f083bd068f5863f2f7606f_Fav-Icon-32.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
