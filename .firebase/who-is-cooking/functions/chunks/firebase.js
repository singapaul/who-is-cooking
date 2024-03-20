import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { d as derived, w as writable } from "./index2.js";
const firebaseConfig = {
  apiKey: "AIzaSyBbl1NaYS3SE3lb0ROS2Pie0ZDoD8wLgzI",
  authDomain: "who-is-cooking.firebaseapp.com",
  projectId: "who-is-cooking",
  storageBucket: "who-is-cooking.appspot.com",
  messagingSenderId: "169576180053",
  appId: "1:169576180053:web:2bd9c7a24914b018e727dc",
  measurementId: "G-41QYQE18QH"
};
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
function userStore() {
  let unsubscribe;
  if (!auth || !globalThis.window) {
    console.warn("Auth is not initialized or not in browser");
    const { subscribe: subscribe2 } = writable(null);
    return {
      subscribe: subscribe2
    };
  }
  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user2) => {
      set(user2);
    });
    return () => unsubscribe();
  });
  return {
    subscribe
  };
}
const user = userStore();
function docStore(path) {
  let unsubscribe;
  const docRef = doc(db, path);
  const { subscribe } = writable(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set(snapshot.data() ?? null);
    });
    return () => unsubscribe();
  });
  return {
    subscribe,
    ref: docRef,
    id: docRef.id
  };
}
const userData = derived(user, ($user, set) => {
  if ($user) {
    return docStore(`users/${$user.uid}`).subscribe(set);
  } else {
    set(null);
  }
});
function rotorStore() {
  const { subscribe, set } = writable([]);
  const docRef = doc(db, "rotor", "267rotor");
  const unsubscribe = onSnapshot(
    docRef,
    (doc2) => {
      if (doc2.exists()) {
        set(doc2.data());
      } else {
        set([]);
      }
    },
    (error) => {
      console.error("Error getting document:", error);
      set([]);
    }
  );
  return {
    subscribe,
    // Optionally include a method to manually unsubscribe, if needed for cleanup
    unsubscribe() {
      unsubscribe();
    }
  };
}
const rotor = rotorStore();
export {
  user as a,
  db as d,
  rotor as r,
  storage as s,
  userData as u
};
