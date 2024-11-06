import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { cn } from '@/lib/utils'
import { ThemeProvider } from "@/components/Theme-Provider";
import { ToastContainer } from 'react-toastify';
import AuthProvider from "./context/AuthContext";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: "CarePulse",
  description: "A healthcare appointment management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-dark-300 font-sans antialiased', fontSans.variable)}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            {/* <ToastContainer /> */}
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
