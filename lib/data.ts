import { db } from './firebase';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  limit,
  orderBy,
  startAt,
  Timestamp,
} from 'firebase/firestore';
import type { Movie } from './types';

// Fetch movie titles from Firestore with filtering and pagination
export async function fetchTitles(
  page: number,
  minYear: number,
  maxYear: number,
  queryText: string,
  genres: string[],
  userEmail: string
): Promise<Movie[]> {
  const snapshot = await getDocs(collection(db, 'titles'));
  
  // Get favorites and watch later lists in parallel
  const [favorites, watchLater] = await Promise.all([
    fetchFavoritesIds(userEmail),
    fetchWatchLaterIds(userEmail)
  ]);

  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() } as Movie))
    .filter((movie) => {
      const matchesYear = movie.released >= minYear && movie.released <= maxYear;
      const matchesQuery = movie.title.toLowerCase().includes(queryText.toLowerCase());
      const matchesGenres = genres.length === 0 || genres.every((g) => movie.genres.includes(g));
      return matchesYear && matchesQuery && matchesGenres;
    })
    .slice((page - 1) * 6, page * 6)
    .map((movie) => ({
      ...movie,
      isFavorite: favorites.includes(movie.id),
      isWatcher: watchLater.includes(movie.id),
    }));
}

export async function fetchFavoritesIds(userEmail: string): Promise<string[]> {
  try {
    const snapshot = await getDocs(collection(db, 'users', userEmail, 'favorites'));
    return snapshot.docs.map((doc) => doc.id);
  } catch (error) {
    console.error("Firestore Error [fetchFavoritesIds]:", error);
    throw new Error("Failed to fetch favorites.");
  }
}

export async function fetchWatchLaterIds(userEmail: string): Promise<string[]> {
  try {
    const snapshot = await getDocs(collection(db, 'users', userEmail, 'watchLater'));
    return snapshot.docs.map((doc) => doc.id);
  } catch (error) {
    console.error("Firestore Error [fetchWatchLaterIds]:", error);
    throw new Error("Failed to fetch watch later.");
  }
}

export async function fetchFavorites(page: number, userEmail: string): Promise<Movie[]> {
  const favoritesIds = await fetchFavoritesIds(userEmail);
  const watchLater = await fetchWatchLaterIds(userEmail);
  
  const snapshot = await getDocs(collection(db, 'titles'));
  const allMovies = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Movie));
  
  return allMovies
    .filter((movie) => favoritesIds.includes(movie.id))
    .slice((page - 1) * 6, page * 6)
    .map((movie) => ({
      ...movie,
      isFavorite: true,
      isWatcher: watchLater.includes(movie.id),
    }));
}

// CRUD Operations
export async function insertFavorite(titleId: string, userEmail: string) {
  try {
    const docRef = doc(db, 'users', userEmail, 'favorites', titleId);
    await setDoc(docRef, { addedAt: Timestamp.now() });
  } catch (error) {
    console.error("Firestore Error [insertFavorite]:", error);
    throw new Error("Failed to add favorite.");
  }
}

export async function deleteFavorite(titleId: string, userEmail: string) {
  try {
    const docRef = doc(db, 'users', userEmail, 'favorites', titleId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Firestore Error [deleteFavorite]:", error);
    throw new Error("Failed to remove favorite.");
  }
}

// Similar patterns for watch later operations...
export async function insertWatchLater(titleId: string, userEmail: string) {
  try {
    const docRef = doc(db, 'users', userEmail, 'watchLater', titleId);
    await setDoc(docRef, { addedAt: Timestamp.now() });
  } catch (error) {
    console.error("Firestore Error [insertWatchLater]:", error);
    throw new Error("Failed to add watch later.");
  }
}

export async function deleteWatchLater(titleId: string, userEmail: string) {
  try {
    const docRef = doc(db, 'users', userEmail, 'watchLater', titleId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Firestore Error [deleteWatchLater]:", error);
    throw new Error("Failed to remove watch later.");
  }
}
export async function fetchGenres(): Promise<string[]> {
  const snapshot = await getDocs(collection(db, 'titles'));
  const allGenres = new Set<string>();
  
  snapshot.forEach((doc) => {
    const movie = doc.data() as Movie;
    movie.genres.forEach((genre: string) => allGenres.add(genre));
  });

  return Array.from(allGenres);
}
