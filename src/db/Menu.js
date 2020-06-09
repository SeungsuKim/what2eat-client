import firebase, { db } from "../firebase";

export const getResult = async (groupId) => {
  const group = await db.collection("groups").doc(groupId).get();
  const result = group.data().menus;

  const rejectedResult = result.filter((r) => r.rejectedBy.length !== 0);
  const nonRejectedResult = result.filter((r) => r.rejectedBy.length === 0);

  const sortBy = (f, s) => f.likedBy.length - s.likedBy.length;

  return [...nonRejectedResult.sort(sortBy), ...rejectedResult.sort(sortBy)];
};

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

export const fetchMenuByTags = async (tags, excludedTags) => {
  const query = await db.collection("menus").get();
  let menus = [];
  query.forEach((doc) => menus.push({ id: doc.id, ...doc.data() }));

  menus = menus.map((menu) => {
    const negativeTags = menu.tags.filter((tag) =>
      excludedTags.map(({ tag }) => tag).includes(tag)
    );
    const positiveTags = menu.tags.filter((tag) =>
      tags.map(({ tag }) => tag).includes(tag)
    );

    return {
      ...menu,
      priority: positiveTags.length - negativeTags.length,
    };
  });

  menus.sort((f, s) => s.priority - f.priority);

  return menus;
};

export const addMenuToVote = async (menu, user, groupId) => {
  const groupRef = db.collection("groups").doc(groupId);
  groupRef.update({
    menus: firebase.firestore.FieldValue.arrayUnion({
      menu,
      owner: user,
      likedBy: [user],
      rejectedBy: [],
      viewedBy: [user],
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    }),
  });
};

export const toggleMenuLike = async (menu, user, groupId, like) => {
  const groupRef = db.collection("groups").doc(groupId);
  const groupData = (await groupRef.get()).data();
  const menus = groupData.menus;

  for (let i = 0; i < menus.length; i++) {
    if (menus[i].menu.id === menu.id) {
      if (!like) {
        for (let j = 0; j < menus[i].likedBy.length; j++) {
          if (menus[i].likedBy[j].id === user.id) {
            menus[i].likedBy.splice(j, 1);
          }
        }
      } else {
        let seen = false;
        for (let j = 0; j < menus[i].likedBy.length; j++) {
          if (menus[i].likedBy[j].id === user.id) {
            seen = true;
          }
        }

        if (!seen) {
          menus[i].likedBy.push(user);
        }
      }

      break;
    }
  }

  await groupRef.update({
    menus: menus,
  });

  return menus;
};

export const toggleMenuReject = async (menu, user, groupId, reject) => {
  const groupRef = db.collection("groups").doc(groupId);
  const groupData = (await groupRef.get()).data();
  const menus = groupData.menus;

  console.log('toggle reject')

  for (let i = 0; i < menus.length; i++) {
    if (menus[i].menu.id === menu.id) {
      if (!reject) {
        for (let j = 0; j < menus[i].rejectedBy.length; j++) {
          if (menus[i].rejectedBy[j].id === user.id) {
            menus[i].rejectedBy.splice(j, 1);
            console.log(menus[i]);
          }
        }
      } else {
        let seen = false;
        for (let j = 0; j < menus[i].rejectedBy.length; j++) {
          if (menus[i].rejectedBy[j].id === user.id) {
            seen = true;
          }
        }

        if (!seen) {
          menus[i].rejectedBy.push(user);
        }
      }

      break;
    }
  }

  await groupRef.update({
    menus: menus,
  });

  return menus;
};

export const toggleMenuView = async (menu, user, groupId, view) => {
  const groupRef = db.collection("groups").doc(groupId);
  const groupData = (await groupRef.get()).data();
  const menus = groupData.menus;

  console.log('toggle view')

  for (let i = 0; i < menus.length; i++) {
    if (menus[i].menu.id === menu.id) {
      if (!view) {
        for (let j = 0; j < menus[i].viewedBy.length; j++) {
          if (menus[i].viewedBy[j].id === user.id) {
            menus[i].viewedBy.splice(j, 1);
          }
        }
      } else {
        let seen = false;
        for (let j = 0; j < menus[i].viewedBy.length; j++) {
          if (menus[i].viewedBy[j].id === user.id) {
            seen = true;
          }
        }

        if (!seen) {
          menus[i].viewedBy.push(user);
        }
      }

      break;
    }
  }

  await groupRef.update({
    menus: menus,
  });

  return menus;
};
