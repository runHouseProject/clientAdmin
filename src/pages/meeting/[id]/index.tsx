// pages/index.tsx
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import MeetingForm from "@/components/shared/molecules/MeetingForm";
import { useAuth } from "@/lib/auth/auth-provider";
import { deleteMeetingDataById, getMeetingDateById, updateMeeting } from "@/pages/api/meeting";
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

  try {
    const meeting = await getMeetingDateById(id); //유저 정보 가져오기
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
  const router = useRouter();

  const fields: FormField[] = [
    { name: "participantName", label: "이름", type: "input", disabled: true },
    { name: "birthYear", label: "년생", type: "inputNumber", disabled: true },
    { name: "meeting_date", label: "참여일", type: "datePicker" },
    { name: "founder", label: "개설자 여부", type: "switch" },
    {
      name: "activation",
      label: "활동",
      type: "select",
      options: [
        { value: "러닝", label: "러닝" },
        { value: "등산", label: "등산" },
        { value: "자전거", label: "자전거" },
        { value: "기타", label: "기타" },
      ],
    },
    {
      name: "location",
      label: "장소",
      type: "select",
      options: [
        { value: "태평", label: "태평" },
        { value: "야탑", label: "야탑" },
        { value: "모란", label: "모란" },
      ],
    },
  ];

  const handleFormFinish = async (values: any) => {
    //console.log("Form values:3333333", values);
    // API 호출 예시
    try {
      await updateMeeting(values);

      router.push("/meeting/list"); // 이전 페이지로 이동
    } catch (error) {
      console.error("Failed to update meeting:", error);
    }
  };

  const handleDelete = async (id: string) => {
    //console.log("Delete meeting with id:3333333", id);
    // API 호출 예시
    try {
      await deleteMeetingDataById(id);
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
      <h2 className="title">👋 {session.user.name || "관리자"}님 안녕하세요!</h2>
      <MeetingForm
        meeting={meeting}
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
