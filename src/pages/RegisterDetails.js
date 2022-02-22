import { getDatabase, ref, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebaseUser } from "../firebase-hooks";

const RegisterDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const fileInputRef = useRef();

  const navigate = useNavigate();

  const { user } = useFirebaseUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    const db = getDatabase();

    const storage = getStorage();

    const avatar = fileInputRef.current.files[0];

    const avatarRef = storageRef(storage, user.uid);

    uploadBytes(avatarRef, avatar)
      .then((snapshot) => {
        return getDownloadURL(avatarRef);
      })
      .then((url) => {
          const userRef = ref(db, user.uid + "/details");

          set(userRef, {
            firstName,
            lastName,
            avatar: url,
          });

          navigate("/customers");
        });

    

  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <article>
          <header>
            <h2 style={{ marginBottom: "10px" }}>Finalisez votre profil</h2>
            <small>
              Nous avons besoin de petits détails supplémentaires :)
            </small>
          </header>

          <label htmlFor="firstName">Prénom</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Votre prénom"
          />

          <label htmlFor="lastName">Nom de famille</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Votre nom de famille"
          />

          <label htmlFor="avatar">Photo de profil</label>
          <input
            ref={fileInputRef}
            type="file"
            name="avatar"
            id="avatar"
            placeholder="Votre photo de profil"
          />

          <footer>
            <button>Enregistrer les détails</button>
          </footer>
        </article>
      </form>
    </>
  );
};

export default RegisterDetails;
