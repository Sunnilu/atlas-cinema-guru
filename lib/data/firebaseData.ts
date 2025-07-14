// lib/data/firebaseData.ts
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  startAfter,
  orderBy,
  doc,
  getDoc,
} from 'firebase/firestore';

export async function fetchTitles(userId: string) {
  try {
    const titlesRef = collection(db, 'titles');
    const snapshot = await getDocs(query(titlesRef, orderBy('released', 'desc')));

    const titles = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        image: data.image || `/images/${doc.id}.webp`,
      };
    });

    return titles;
  } catch (error) {
    console.error('Firestore Error:', error);
    throw new Error('Failed to fetch titles.');
  }
}
