import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export const useFirebaseUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);

      if (user) {
        return;
      }
    });
  }, []);

  return { user, isLoading };
};
