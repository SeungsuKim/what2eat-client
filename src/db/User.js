import firebase, { db } from "../firebase";

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
    groups: [
      { id: "kKiGhamqyqlbeVR6LiOW", bookmarked: false },
      { id: "RcQQ7EppATHEVLyMidm9", bookmarked: false },
    ],
  });

  const groupRef1 = db.collection("groups").doc("kKiGhamqyqlbeVR6LiOW");
  groupRef1.update({
    users: firebase.firestore.FieldValue.arrayUnion({
      id: userRef.id,
      ...user,
    }),
  });

  const groupRef2 = db.collection("groups").doc("RcQQ7EppATHEVLyMidm9");
  groupRef2.update({
    users: firebase.firestore.FieldValue.arrayUnion({
      id: userRef.id,
      ...user,
    }),
  });

  return userRef.id;
};

export const signIn = async (email, password) => {
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

export const getUser = async (userId) => {
  const userRef = await db.collection("users").doc(userId).get();

  return { id: userRef.id, ...userRef.data() };
};
