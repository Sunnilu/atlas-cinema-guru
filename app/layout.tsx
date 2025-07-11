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
      <body className={`${inter.className} bg-[#00003c] text-white antialiased`}>
        <div className="group flex min-h-screen">
          {/* Sidebar with group-hover behavior */}
          <Sidebar />
          <div className="flex-1">
            <Header />
            <main className="p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
