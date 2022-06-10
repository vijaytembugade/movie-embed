import React from "react";

import { Pagination, Space, Spin, Table, Tag } from "antd";
import "./Tables.css";
import { useSearch } from "../../Context/SearchContext";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: 200,
    fixed: "left",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Release Date",
    dataIndex: "releaseDate",
    key: "releaseDate",
    width: 200,
    sorter: (a, b) => Date.parse(a.releaseDate) - Date.parse(b.releaseDate),
  },
  {
    title: "Director",
    dataIndex: "director",
    key: "director",
    width: 200,
  },
  {
    title: "Genres",
    dataIndex: "genres",
    key: "genres",
    width: 200,
    render: (_, { genres }) => (
      <>
        {genres.map((tag) => {
          let color;

          if (tag === "Action") {
            color = "red";
          } else if (tag === "Animation") {
            color = "blue";
          } else if (tag.length > 5) {
            color = "green";
          } else {
            color = "purple";
          }

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Rotten Tomatoes Rating",
    dataIndex: "rating",
    key: "rating",
    width: 200,
    sorter: (a, b) => {
      if (a.rating === "N/A" || b.rating === "N/A") {
        if (a.rating === "N/A" && b.rating === "N/A") {
          a.rating = 0;
          b.rating = 0;
          const value = parseInt(a.rating) - parseInt(b.rating);
          a.rating = "N/A";
          b.rating = "N/A";
          return value;
        } else if (b.rating === "N/A") {
          b.rating = 0;
          const value = parseInt(a.rating) - parseInt(b.rating);
          b.rating = "N/A";
          return value;
        } else if (a.rating === "N/A") {
          a.rating = 0;
          const value = parseInt(a.rating) - parseInt(b.rating);
          a.rating = "N/A";
          return value;
        }
      }
      return parseInt(a.rating) - parseInt(b.rating);
    },
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
          responsive={true}
        />
      </Space>
    </div>
  );
};

export default Tables;
