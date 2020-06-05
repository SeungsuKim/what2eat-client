import { db } from "../firebase";

export const searchTag = async (term) => {
  try {
    const query = await db
      .collection("tags")
      .where("keywords", "array-contains", term)
      .get();
    const result = [];
    query.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
    return result;
  } catch (error) {
    console.log(error);
  }
};
