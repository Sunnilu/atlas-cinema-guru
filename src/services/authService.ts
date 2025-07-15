import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signOut as firebaseSignOut,
  getAdditionalUserInfo,
} from 'firebase/auth';
import type { UserCredential } from 'firebase/auth';
import type { AuthUser, SignInResult } from '../types/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // Add other config if needed
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<SignInResult> => {
  try {
    const userCredential: UserCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const additionalUserInfo = getAdditionalUserInfo(userCredential);

    return {
      user: {
        uid: user.uid,
        email: user.email ?? '',
        emailVerified: user.emailVerified,
      },
      additionalUserInfo: {
        isNewUser: additionalUserInfo?.isNewUser ?? false,
      },
    };
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};
