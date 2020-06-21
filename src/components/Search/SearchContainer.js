import React, { useState } from "react";

import { searchMenu } from "../../db/Menu";
import { searchTag } from "../../db/Tag";
import SearchPresenter from "./SearchPresenter";

const SearchContainer = ({ addTag, addExcludedTag }) => {
  const tabs = ["Recommended", "Menus", "Tags", "Exclude Tags"];

  const [tabIndex, setTabIndex] = useState(0);
  const [term, setTerm] = useState("");

  const [menus, setMenus] = useState([]);
  const [tags, setTags] = useState([]);

  const handleTermChange = async (e) => {
    setTerm(e.target.value);

    searchMenu(e.target.value).then((menus) => setMenus(menus));
    searchTag(e.target.value).then((tags) => setTags(tags));
  };

  const resetTerm = (e) => {
    setTerm("");
  };

  const inputProps = {
    value: term,
    onChange: handleTermChange,
    resetTerm,
  };

  return (
    <SearchPresenter
      tabs={tabs}
      tabIndex={tabIndex}
      setTabIndex={setTabIndex}
      inputProps={inputProps}
      menus={menus}
      tags={tags}
      addTag={addTag}
      addExcludedTag={addExcludedTag}
    />
  );
};

export default SearchContainer;
