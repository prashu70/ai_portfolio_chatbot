import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prashu's - Portfolio",
  description: "Full Stack Developer & AI Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}

