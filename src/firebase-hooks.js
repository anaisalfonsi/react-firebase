import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, onValue, push, set } from "firebase/database";

export const useFirebaseUser = () => {
  const auth = getAuth();

  const [user, setUser] = useState(auth.currentUser);
  const [isLoading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const db = getDatabase();

  useEffect(() => {
    if (!user) {
      return;
    }

    const userDetailsRef = ref(db, user.uid + "/details");

    return onValue(userDetailsRef, (snapshot) => {
      setUserDetails(snapshot.val());
    });
    
  }, [user]);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const userDetailsRef = ref(db, user.uid + "/details");

        get(userDetailsRef).then((snapshot) => {
          setUserDetails(snapshot.val());
          setUser(user);
          setLoading(false);
        });

        return;
      }

      setUser(null);
      setUserDetails(null);
      setLoading(false);
    });
  }, []);

  return { user, isLoading, userDetails };
};
