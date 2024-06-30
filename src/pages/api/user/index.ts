import { supabase } from "@/lib/supabaseClient";

export interface getUserAttendanceList {
  KEY: string;
  NAME: string;
  birthYear: string;
  attendance: number;
  meetings: number;
  joinDate: string;
}

//전체 유저 기보정보와 유저의 출석 및 모임 개설 횟수 조회 리스트
export async function getUserAttendance(): Promise<getUserAttendanceList[]> {
  const { data, error } = (await supabase.rpc("get_user_attendance", {})) as {
    data: getUserAttendanceList[];
    error: any;
  };

  // data;
  console.log("data: ", data);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  return data.map((item) => ({
    KEY: item.KEY,
    NAME: item.NAME,
    birthYear: item.birthYear,
    attendance: item.attendance,
    meetings: item.meetings,
    joinDate: item.joinDate,
  }));
}

//유저 삭제 (활동여부 false 처리)
export async function deleteUser(userId: string) {
  //console.log("userId: ", userId);
  // const { data, error } = await supabase.from("user").delete().eq("id", userId);

  const { data, error } = await supabase.from("user").update({ activation: false }).eq("id", userId).select();

  //console.log("userId: ", userId);

  // data
  //console.log("data: ", data);
  // error
  //console.log("error: ", error);
  if (error) {
    console.error("Error fetching data:", error);
  }
}

//한명의 유저 정보상세
export async function getUserInfoDetailsAndMeetingCounts(userId: string) {
  const { data, error } = await supabase.rpc("get_user_info_details_and_meeting_counts", { user_id: userId });

  // data
  // //console.log("data: ", data);
  // // error
  // //console.log("error: ", error);

  if (error) {
    console.error("Error executing query:", error);
    return null;
  }

  if (data.length === 0) {
    return null;
  }

  return {
    UserInfo: {
      nameAndBirthYear: `${data[0].name} (${data[0].birth_year})`,
      grade: data[0].activation ? "Active" : "Inactive",
      createdAt: new Date().toLocaleDateString(), // createdAt 정보가 없으므로 현재 날짜로 대체
    },
    UserInfoDetail: {
      email: data[0].email,
      phoneNumber: data[0].phoneNumber || "", // phoneNumber 정보가 없으므로 빈 문자열로 대체
      participationCount: data[0].participation_count,
      openingsCount: data[0].meeting_count,
    },
  };
}

interface MeetingMember {
  name: string;
  avatar: string;
  meetingId: string;
  meetingPlace: string;
  meetingDetailPlace: string;
  meetingTime: string;
}

export async function getMeetingDate(meetingDate: string): Promise<MeetingMember[]> {
  const { data, error } = await supabase
    .from("meeting")
    .select(
      `
      _id,
      created_at,
      name,
      birthYear,
      accountId,
      meeting_date,
      location (name, detail)
    `
    )
    .eq("meeting_date", meetingDate);
  //console.log("meetingDate: ", meetingDate);

  // data
  //console.log("data: ", data);
  // error
  //console.log("error: ", error);
  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  return data.map((item: any) => ({
    name: `${item.name} (${item.birthYear})`,
    avatar: "https://github.com/shadcn.png", // 고정된 아바타 URL
    meetingId: item._id,
    meetingPlace: item.location.name,
    meetingDetailPlace: item.location.detail,
    meetingTime: item.meeting_date,
  }));
}
