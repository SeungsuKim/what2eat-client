import { db } from "../firebase";

export const signUp = async (user) => {
  const usersDoc = await db
    .collection("users")
    .where("email", "==", user.email)
    .get();
  if (!usersDoc.empty) {
    throw new Error("USER_ALREADY_EXISTS");
  }

  const userRef = await db
    .collection("users")
    .add({
      ...user,
      groups: [{ id: "kKiGhamqyqlbeVR6LiOW", bookmarked: false }],
    });
  return userRef.id;
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
