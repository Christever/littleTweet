import { auth, database } from "@/firebase/firebase";
import { onValue, ref, update, get } from "firebase/database";

export function listenUsers(callback, errorCallback) {
  const usersRef = ref(database, "users");

  // onValue : Permet d' écouter la base en temps réel
  const unsubscribe = onValue(
    usersRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        callback({});
        return;
      }

      callback(snapshot.val());
    },
    (error) => {
      errorCallback(error);
    },
  );

  return unsubscribe;
}

export async function updateProfileService(data, oldPseudo) {
  const user = auth.currentUser;
  console.log("DATA :", data);
  console.log("ANCIEN PSEUDO :", oldPseudo);
  if (!user) {
    throw new Error("Utilisateur non connecté.");
  }

  const updates = {};
  if (data.pseudo && data.pseudo !== oldPseudo) {
    const usernameRef = ref(database, `usernames/${data.pseudo}`);

    const snapshot = await get(usernameRef);

    if (snapshot.exists()) {
      return {
        success: false,
        message: "Ce pseudo existe déja",
      };
    }

    updates[`usernames/${oldPseudo}`] = null;
    updates[`usernames/${data.pseudo}`] = user.uid;
  }

  console.log("DATA REÇUE :", data);
  console.log("UPDATES AVANT USER :", updates);

  // Modifier l'utilisateur
  Object.entries(data).forEach(([key, value]) => {
    updates[`users/${user.uid}/${key}`] = value;
  });

  console.log("UPDATES FINAL :", updates);

  await update(ref(database), updates);
}
