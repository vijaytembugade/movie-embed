import React from "react";
import { DatePicker, Space } from "antd";
import { useSearch } from "../../Context/SearchContext";
const { RangePicker } = DatePicker;

const DateRange = () => {
  const { handleDateChange } = useSearch();
  return (
    <Space>
      <RangePicker allowClear onChange={handleDateChange} />
    </Space>
  );
};

export default DateRange;
