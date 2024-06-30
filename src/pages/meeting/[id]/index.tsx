// pages/index.tsx
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import MeetingForm from "@/components/shared/molecules/meetingForm";
import { useAuth } from "@/lib/auth/auth-provider";
import { getMeetingDateByid } from "@/pages/api/meeting";
import { GetServerSideProps } from "next";

const pageHeader: IPageHeader = {
  title: "Welcome",
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

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

interface IndexPageProps {
  meeting: any;
}

const IndexPage: IDefaultLayoutPage<IndexPageProps> = ({ meeting }) => {
  const { session } = useAuth();

  return (
    <>
      <h2 className="title">👋 {session.user.name || "관리자"}님 안녕하세요!</h2>
      <MeetingForm meeting={meeting} />
    </>
  );
};

IndexPage.getLayout = getDefaultLayout;
IndexPage.pageHeader = pageHeader;

export default IndexPage;
