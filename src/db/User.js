import { db } from "../firebase";

export const signUp = async (user) => {
  const usersDoc = await db
    .collection("users")
    .where("email", "==", user.email)
    .get();
  if (!usersDoc.empty) {
    throw new Error("USER_ALREADY_EXISTS");
  }

  const userRef = await db.collection("users").add({
    ...user,
    groups: [{ id: "kKiGhamqyqlbeVR6LiOW", bookmarked: false }],
  });
  return userRef.id;
};

export const signIn = async (email, password) => {
  console.log("shit");
  const usersDoc = await db
    .collection("users")
    .where("email", "==", email)
    .get();
  if (usersDoc.empty) {
    throw new Error("USER_NOT_FOUND");
  }

  let user;
  usersDoc.forEach((doc) => {
    user = { id: doc.id, ...doc.data() };
  });

  if (user.password !== password) {
    throw new Error("USER_NOT_FOUND");
  }

  return user.id;
};
