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

// export const setIsJoining = async (groupId, userId, isJoining) => {
//   const groupRef = db.collection("groups").doc(groupId);

//   const { users } = (await groupRef.get()).data();
//   const newUsers = users.map((user) =>
//     user.id === userId ? { ...user, isJoining } : user
//   );

//   groupRef.update({ users: newUsers });
// };

export const setOpenedAt = (groupId, openedAt) => {
  const groupRef = db.collection("groups").doc(groupId);

  groupRef.update({ openedAt });
};

export const getJoiningUsers = async (groupId) => {
  const users = [];
  const usersRef = await db.collection("users").get();
  usersRef.forEach((doc) => users.push({ id: doc.id, ...doc.data() }));

  return users.filter(
    (user) => user.joiningGroupId && user.joiningGroupId === groupId
  );
};

export const setBookmarked = async (groupId, bookmarked) => {
  const groupRef = db.collection("groups").doc(groupId);

  groupRef.update({ bookmarked });
};
