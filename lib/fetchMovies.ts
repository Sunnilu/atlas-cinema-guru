import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import type { Movie } from "@/lib/types";

export async function fetchMovies(): Promise<Movie[]> {
  const snapshot = await getDocs(collection(db, "movies"));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id, // Keep Firestore string ID as string
      title: data.title,
      synopsis: data.synopsis,
      released: data.released,
      genres: data.genres,
      image: data.image,
      isFavorite: data.isFavorite || false,
      isWatcher: data.isWatcher || false,
    };
  });
}
