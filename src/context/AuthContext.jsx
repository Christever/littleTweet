import { auth, database } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let unsubscribeProfile = null;

    // const unsubscribeAuth = onAuthStateChanged(
    //   auth,
    //   (currentUser) => {

    //     // Pas connecté
    //     if (!currentUser) {

    //       setUser(null);
    //       setProfile(null);
    //       setIsLoading(false);

    //       return;
    //     }

    //     // Connecté
    //     setUser(currentUser);
    //     setIsLoading(true);

    //     // Écoute du profil
    //     const profileRef = ref(
    //       database,
    //       `users/${currentUser.uid}`
    //     );

    //     unsubscribeProfile = onValue(
    //       profileRef,
    //       (snapshot) => {

    //         if (snapshot.exists()) {
    //           setProfile(snapshot.val());
    //         } else {
    //           setProfile(null);
    //         }

    //         setIsLoading(false);
    //       },
    //       (error) => {

    //         console.error(
    //           "ERREUR PROFILE :",
    //           error.message
    //         );

    //         setProfile(null);
    //         setIsLoading(false);
    //       }
    //     );

    //   }
    // );

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      // On arrête toujours l'écoute du profil précédent
      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = null;
      }

      // Pas connecté
      if (!currentUser) {
        setUser(null);
        setProfile(null);
        setIsLoading(false);

        return;
      }

      // Connecté
      setUser(currentUser);
      setIsLoading(true);

      // Écoute du profil
      const profileRef = ref(database, `users/${currentUser.uid}`);

      unsubscribeProfile = onValue(
        profileRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setProfile(snapshot.val());
          } else {
            setProfile(null);
          }

          setIsLoading(false);
        },
        (error) => {
          console.error("ERREUR PROFILE :", error.message);

          setProfile(null);
          setIsLoading(false);
        },
      );
    });
    return () => {
      unsubscribeAuth();

      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
