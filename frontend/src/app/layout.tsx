import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/components/auth/AuthProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Service Request Board",
  description: "Homeowner service requests for local tradespeople.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-950">
        <AuthProvider>
          <Header />
          <main className="flex-1">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
