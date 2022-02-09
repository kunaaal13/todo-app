var firebaseConfig = {
  apiKey: "AIzaSyDP5L3aSXtsNMkwlj95ie16l81HDDlwMZk",
  authDomain: "to-do-fad25.firebaseapp.com",
  projectId: "to-do-fad25",
  storageBucket: "to-do-fad25.appspot.com",
  messagingSenderId: "8700228469",
  appId: "1:8700228469:web:07900b417f250c8680593c",
  measurementId: "G-2QR43TK2ZS",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
