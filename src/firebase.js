import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfkd_pzTu76YZyr8oiziMcHH7Ip3aIpVs",
  authDomain: "ecommerce-app-4fee2.firebaseapp.com",
  projectId: "ecommerce-app-4fee2",
  storageBucket: "ecommerce-app-4fee2.firebasestorage.app",
  messagingSenderId: "902929651532",
  appId: "1:902929651532:web:68ad9d564111a6c74761e9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
