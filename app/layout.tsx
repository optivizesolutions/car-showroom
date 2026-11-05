import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AUREL | The Grand Touring Collection",
  description: "Discover AUREL GT-01: an original, interactive 3D automotive experience.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
