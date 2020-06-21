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

    if (e.target.value.charAt(0) !== "#")
      searchMenu(e.target.value).then((menus) => setMenus(menus));

    let tt = e.target.value;
    if (tt.charAt(0) === "#") {
      tt = tt.slice(1);
    }
    searchTag(tt).then((tags) => setTags(tags));
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
