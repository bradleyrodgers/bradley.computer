import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { design } from "@/lib/design";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bradley Rodgers",
  description: "An audio visual journal by Bradley Rodgers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} h-full`}
      style={
        {
          "--background": design.colors.background,
          "--foreground": design.colors.foreground,
          "--muted": design.colors.muted,
          "--accent": design.colors.accent,
        } as React.CSSProperties
      }
    >
      <body className={`${GeistSans.className} min-h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
