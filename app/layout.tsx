import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Providers from "./providers";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Wrenfield",
  description:
    "A restored 1892 barn, glass pavilion and orchard in Dutchess County, Hudson Valley.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <Providers>
          <Nav />
          {children}
          <Footer />
          <ScrollIndicator />
        </Providers>
      </body>
    </html>
  );
}
