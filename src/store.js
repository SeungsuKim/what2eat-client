import React, { createContext, useReducer } from "react";

const initialState = {
  user: {
    id: "cR7kujH7yuwYTlfxbD3B",
    name: "김승수",
    email: "seungsu0407@gmail.com",
    groups: [{ id: "kKiGhamqyqlbeVR6LiOW", bookmarked: true }],
  },
  groups: [],
  group: null,
  loading: true,
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
      default:
        throw new Error("Unkown action has dispatched.");
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
