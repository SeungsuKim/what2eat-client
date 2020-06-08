import React, { useState } from "react";

import { searchMenu } from "../../db/Menu";
import { searchTag } from "../../db/Tag";
import SearchPresenter from "./SearchPresenter";

const SearchContainer = ({ tagActions }) => {
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

  const inputProps = {
    value: term,
    onChange: handleTermChange,
  };

  return (
    <SearchPresenter
      tabs={tabs}
      tabIndex={tabIndex}
      setTabIndex={setTabIndex}
      inputProps={inputProps}
      menus={menus}
      tags={tags}
      {...tagActions}
    />
  );
};

export default SearchContainer;
