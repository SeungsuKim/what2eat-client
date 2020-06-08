import React, { useContext, useEffect, useState } from "react";

import { fetchMenuByTags } from "../../db/Menu";
import { store } from "../../store";
import ExplorePresenter from "./ExplorePresenter";

const ExploreContainer = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { menus: menusOnVote } = state;

  const [menus, setMenus] = useState([]);
  const [tags, setTags] = useState([]);
  const [excludedTags, setExcludedTags] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const fetchedMenus = await fetchMenuByTags(tags, excludedTags);
      setMenus(fetchedMenus);
    };

    fetchMenus();
  }, [tags, excludedTags]);

  const menuProps = {
    menus,
    addMenu: (menu) => {},
  };

  const tagProps = {
    tags,
    excludedTags,
    addTag: async (tag) => {
      if (!tags.map(({ id }) => id).includes(tag.id)) {
        const newTags = [...tags, tag];
        setTags(newTags);
      }
    },
    removeTag: (tag) => setTags(tags.filter((t) => t.id !== tag.id)),
    addExcludedTag: (tag) => {
      if (!excludedTags.map(({ id }) => id).includes(tag.id)) {
        setExcludedTags([...excludedTags, tag]);
      }
    },
    removeExcludedTag: (tag) =>
      setExcludedTags(excludedTags.filter((t) => t.id !== tag.id)),
  };

  return (
    <ExplorePresenter
      menuProps={menuProps}
      tagProps={tagProps}
      menusOnVote={menusOnVote}
    />
  );
};

export default ExploreContainer;
