// import { SearchOutlined } from "@ant-design/icons";
// import type { InputRef, TableColumnType, TableColumnsType } from "antd";
// import { Button, Input, Space, Table } from "antd";
// import type { FilterDropdownProps } from "antd/es/table/interface";
// import React, { useRef, useState } from "react";
// import Highlighter from "react-highlight-words";

// interface DataType {
//   key: string;
//   name: string;
//   birthYear: number;
//   attendance: number;
//   meetings: number;
//   joinDate: string;
// }

// type DataIndex = keyof DataType;

// const data: DataType[] = [
//   {
//     key: "1",
//     name: "John Brown",
//     birthYear: 1990,
//     attendance: 32,
//     meetings: 3,
//     joinDate: "2022-01-01",
//   },
//   {
//     key: "2",
//     name: "Joe Black",
//     birthYear: 1985,
//     attendance: 42,
//     meetings: 5,
//     joinDate: "2021-05-10",
//   },
//   {
//     key: "3",
//     name: "Jim Green",
//     birthYear: 1992,
//     attendance: 15,
//     meetings: 1,
//     joinDate: "2023-03-15",
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     birthYear: 1993,
//     attendance: 18,
//     meetings: 2,
//     joinDate: "2022-07-22",
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     birthYear: 1993,
//     attendance: 18,
//     meetings: 2,
//     joinDate: "2022-07-22",
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     birthYear: 1993,
//     attendance: 18,
//     meetings: 2,
//     joinDate: "2022-07-22",
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     birthYear: 1993,
//     attendance: 18,
//     meetings: 2,
//     joinDate: "2022-07-22",
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     birthYear: 1993,
//     attendance: 18,
//     meetings: 2,
//     joinDate: "2022-07-22",
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     birthYear: 1993,
//     attendance: 18,
//     meetings: 2,
//     joinDate: "2022-07-22",
//   },

//   {
//     key: "4",
//     name: "Jim Red",
//     birthYear: 1993,
//     attendance: 18,
//     meetings: 2,
//     joinDate: "2022-07-22",
//   },
//   {
//     key: "5",
//     name: "Jim Red",
//     birthYear: 1993,
//     attendance: 18,
//     meetings: 2,
//     joinDate: "2022-07-22",
//   },
//   {
//     key: "6",
//     name: "Jim Red",
//     birthYear: 1993,
//     attendance: 18,
//     meetings: 2,
//     joinDate: "2022-07-22",
//   },
//   {
//     key: "7",
//     name: "Jim Red",
//     birthYear: 1993,
//     attendance: 18,
//     meetings: 2,
//     joinDate: "2022-07-22",
//   },
// ];

// const SortTable: React.FC = () => {
//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState<DataIndex | "">("");
//   const searchInput = useRef<InputRef>(null);

//   const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps["confirm"], dataIndex: DataIndex) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };

//   const handleReset = (clearFilters: () => void) => {
//     clearFilters();
//     setSearchText("");
//   };

//   const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
//     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
//       <div style={{ padding: 8, width: 200 }} onKeyDown={(e) => e.stopPropagation()}>
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
//           style={{ marginBottom: 8, display: "block" }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({ closeDropdown: false });
//               setSearchText((selectedKeys as string[])[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               close();
//             }}
//           >
//             Close
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
//     onFilter: (value, record) =>
//       record[dataIndex]
//         .toString()
//         .toLowerCase()
//         .includes((value as string).toLowerCase()),
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ""}
//         />
//       ) : (
//         text
//       ),
//   });

//   const columns: TableColumnsType<DataType> = [
//     {
//       title: "이름",
//       dataIndex: "name",
//       key: "name",
//       width: "20%",
//       ...getColumnSearchProps("name"),
//     },
//     {
//       title: "년생",
//       dataIndex: "birthYear",
//       key: "birthYear",
//       width: "10%",
//       sorter: (a, b) => a.birthYear - b.birthYear,
//       ...getColumnSearchProps("birthYear"),
//     },
//     {
//       title: "출석횟수",
//       dataIndex: "attendance",
//       key: "attendance",
//       width: "15%",
//       sorter: (a, b) => a.attendance - b.attendance,
//       ...getColumnSearchProps("attendance"),
//     },
//     {
//       title: "모임개설횟수",
//       dataIndex: "meetings",
//       key: "meetings",
//       width: "15%",
//       sorter: (a, b) => a.meetings - b.meetings,
//       ...getColumnSearchProps("meetings"),
//     },
//     {
//       title: "가입일",
//       dataIndex: "joinDate",
//       key: "joinDate",
//       width: "20%",
//       sorter: (a, b) => new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime(),
//     },
//     {
//       title: "유저상세",
//       dataIndex: "key",
//       key: "key",
//       render: (text) => <a href={`/user/${text}`}>View Details</a>,
//     },
//   ];

//   return <Table columns={columns} dataSource={data} size="middle" />;
// };

// export default SortTable;

import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnType, TableColumnsType } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

interface DataType {
  key: string;
  [key: string]: any;
}

type DataIndex = keyof DataType;

interface SortTableProps {
  data: DataType[];
  columnsConfig: TableColumnsType<DataType>;
  searchableColumns: DataIndex[];
  sortableColumns: DataIndex[];
}

const SortTable: React.FC<SortTableProps> = ({ data, columnsConfig, searchableColumns, sortableColumns }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState<DataIndex | "">("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps["confirm"], dataIndex: DataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8, width: 200 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const enhancedColumns = columnsConfig.map((col) => {
    if ("dataIndex" in col && col.dataIndex && typeof col.dataIndex === "string") {
      const dataIndex = col.dataIndex as DataIndex;
      const newCol = { ...col };

      if (searchableColumns.includes(dataIndex)) {
        Object.assign(newCol, getColumnSearchProps(dataIndex));
      }

      if (sortableColumns.includes(dataIndex)) {
        newCol.sorter = (a, b) => {
          if (typeof a[dataIndex] === "number" && typeof b[dataIndex] === "number") {
            return a[dataIndex] - b[dataIndex];
          } else if (typeof a[dataIndex] === "string" && typeof b[dataIndex] === "string") {
            return a[dataIndex].localeCompare(b[dataIndex]);
          }
          return 0;
        };
      }

      return newCol;
    }
    return col;
  });

  return <Table columns={enhancedColumns} dataSource={data} size="middle" />;
};

export default SortTable;
