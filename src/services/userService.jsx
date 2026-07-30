import { database } from "@/firebase/firebase";
import { onValue, ref } from "firebase/database";

export function listenUsers(callback, errorCallback) {
  const usersRef = ref(database, "users");

  // onValue : Permet d' écouter la base en temps réel
  const unsubscribe = onValue(
    usersRef,
    (snapshot) => {
      if (!snapshot) {
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

