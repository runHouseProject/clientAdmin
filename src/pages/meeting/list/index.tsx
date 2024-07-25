import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import { useAuth } from "@/lib/auth/auth-provider";
import SortTable from "@/components/shared/table";
import type { TableColumnsType } from "antd";
import { GetServerSideProps } from "next";
import { getMeetingDataAll } from "@/pages/api/meeting";

import { CheckCircleTwoTone, CloseCircleTwoTone, EditTwoTone } from "@ant-design/icons";
import { Space } from "antd";

const pageHeader: IPageHeader = {
  title: "모임 리스트",
};

interface DataType {
  key: string;
  [key: string]: any;
}

type DataIndex = keyof DataType;

const columnsConfig: TableColumnsType<DataType> = [
  {
    title: "개설일",
    dataIndex: "meeting_date",
    key: "meeting_date",
    width: "15%",
  },
  {
    title: "장소",
    dataIndex: "location",
    key: "location",
    width: "15%",
  },
  {
    title: "활동",
    dataIndex: "activation",
    key: "activation",
    width: "15%",
  },
  {
    title: "개설여부",
    dataIndex: "founder",
    key: "founder",
    width: "15%",
    // render: (text) => (text ? "yes" : "no"),
    // render: (text) =>
    //   text ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#eb2f96" />,
  },
  {
    title: "이름",
    dataIndex: "participantName",
    key: "participantName",
    width: "20%",
  },
  {
    title: "출석체크시간",
    dataIndex: "checkInTime",
    key: "checkInTime",
    width: "15%",
  },
  {
    title: "수정/삭제",
    dataIndex: "key",
    key: "key",
    render: (text) => (
      <a href={`/meeting/${text}`}>
        <EditTwoTone />
      </a>
    ),
  },
];

const searchableColumns: DataIndex[] = [
  "founder",
  "openDate",
  "meeting_date",
  "location",
  "participantName",
  "activation",
];
const sortableColumns: DataIndex[] = ["openDate", "founder", "meeting_date"];

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getMeetingDataAll();
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
