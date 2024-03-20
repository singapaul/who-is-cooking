import { doc, getDoc } from "firebase/firestore";
import { d as db } from "../../chunks/firebase.js";
import { e as error } from "../../chunks/index.js";
const load = async () => {
  const docRef = doc(db, "rotor", "267rotor");
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw error(404, "that user does not exist!");
  }
  return {
    array: docSnap.data()?.Order
  };
};
export {
  load
};
