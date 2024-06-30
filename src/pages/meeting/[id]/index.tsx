import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import { useAuth } from "@/lib/auth/auth-provider";
import { getMeetingDateByid } from "@/pages/api/meeting";
import { GetServerSideProps } from "next";

const pageHeader: IPageHeader = {
  title: "Welcome",
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  console.log("id: ", id);

  try {
    const meeting = await getMeetingDateByid(id);
    console.log("meeting: ", meeting);
    return {
      props: {
        meeting,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
const IndexPage: IDefaultLayoutPage = () => {
  const { session } = useAuth();
  // const { data, error } = useDashboard();
  return (
    <>
      <h2 className="title">👋 {session.user.name || "관리자"}님 안녕하세요!</h2>
    </>
  );
};

IndexPage.getLayout = getDefaultLayout;
IndexPage.pageHeader = pageHeader;

export default IndexPage;
