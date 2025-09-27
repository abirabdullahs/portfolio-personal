import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDpMzcAdyxvUC0AhQpZRrCVZo_sU8kc7fo",
  authDomain: "personal-web-5051b.firebaseapp.com",
  projectId: "personal-web-5051b",
  storageBucket: "personal-web-5051b.appspot.com",
  messagingSenderId: "315263291644",
  appId: "1:315263291644:web:2fb8a167891e1317818779",
  measurementId: "G-T10M0YGNLY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
