// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// Importamos todo lo relativo a la autenticacion
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// Importamos todo lo relativo a la base de datos
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
// TODO: Falta traer lo relativo al Storage

// Configuracion del proyecto
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// inicializamos la base de datos
export const db = getFirestore(app);
// inicializamos la autenticacion
export const auth = getAuth(app);
// TODO: Falta inicializar el Storage si es requerido
// Creamos las instancias de los proveedores de autenticacion
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Metodo para ingresar con boton Facebook
export const signInWithFacebook = async () => {
  await signInWithPopup(auth, facebookProvider)
    .then((result) => {
      const usuario = result.user;
      const { uid, displayName, email, photoURL } = usuario;
      const usuarioDB = {
        uid,
        displayName,
        email,
        photoURL,
        rating: 3,
      };
      setDoc(
        doc(db, "usuarios", uid),
        {
          name: displayName,
          email: email,
          image: photoURL,
          rating: 3,
        },
        {
          merge: true,
        }
      );
      localStorage.setItem("usuario", JSON.stringify(usuarioDB));
    })
    .catch((error) => {
      console.log(error);
    });
};

// Metodo para salir de la aplicacion
export const salir = async () => {
  await signOut(auth)
    .then(() => {
      localStorage.removeItem("usuario");
    })
    .catch((error) => {
      console.log(error);
    });
};
