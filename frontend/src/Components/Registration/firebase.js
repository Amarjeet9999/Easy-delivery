import firebase from "firebase/compat/app";

import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAf1tepxrvEhFHEZ8NqtHDhjmLjPnOLSFc",
  authDomain: "dev-to-upload.firebaseapp.com",
  projectId: "dev-to-upload",
  storageBucket: "dev-to-upload.appspot.com",
  messagingSenderId: "183396792349",
  appId: "1:183396792349:web:b990555c08c4eefe086ef4",
  measurementId: "G-8TTCL4N8K5",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export { storage };
