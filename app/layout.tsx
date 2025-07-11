import "@/app/global.css";
import { Metadata } from "next";
import { auth } from "@/auth";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="bg-[#00003c] text-white antialiased">
        {session?.user ? (
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1">
              <Header user={session.user} />
              <main className="p-4">{children}</main>
            </div>
          </div>
        ) : (
          <main>{children}</main>
        )}
      </body>
    </html>
  );
}
