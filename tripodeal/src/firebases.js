
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcQMMF46F2rNPASNwOKvdlVrHyG0gf4U4",
  authDomain: "tripodeal-88be9.firebaseapp.com",
  projectId: "tripodeal-88be9",
  storageBucket: "tripodeal-88be9.appspot.com",
  messagingSenderId: "26442046884",
  appId: "1:26442046884:web:c5041d976204e97744f531",
  measurementId: "G-W30QH1RBLJ"
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);