import { d as db } from "../../../../../chunks/firebase.js";
import { doc, getDoc } from "firebase/firestore";
const load = async ({ params }) => {
  let data;
  const docRef = doc(db, "meals", params.dish);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    data = docSnap.data();
  } else {
    console.log("No such document!");
  }
  const { chef, cost, createdAt, dish, likedBy, photoURL, postedById, recipe } = data;
  return {
    chef,
    cost,
    createdAt,
    dish,
    likedBy,
    photoURL,
    postedById,
    recipe
  };
};
export {
  load
};
