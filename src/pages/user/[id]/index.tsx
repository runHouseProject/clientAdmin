// pages/index.tsx
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import MeetingForm from "@/components/shared/molecules/MeetingForm";
import { useAuth } from "@/lib/auth/auth-provider";
import { getUserInfoById } from "@/pages/api/user";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const pageHeader: IPageHeader = {
  title: "Welcome",
};

interface Option {
  value: string;
  label: string;
}

interface FormField {
  name: string;
  label: string;
  type: "input" | "inputNumber" | "select" | "datePicker" | "checkbox" | "switch";
  options?: Option[];
  disabled?: boolean;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  //console.log("id: ", id);

  try {
    const userData = await getUserInfoById(id);
    //console.log("meeting: 1111111111111111", userData);
    return {
      props: {
        userData,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

interface IndexPageProps {
  userData: any;
}

const IndexPage: IDefaultLayoutPage<IndexPageProps> = ({ userData }) => {
  const { session } = useAuth();
  const router = useRouter();

  const fields: FormField[] = [
    { name: "NAME", label: "이름", type: "input" },
    { name: "birthYear", label: "년생", type: "input", disabled: true },
    { name: "email", label: "이메일", type: "input" },
    { name: "attendance", label: "참여 횟수", type: "input", disabled: true },
    { name: "meetings", label: "개설자 횟수", type: "input", disabled: true },
    { name: "joinDate", label: "가입 일", type: "datePicker" },
  ];

  const handleFormFinish = async (values: any) => {
    //console.log("Form values:3333333", values);
    // API 호출 예시
    try {
      // await updateMeeting(values);
      router.push("/meeting/list"); // 이전 페이지로 이동
    } catch (error) {
      console.error("Failed to update meeting:", error);
    }
  };

  const handleDelete = async (id: string) => {
    //console.log("Delete meeting with id:3333333", id);
    // API 호출 예시
    try {
      // await deleteMeetingDataById(id);
      router.push("/meeting/list"); // 이전 페이지로 이동
    } catch (error) {
      console.error("Failed to delete meeting:", error);
    }
  };

  const handleClose = () => {
    router.back(); // 이전 페이지로 이동
  };

  return (
    <>
      {/* <h2 className="title">👋 {session.user.name || "관리자"}님 안녕하세요!</h2> */}
      <MeetingForm
        meeting={userData}
        fields={fields}
        onFormFinish={handleFormFinish}
        onDelete={handleDelete}
        onClose={handleClose}
        layout={{ labelCol: { span: 24 }, wrapperCol: { span: 24 } }}
      />
    </>
  );
};

IndexPage.getLayout = getDefaultLayout;
IndexPage.pageHeader = pageHeader;

export default IndexPage;
