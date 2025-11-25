import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { DashboardProvider } from "@/context/DashboardContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trading Sentiment Dashboard",
  description: "Real-time trading sentiment analysis dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <DashboardProvider>
            <ThemeProvider>
              {children}
              <Toaster />
            </ThemeProvider>
          </DashboardProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
