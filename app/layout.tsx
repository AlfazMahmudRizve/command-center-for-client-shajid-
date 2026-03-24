import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shajid's Workspace",
  description: "Browser Start Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={clsx(inter.className, "antialiased bg-[#0a0a0a] min-h-screen text-white selection:bg-white/20")}>
        {children}
      </body>
    </html>
  );
}
