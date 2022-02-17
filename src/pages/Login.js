import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then(() =>
      navigate("/customers")
    )
    .catch((error) => console.log(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <article>
          <header>
            <h2>Se connecter</h2>
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
            <button>Se connecter !</button>
            <Link to="/register">Je n'ai pas de compte</Link>
          </footer>
        </article>
      </form>
    </>
  );
};

export default Login;
