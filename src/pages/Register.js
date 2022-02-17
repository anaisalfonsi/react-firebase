import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
    .then(() => navigate("/customers"));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <article>
          <header>
            <h2>Créer un compte</h2>
          </header>

          <label htmlFor="email">Adresse email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <footer>
            <button>Créer mon compte !</button>
            <Link to="/login">J'ai déjà un compte</Link>
          </footer>
        </article>
      </form>
    </>
  );
};

export default Register;
