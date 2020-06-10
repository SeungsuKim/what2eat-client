import { db } from "../firebase";

export const getGroups = async (groupIds) => {
  try {
    const queries = await Promise.all(
      groupIds.map((groupId) => db.collection("groups").doc(groupId).get())
    );
    return queries.map((query) => ({ id: query.id, ...query.data() }));
  } catch (error) {
    console.log(error);
  }
};
