// app/layout.tsx
import "@/app/global.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#e6f5f2] text-[#00003c] antialiased`}>
        <div className="group flex min-h-screen">
          <Sidebar />
          <div className="flex-1 p-6">
            <Header />
            <main className="bg-white rounded-2xl shadow-xl p-6 mt-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
