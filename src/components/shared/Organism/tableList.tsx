import CommonTable from "@/components/shared/tableList";
import React from "react";
import type { TableColumnsType } from "antd";

interface TableListComponentProps<T> {
  columns: TableColumnsType<T>;
  data: T[];
}

const TableListComponent = <T extends object>({ columns, data }: TableListComponentProps<T>) => {
  return (
    <>
      <div className="h-full p-5 border rounded-lg">
        <div className="mt-3">
          <div className="flex items-center mt-3"></div>
          <CommonTable columns={columns} data={data} size="small" />
        </div>
      </div>
    </>
  );
};

export default TableListComponent;
