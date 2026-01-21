import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { CrispChat } from "@/components/crisp-chat";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Create Document - Split Lease",
  description: "Create and send policy documents to hosts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        {children}
        <CrispChat websiteId={process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID} />
      </body>
    </html>
  );
}
