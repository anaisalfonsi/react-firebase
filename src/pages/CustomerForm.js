import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getDatabase, ref, get, set, push } from "firebase/database";
import { useFirebaseUser } from "../firebase-hooks";

const CustomerForm = () => {
  const [data, setData] = useState(
    {
      firstName: "",
      lastName: "",
      email: "",
    }
    );

  const { user } = useFirebaseUser();

  const navigate = useNavigate();

  const handleChange = ({ target: { value, name } }) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const database = getDatabase();

    const dbRef = ref(database, user.uid + "/customers");

    const customerRef = push(dbRef);
    set(customerRef, data);

    navigate("/customers");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <article>
          <header>
            <h2>Créer un client</h2>
          </header>

          <label htmlFor="firstName">Prénom</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Prénom du client"
            value={data.firstName}
            onChange={handleChange}
          />

          <label htmlFor="lastName">Nom de famille</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Nom de famille"
            value={data.lastName}
            onChange={handleChange}
          />

          <label htmlFor="email">Adresse email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Adresse email"
            value={data.email}
            onChange={handleChange}
          />

          <footer>
            <button>Enregistrer</button>
            <Link to="/customers">Annuler</Link>
          </footer>
        </article>
      </form>
    </>
  );
};

export default CustomerForm;
