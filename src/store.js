import React, { createContext, useReducer } from "react";

const initialState = {
  user: null,
  groups: [],
  group: null,
  menus: [],
  loading: true,
  rejectionCount: 2,
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "START_LOADING":
        return {
          ...state,
          loading: true,
        };
      case "END_LOADING":
        return {
          ...state,
          loading: false,
        };
      case "SET_USER":
        return { ...state, user: action.payload };
      case "SET_GROUPS":
        return {
          ...state,
          groups: action.payload,
        };
      case "SET_GROUP":
        return {
          ...state,
          group: action.payload,
        };
      case "SET_MENUS":
        return {
          ...state,
          menus: action.payload,
        };
      case "ADD_MENU_TO_VOTE":
        const menu = action.payload;
        if (!state.menus.map(({ id }) => id).includes(menu.menu.id)) {
          return {
            ...state,
            menus: [...state.menus, action.payload],
          };
        }
        return state;
      case "SET_REJECTION_COUNT":
        return {
          ...state,
          rejectionCount: action.payload,
        };
      case "SET_IS_JOINING":
        const users = state.group.users;
        const newUsers = users.map((user) =>
          user.id === state.user.id
            ? { ...user, isJoining: action.payload }
            : user
        );
        return { ...state, group: { ...state.group, users: newUsers } };
      case "SET_OPENEDAT":
        return {
          ...state,
          group: { ...state.group, openedAt: action.payload },
        };
      default:
        throw new Error("Unkown action has dispatched.");
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
