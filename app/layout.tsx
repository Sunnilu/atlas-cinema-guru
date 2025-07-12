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
        <div className="flex justify-center items-center min-h-screen bg-[#00003c]">
          <div
            className="w-[1726px] h-[958px] border border-[#54F4D0] rounded-lg overflow-hidden flex"
            style={{ opacity: 1 }}
          >
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
