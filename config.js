// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getReactNativePersistence,
    initializeAuth,
  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwQKJ00X_QVD_BMVHQmu6_jiaodKSuBKQ",
  authDomain: "medifyai-27e2f.firebaseapp.com",
  projectId: "medifyai-27e2f",
  storageBucket: "medifyai-27e2f.firebasestorage.app",
  messagingSenderId: "721768996327",
  appId: "1:721768996327:web:3a1760019d6d0803187142"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

export { app, auth };