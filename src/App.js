import './App.css';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, Navigate } from "react-router-dom";
import CustomerForm from './pages/CustomerForm';
import CustomerEdit from './pages/CustomerEdit';
import Customers from './pages/Customers';
import Register from './pages/Register';
import Login from './pages/Login';
import { useEffect, useState } from "react";
import { getDatabase, ref, get, onValue, push, set } from "firebase/database";
import { getAuth, signOut } from 'firebase/auth';

import { useFirebaseUser } from './firebase-hooks';
import RegisterDetails from './pages/RegisterDetails';


const Hello = () => {

  const params = useParams();

  return (
    <div>
      <h1>Hello {params.prenom ||"world"}</h1>
    </div>
  );
};

function App() {
  /* const [customers, setCustomers] = useState([]);

  const database = getDatabase();

  useEffect(() => {
    const customersRef = ref(database);

    onValue(customersRef, (snapshot) => {
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
      .then((objects) => setCustomers(objects));

  }, []); */

  /* const addCustomer = (customer) => {
    const dbRef = ref(database);

    const customerRef = push(dbRef);
    set(customerRef, customer);


    /* customer.id = Date.now();
    setCustomers([...customers, customer]);
  } */

  const { user, isLoading, userDetails } = useFirebaseUser();


  const protectRoute = (element) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    if (!userDetails) {
      return <Navigate to="/register/details" />;
    }

    return element;
  }

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
  }


  return (
    <div className="container">
      <BrowserRouter>
        <nav>
          <ul>
            {!user && (
              <>
                <li>
                  <Link to="/">Accueil</Link>
                </li>
                <li>
                  <Link to="/login">Connexion</Link>
                </li>
                <li>
                  <Link to="/register">Créer un compte</Link>
                </li>
              </>
            )}
            {user && (
              <>
                {userDetails && (
                  <li>
                    <img src={userDetails.avatar} alt="" />{" "}
                    <strong>Hello, {userDetails.firstName}.</strong>
                  </li>
                )}
                <li>
                  <Link to="/register/details">Details</Link>
                </li>
                <li>
                  <Link to="/hello">Hello</Link>
                </li>
                <li>
                  <Link to="/customers">Les clients</Link>
                </li>
                <li>
                  <Link to="/customers/create">Créer un client</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Déconnexion</button>
                </li>
              </>
            )}
          </ul>
        </nav>
        {isLoading ? (
          <h2>En chargement...</h2>
        ) : (
          <Routes>
            <Route path="/register/details" element={<RegisterDetails />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="/customers"
              element={protectRoute(<Customers />)}
            ></Route>
            <Route
              path="/customers/create"
              element={protectRoute(<CustomerForm />)}
            ></Route>
            <Route
              path="/customers/:id"
              element={protectRoute(<CustomerEdit />)}
            ></Route>

            <Route path="/hello" element={<Hello />}></Route>
            <Route path="/hello/:prenom" element={<Hello />}></Route>
          </Routes>
        )}
      </BrowserRouter>
      <h1>Routing</h1>
    </div>
  );
}

export default App;
