import { db } from "../firebase";

export const createUser = async (user) => {
  try {
    const userRef = await db.collection("users").add(user);

    return (await userRef.get()).id();
  } catch (error) {
    console.log(error);
  }
};

export const getUserId = async (email) => {
  try {
    const query = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    query.forEach((doc) => console.log(doc));
  } catch (error) {
    console.log(error);
  }
};
