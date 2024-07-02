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
  // console.log("data: ", data);

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
  console.log("deleteUser userId: ", userId);

  const { data, error } = await supabase.from("user").update({ activation: false }).eq("id", userId).select();
  console.log("deleteUser data: ", data);

  if (error) {
    console.error("Error fetching data:", error);
  }
}

//한명의 유저 정보상세
export async function getUserInfoById(accountId: string) {
  console.log("getUserInfoById userId: ", accountId);

  const { data, error } = await supabase.rpc("get_user_details_and_meeting_counts", { account_id: accountId });

  console.log("data: ", data);

  if (error) {
    console.error("Error executing query:", error);
    return null;
  }

  if (data.length === 0) {
    return null;
  }

  const firstItem = data[0];

  return {
    KEY: firstItem.key ?? "N/A",
    NAME: firstItem.name ?? "N/A",
    birthYear: firstItem.birthyear ?? "N/A",
    email: firstItem.email ?? "N/A",
    attendance: firstItem.attendance ?? "N/A",
    meetings: firstItem.meetings ?? "N/A",
    joinDate: firstItem.joindate ?? "N/A",
  };
}

export async function getActiveUserCount() {
  const { data, error, count } = await supabase.from("user").select("*", { count: "exact" }).eq("activation", true);
  console.log("count4444:33 ", count);
  console.log("data111111: ", data);

  if (error) {
    console.error("Error fetching count:", error);
    return null;
  } else {
    console.log("Count of rows where activation is true:", count);
  }

  if (data.length === 0) {
    return null;
  }

  const result: number | null = count;

  return count;
}
