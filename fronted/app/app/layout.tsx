import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppSidebar } from "@/components/AppSidebar";

import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen w-full  flex">
      <AppSidebar />
      <div className="flex-grow bg-primary/5 p-8">{children}</div>
    </main>
  );
}
