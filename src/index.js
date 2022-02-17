import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "../node_modules/@picocss/pico/css/pico.min.css";
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOyLMv9bMeixFSkjM6qhMZaEpmmrmJAxU",
  authDomain: "todolist-anais.firebaseapp.com",
  databaseURL: "https://todolist-anais-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todolist-anais",
  storageBucket: "todolist-anais.appspot.com",
  messagingSenderId: "1058912589413",
  appId: "1:1058912589413:web:ae0a2e1342cc2cf3bad88c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
