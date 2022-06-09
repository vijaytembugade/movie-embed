import React from "react";
import "./Search.css";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useSearch } from "../../Context/SearchContext";

const Search = () => {
  const { handleSearch } = useSearch();

  return (
    <div className="search-component">
      <Input
        size="large"
        placeholder="Search a movie"
        prefix={<SearchOutlined />}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
