// lib/data/firebaseData.ts

import { db } from '@/lib/firebase';
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  Firestore,
} from 'firebase/firestore';

/**
 * Add a movie to user's favorites
 */
export async function insertFavorite(userId: string, movieId: string): Promise<void> {
  const favoriteRef = doc(db, 'users', userId, 'favorites', movieId);
  await setDoc(favoriteRef, {
    addedAt: Date.now(),
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
