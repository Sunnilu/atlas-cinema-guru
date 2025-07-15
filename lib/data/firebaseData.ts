import { db } from '@/lib/firebase';
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  Timestamp,
} from 'firebase/firestore';

/**
 * Add a movie to user's favorites
 */
export async function insertFavorite(userId: string, movieId: string): Promise<void> {
  const favoriteRef = doc(db, 'users', userId, 'favorites', movieId);
  await setDoc(favoriteRef, {
    addedAt: Timestamp.now(),
  });
}

/**
 * Remove a movie from user's favorites
 */
export async function deleteFavorite(userId: string, movieId: string): Promise<void> {
  const favoriteRef = doc(db, 'users', userId, 'favorites', movieId);
  await deleteDoc(favoriteRef);
}

/**
 * Check if a movie is favorited
 */
export async function isFavorite(userId: string, movieId: string): Promise<boolean> {
  const favoriteRef = doc(db, 'users', userId, 'favorites', movieId);
  const snapshot = await getDoc(favoriteRef);
  return snapshot.exists();
}

/**
 * Add a movie to user's watch later
 */
export async function insertWatchLater(userId: string, movieId: string): Promise<void> {
  const watchLaterRef = doc(db, 'users', userId, 'watchLater', movieId);
  await setDoc(watchLaterRef, {
    addedAt: Timestamp.now(),
  });
}

/**
 * Remove a movie from user's watch later
 */
export async function deleteWatchLater(userId: string, movieId: string): Promise<void> {
  const watchLaterRef = doc(db, 'users', userId, 'watchLater', movieId);
  await deleteDoc(watchLaterRef);
}

/**
 * Check if a movie is in the user's watch later list
 */
export async function isWatchLater(userId: string, movieId: string): Promise<boolean> {
  const watchLaterRef = doc(db, 'users', userId, 'watchLater', movieId);
  const snapshot = await getDoc(watchLaterRef);
  return snapshot.exists();
}
