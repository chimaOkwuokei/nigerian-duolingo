import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../../services/firebase';

export async function signUpUser({
  email,
  password,
  displayName,
  nativeLanguage,
  learningLanguages,
}: {
  email: string;
  password: string;
  displayName: string;
  nativeLanguage: string;
  learningLanguages: string[];
}) {
  try {
    // 1. Sign up with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Set the display name
    await updateProfile(user, { displayName });

    // 3. Save to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      displayName,
      email,
      nativeLanguage,
      learningLanguages,
      createdAt: serverTimestamp(),
    });

    console.log('User registered and saved to Firestore!');
    return { success: true };
  } catch (error: any) {
    console.error('Sign-up error:', error);
    return { success: false, error: error.message };
  }
}
