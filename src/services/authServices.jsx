import { auth, database } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ref, set, get } from "firebase/database";

export async function registerUserService(data, avatarUrl) {
  // On récupère les données
  const { email, password, pseudo } = data;

  // On normalise le pseudo
  const username = pseudo.toLowerCase().trim();

  // Verification si le pseudo existe déjà
  const usernameRef = ref(database, `usernames/${username}`);
  const snapshot = await get(usernameRef);

  if (snapshot.exists()) {
    throw new Error("Ce pseudo est déjà utilisé");
  }

  // On crée le compte sur Firebase Auth
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = userCredential.user;

    //   On crée le profile dans Realtime Database
    //   (user par défaut)
    // On n'enregistre pas l'email, par mesure de sécurité. Firebase Auth le gère
    await set(ref(database, `users/${user.uid}`), {
      pseudo,
      role: "user",
      createdAt: Date.now(),
      avatarUrl: avatarUrl || null,
    });
    // Reservation du pseudo
    await set(usernameRef, user.uid);
    return user;
  } catch (error) {
    // Email deja utilisé
    if (error.code === "auth/email-already-in-use") {
      throw new Error("Impossible de créer le compte avec ces informations");
    }

    throw error;
  }
}

export async function loginUserService(data) {
  const { email, password } = data;

  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function logoutUserServices() {
  try {
    await signOut(auth);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
