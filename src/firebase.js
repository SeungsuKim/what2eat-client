import "firebase/auth";
import "firebase/firestore";

import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyALwtlmLd7XZ2tnlSim023_RfYmyvl3Wbk",
  authDomain: "what2eat-c9f61.firebaseapp.com",
  databaseURL: "https://what2eat-c9f61.firebaseio.com",
  projectId: "what2eat-c9f61",
  storageBucket: "what2eat-c9f61.appspot.com",
  messagingSenderId: "938973748085",
  appId: "1:938973748085:web:866e988212207096a8513c",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
