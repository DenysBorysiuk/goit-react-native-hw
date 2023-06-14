// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiLX6IkCU4ZkJFpDf_pK8yiU6CDb005zQ",
  authDomain: "goit-react-native-hw-cd77e.firebaseapp.com",
  projectId: "goit-react-native-hw-cd77e",
  storageBucket: "goit-react-native-hw-cd77e.appspot.com",
  messagingSenderId: "867104084447",
  appId: "1:867104084447:web:ad4941cba2b13b9ad2746a",
  measurementId: "G-5J3ZZM388M",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
