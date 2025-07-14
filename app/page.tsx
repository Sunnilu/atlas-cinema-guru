// app/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import MovieGrid from "@/components/MovieGrid";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Welcome, {session.user.name}!</h1>
      <MovieGrid movies={[]} />
    </main>
  );
}
