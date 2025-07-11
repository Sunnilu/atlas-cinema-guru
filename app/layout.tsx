// app/layout.tsx
import "@/app/global.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react"; // ✅ import the client-side session provider

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#00003c] text-white antialiased`}>
        <SessionProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1">
              <Header />
              <main className="p-4">{children}</main>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
