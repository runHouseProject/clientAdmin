// import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
// import { useAuth } from "@/lib/auth/auth-provider";
// import SortTable from "@/components/shared/table";
// import type { InputRef, TableColumnType, TableColumnsType } from "antd";
// const pageHeader: IPageHeader = {
//   title: "Welcome",
// };

// interface DataType {
//   key: string;
//   [key: string]: any;
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
//   // ... (other data entries)
// ];

// const columnsConfig: TableColumnsType<DataType> = [
//   {
//     title: "이름",
//     dataIndex: "name",
//     key: "name",
//     width: "20%",
//   },
//   {
//     title: "년생",
//     dataIndex: "birthYear",
//     key: "birthYear",
//     width: "10%",
//   },
//   {
//     title: "출석횟수",
//     dataIndex: "attendance",
//     key: "attendance",
//     width: "15%",
//   },
//   {
//     title: "모임개설횟수",
//     dataIndex: "meetings",
//     key: "meetings",
//     width: "15%",
//   },
//   {
//     title: "가입일",
//     dataIndex: "joinDate",
//     key: "joinDate",
//     width: "20%",
//   },
//   {
//     title: "유저상세",
//     dataIndex: "key",
//     key: "key",
//     render: (text) => <a href={`/user/${text}`}>View Details</a>,
//   },
// ];

// const searchableColumns: DataIndex[] = ["name", "birthYear", "attendance", "meetings"];
// const sortableColumns: DataIndex[] = ["birthYear", "attendance", "meetings", "joinDate"];

// const IndexPage: IDefaultLayoutPage = () => {
//   const { session } = useAuth();
//   // const { data, error } = useDashboard();
//   return (
//     <>
//       <h2 className="title">👋 {session.user.name || "관리자"}님 안녕하세요!</h2>
//       <SortTable
//         data={data}
//         columnsConfig={columnsConfig}
//         searchableColumns={searchableColumns}
//         sortableColumns={sortableColumns}
//       />
//     </>
//   );
// };

// IndexPage.getLayout = getDefaultLayout;
// IndexPage.pageHeader = pageHeader;

// export default IndexPage;

import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import { useAuth } from "@/lib/auth/auth-provider";
import SortTable from "@/components/shared/table";
import type { InputRef, TableColumnType, TableColumnsType } from "antd";
const pageHeader: IPageHeader = {
  title: "Welcome",
};

interface DataType {
  key: string;
  [key: string]: any;
}
type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",
    openDate: "2023-01-01",
    location: "Seoul",
    regularRun: "Yes",
    participantName: "John Brown",
    checkInTime: "08:00",
  },
  {
    key: "2",
    openDate: "2023-01-05",
    location: "Busan",
    regularRun: "Yes",
    participantName: "Joe Black",
    checkInTime: "09:00",
  },
  {
    key: "3",
    openDate: "2023-02-15",
    location: "Incheon",
    regularRun: "Yes",
    participantName: "Jim Green",
    checkInTime: "07:30",
  },
  // ... (other data entries)
];

const columnsConfig: TableColumnsType<DataType> = [
  {
    title: "개설일",
    dataIndex: "openDate",
    key: "openDate",
    width: "15%",
  },
  {
    title: "장소",
    dataIndex: "location",
    key: "location",
    width: "15%",
  },
  {
    title: "정기런여부",
    dataIndex: "regularRun",
    key: "regularRun",
    width: "15%",
    // render: (text) => (text ? "Yes" : "No"),
  },
  {
    title: "참가자 이름",
    dataIndex: "participantName",
    key: "participantName",
    width: "20%",
  },
  {
    title: "출석체크 진행시간",
    dataIndex: "checkInTime",
    key: "checkInTime",
    width: "20%",
  },
  {
    title: "상세",
    dataIndex: "key",
    key: "key",
    render: (text) => <a href={`/meeting/${text}`}>View Details</a>,
  },
];

const searchableColumns: DataIndex[] = ["openDate", "regularRun", "location", "participantName"];
const sortableColumns: DataIndex[] = ["no", "openDate"];

const IndexPage: IDefaultLayoutPage = () => {
  const { session } = useAuth();
  // const { data, error } = useDashboard();
  return (
    <>
      <h2 className="title">👋 {session.user.name || "관리자"}님 안녕하세요!</h2>
      <SortTable
        data={data}
        columnsConfig={columnsConfig}
        searchableColumns={searchableColumns}
        sortableColumns={sortableColumns}
      />
    </>
  );
};

IndexPage.getLayout = getDefaultLayout;
IndexPage.pageHeader = pageHeader;

export default IndexPage;
