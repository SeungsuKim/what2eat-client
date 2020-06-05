import firebase, { db } from "../firebase";

export const searchMenu = async (term) => {
  try {
    const query = await db
      .collection("menus")
      .where("keywords", "array-contains", term)
      .get();
    const result = [];
    query.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const addMenuToVote = async (menu, user, groupId) => {
  const groupRef = db.collection("groups").doc(groupId);
  groupRef.update({
    menus: firebase.firestore.FieldValue.arrayUnion({
      menu,
      owner: user,
      likedBy: [user],
      rejectedBy: [],
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    }),
  });
};
