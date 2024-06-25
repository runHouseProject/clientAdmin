import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";

interface CommonTableProps<T> {
  columns: TableColumnsType<T>;
  data: T[];
  size?: "small" | "middle" | "large";
}

const CommonTable = <T extends object>({ columns, data, size = "middle" }: CommonTableProps<T>) => {
  return <Table columns={columns} dataSource={data} size={size} />;
};

export default CommonTable;
