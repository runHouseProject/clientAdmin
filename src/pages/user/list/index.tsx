import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import { useAuth } from "@/lib/auth/auth-provider";
import SortTable from "@/components/shared/table";
import type { InputRef, TableColumnType, TableColumnsType } from "antd";
import { getUserAttendance, getUserAttendanceList } from "@/pages/api/user";
import { GetServerSideProps } from "next";
import { CheckCircleTwoTone, CloseCircleTwoTone, EditTwoTone } from "@ant-design/icons";

const pageHeader: IPageHeader = {
  title: "Welcome",
};

interface DataType {
  key: string;
  [key: string]: any;
}

type DataIndex = keyof DataType;

const columnsConfig: TableColumnsType<DataType> = [
  {
    title: "이름",
    dataIndex: "NAME",
    key: "NAME",
    width: "8%",
  },
  {
    title: "년생",
    dataIndex: "birthYear",
    key: "birthYear",
    width: "8%",
  },
  {
    title: "출석횟수",
    dataIndex: "attendance",
    key: "attendance",
    width: "15%",
  },
  {
    title: "모임개설횟수",
    dataIndex: "meetings",
    key: "meetings",
    width: "15%",
  },
  {
    title: "가입일",
    dataIndex: "joinDate",
    key: "joinDate",
    width: "20%",
  },
  {
    title: "수정 및 삭제",
    dataIndex: "KEY",
    key: "KEY",
    render: (text) => (
      <a href={`/user/${text}`}>
        <EditTwoTone />
      </a>
    ),
    width: "10%",
  },
];

const searchableColumns: DataIndex[] = ["NAME", "birthYear", "attendance", "meetings"];
const sortableColumns: DataIndex[] = ["birthYear", "attendance", "meetings", "joinDate"];

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getUserAttendance();

  return {
    props: {
      data,
    },
  };
};

interface IndexPageProps {
  data: DataType[];
}

const IndexPage: IDefaultLayoutPage<IndexPageProps> = ({ data }) => {
  const { session } = useAuth();
  // const { data, error } = useDashboard();
  return (
    <>
      {/* <h2 className="title">👋 {session.user.name || "관리자"}님 안녕하세요!</h2> */}
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
