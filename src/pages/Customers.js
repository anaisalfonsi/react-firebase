import { getDatabase, ref, remove, onValue } from "firebase/database";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFirebaseUser } from "../firebase-hooks";

const Customers = () => {

  const [customers, setCustomers] = useState([]);

  const { user } = useFirebaseUser();

  const database = getDatabase();

  useEffect(() => {
    const customersRef = ref(database, user.uid + "/customers");

    // Nettoyer l'asynchrone du composant susceptivble d'être démonté
    // (le onValue se nettoie dès qu'on l'appelle (prévu par Firebase))
    return onValue(customersRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setCustomers([]);
        return;
      }

      const objects = Object.keys(data).map((key) => {
        return { ...data[key], id: key };
      });

      setCustomers(objects);
    });

    /* get(customersRef)
      .then((snapshot) => snapshot.val())
      .then((data) => {
        return Object.keys(data).map((key) => {
          return { ...data[key], id: key };
        });
      })
      .then((objects) => setCustomers(objects)); */

    /* fetch(
      "https://todolist-anais-default-rtdb.europe-west1.firebasedatabase.app/.json"
    )
      .then((response) => response.json())
      .then((data) => {
        return Object.keys(data).map((key) => {
          return {...data[key], id: key };
        });
      })
      .then((objects) => setCustomers(objects)); */
  }, []);

  const handleDelete = (id) => {

    const database = getDatabase();

    const customerRef = ref(database, user.uid + "/customers/" + id);

    remove(customerRef);
    /* setCustomers(customers.filter((c) => c.id !== id)); */
  };

  return (
    <>
      <article>
        <header>
          <h2>Liste des clients</h2>
          <Link role={"button"} to="/customers/create">
            Créer un client
          </Link>
        </header>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Client</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.firstName}</td>
                <td>{customer.email}</td>
                <td className="grid">
                  <Link to={"/customers/" + customer.id} role="button">
                    Modifier
                  </Link>
                  <button onClick={() => handleDelete(customer.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </>
  );
};

export default Customers;
