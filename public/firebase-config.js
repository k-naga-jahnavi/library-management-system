// Firebase configuration
const firebaseConfig = {
  apiKey: "__________________Enter Your API Key_________________",
  authDomain: "library-management-syste-d2bda.firebaseapp.com",
  projectId: "library-management-syste-d2bda",
  storageBucket: "library-management-syste-d2bda.appspot.com",
  messagingSenderId: "206888107201",
  appId: "1:206888107201:web:f0c6ca776d3b0d4f2ae840"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

