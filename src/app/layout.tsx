import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { Footer } from "./ui/components/Footer";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <div className="h-[90vh]">
        {children}
          <Footer/>
        </div>
      </body>
    </html>
  );
}
