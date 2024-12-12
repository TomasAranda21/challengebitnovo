
import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { Footer } from "./ui/components/Footer";
import { ReactQueryClient } from "./lib/reactQueryClient";


const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Challenge Frontend - Buy Crypto",
  description: "Challenge Frontend - Buy Crypto - by: @tomasaranda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <ReactQueryClient >
          <div className="lg:h-[90vh]">
            {children}
            <Footer />
          </div>
        </ReactQueryClient>
      </body>
    </html>
  );
}
