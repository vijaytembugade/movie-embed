import React from "react";

import { Pagination, Space, Spin, Table } from "antd";
import "./Tables.css";
import { useSearch } from "../../Context/SearchContext";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: 250,
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Release Date",
    dataIndex: "releaseDate",
    key: "releaseDate",
    width: 250,
    sorter: (a, b) => Date.parse(a.releaseDate) - Date.parse(b.releaseDate),
  },
  {
    title: "Director",
    dataIndex: "director",
    key: "director",
    width: 250,
  },
  {
    title: "Genres",
    dataIndex: "genres",
    key: "genres",
    width: 250,
  },
  {
    title: "Rotten Tomatoes Rating",
    dataIndex: "rating",
    key: "rating",
    width: 250,
    sorter: (a, b) => parseInt(a.rating) - parseInt(b.rating),
  },
];

const Tables = () => {
  const { state, handlePageChange } = useSearch();
  const { data, loading, totalResult } = state;

  return (
    <div className="tables-container">
      <Space direction={"vertical"} size={25}>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            size="middle"
          />
        )}
        <Pagination
          defaultCurrent={1}
          total={totalResult}
          pageSize={9}
          onChange={handlePageChange}
          hideOnSinglePage={true}
          showQuickJumper={true}
          showSizeChanger={false}
        />
      </Space>
    </div>
  );
};

export default Tables;
