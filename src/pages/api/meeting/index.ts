import { supabase } from "@/lib/supabaseClient";
import { endOfWeek, format, getWeek, startOfWeek } from "date-fns";
import dayjs from "dayjs";

interface WeeklyMeetingCount {
  dateTime: string;
  weekNum: number;
  count: number;
}

interface Meeting {
  meeting_date: string;
}

//  <option value='1'>러닝</option>
//         <option value='2'>등산</option>
//         <option value='3'>자전거</option>
//         <option value='4'>기타</option>

interface MeetingData {
  key: string;
  participantName: string;
  meeting_date: string;
  birthYear: number;
  founder: string;
  checkInTime: string;
  activation: { name: string } | any;
  location: { name: string } | any;
}

/**
 * 모임 정보를 모두가져옵니다.
 *
 * @returns {Promise<MeetingData[]>} A promise that resolves to an array of MeetingData objects.
 * If an error occurs during the retrieval process, the promise will be rejected with the error.
 */
export async function getMeetingDataAll(): Promise<MeetingData[]> {
  const { data, error } = await supabase
    .from("meeting")
    .select(
      `
    _id,  
    name,
      meeting_date,
      birthYear,
      founder,
      created_at,
      activation:activation ( name ),
      location:location ( name )
    `
    )
    .or("delete.is.null,delete.eq.false")
    .order("meeting_date", { ascending: false })
    .order("founder", { ascending: false });

  console.log("data:33333 ", data);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  // 결과 매핑하여 activation과 location 필드로 변경
  return data.map((meeting: any) => ({
    key: meeting._id ?? "N/A",
    participantName: meeting.name ?? "N/A",
    meeting_date: meeting.meeting_date ?? "N/A",
    birthYear: meeting.birthYear ?? 0,
    founder: meeting.founder ? "YES" : "NO",
    checkInTime: dayjs(meeting.created_at).format("YYYY-MM-DD HH:mm") ?? "N/A", // created_at 포맷팅
    activation: meeting.activation?.name ?? "N/A",
    location: meeting.location?.name ?? "N/A",
  }));
}

/**
 * 주간 모임 수를 가져옵니다.
 *
 * @param {string} startDate - 시작 날짜를 나타내는 "yyyy-MM-dd" 형식의 문자열입니다.
 * @param {string} endDate - 종료 날짜를 나타내는 "yyyy-MM-dd" 형식의 문자열입니다.
 * @returns {Promise<WeeklyMeetingCount[]>} 주간 모임 수를 나타내는 객체 배열입니다.
 */
export async function getMeetingDataDateRange(startDate: string, endDate: string): Promise<WeeklyMeetingCount[]> {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Supabase에서 데이터 가져오기
  const { data, error } = await supabase
    .from("meeting")
    .select("meeting_date")
    .gte("meeting_date", format(start, "yyyy-MM-dd"))
    .lte("meeting_date", format(end, "yyyy-MM-dd"));

  if (error) {
    console.error(error);
    return [];
  }

  const weeklyCounts: WeeklyMeetingCount[] = [];

  let current = start;
  while (current <= end) {
    const weekStart = startOfWeek(current, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(current, { weekStartsOn: 1 });
    const formattedMonth = format(weekStart, "yyyy-MM");

    // 해당 주의 데이터를 필터링
    const weekData = data?.filter((meeting: Meeting) => {
      const meetingDate = new Date(meeting.meeting_date);
      return meetingDate >= weekStart && meetingDate <= weekEnd;
    });

    weeklyCounts.push({
      dateTime: formattedMonth,
      weekNum: getWeek(weekStart),
      count: weekData?.length || 0,
    });

    current = new Date(weekEnd.getTime() + 86400000); // Add one day to move to the next week
  }

  return weeklyCounts;
}

/**
 * 특정 날짜의 모임 데이터를 가져옵니다.
 *
 * @param {string} date - 가져올 모임 데이터의 날짜입니다.
 * @returns {Promise<Meeting[] | {}>} 모임 데이터를 가져오는 데 성공하면 해당 날짜의 모임 데이터 배열을 반환합니다. 그렇지 않으면 빈 객체를 반환합니다.
 */
export async function getMeetingDateOneDate(date: string) {
  const today = format(new Date(date), "yyyy-MM-dd");

  const { data, error } = await supabase.from("meeting").select("*", { count: "exact" }).eq("meeting_date", today);
  if (error) {
    console.error(error);
    return {};
  }

  return data;
}

/**
 * 특정 날짜의 모임 데이터를 가져옵니다.
 *
 * @param {string} date - 가져올 모임 데이터의 날짜입니다.
 * @returns {Promise<Meeting {}>} 모임 데이터를 가져오는 데 성공하면 해당 날짜의 모임 데이터 배열을 반환합니다. 그렇지 않으면 빈 객체를 반환합니다.
 */

interface SupabaseMeetingData {
  _id: string;
  name: string;
  meeting_date: string;
  birthYear: string;
  founder: boolean;
  created_at: string;
  activation: { name: string };
  location: { name: string };
}

/**
 * 특정 ID의 모임 데이터를 가져옵니다.
 *
 * @param {string} id - 가져올 모임 데이터의 ID입니다.
 * @returns {Promise<MeetingData>} 모임 데이터를 가져오는 데 성공하면 해당 모임 데이터를 반환합니다.
 * @throws {Error} 모임 데이터를 가져오는 데 실패하면 에러를 던집니다.
 */
export async function getMeetingDateById(id: string): Promise<MeetingData> {
  const { data, error } = await supabase
    .from("meeting")
    .select(
      `
      _id,
      name,
      meeting_date,
      birthYear,
      founder,
      created_at,
      activation:activation ( name ),
      location:location ( name )
    `
    )
    .eq("_id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch meeting data");
  }

  // data;

  if (!data) {
    throw new Error("Meeting data not found");
  }

  const meetingData = data as unknown as SupabaseMeetingData;

  return {
    key: meetingData._id ?? "N/A",
    participantName: meetingData.name ?? "N/A",
    meeting_date: meetingData.meeting_date ?? "N/A",
    birthYear: parseInt(meetingData.birthYear) ?? 0, // '93' -> 93
    founder: meetingData.founder ? "YES" : "NO",
    checkInTime: dayjs(meetingData.created_at).format("YYYY-MM-DD HH:mm") ?? "N/A",
    activation: meetingData.activation?.name ?? "N/A",
    location: meetingData.location?.name ?? "N/A",
  } as MeetingData;
}

interface UpdateMeetingParams {
  id: string;
  name?: string;
  meeting_date?: string;
  birthYear?: number;
  founder?: boolean;
  activation?: string;
  location?: string;
}

/**
 * 특정 ID의 모임 데이터를 수정합니다.
 * @param param0
 * @returns
 */
export async function updateMeeting({
  id,
  name,
  meeting_date,
  birthYear,
  founder,
  activation,
  location,
}: UpdateMeetingParams): Promise<{ data: any; error: any }> {
  let updates: any = { updated_at: new Date().toISOString() };

  if (name) updates.name = name;
  if (meeting_date) updates.meeting_date = meeting_date;
  if (birthYear) updates.birthYear = birthYear;
  if (founder !== undefined) updates.founder = founder;

  if (activation) {
    const { data: activationData, error: activationError } = await supabase
      .from("activation")
      .select("code")
      .eq("name", activation)
      .single();

    if (activationError) {
      // return { data: null, error: activationError };
      throw new Error("activationError");
    }

    updates.activation = activationData.code;
  }

  if (location) {
    const { data: locationData, error: locationError } = await supabase
      .from("location")
      .select("code")
      .eq("name", location)
      .single();

    if (locationError) {
      throw new Error("locationError");
    }

    updates.location = locationData.code;
  }

  const { data, error } = await supabase.from("meeting").update(updates).eq("_id", id).select();

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch meeting data");
  }

  if (!data) {
    throw new Error("Meeting data not found");
  }

  return { data, error };
}

/**
 * 특정 ID의 모임 데이터를 수정합니다.
 * @param param0
 * @returns
 */
export async function deleteMeetingDataById(id: string): Promise<{ data: any; error: any }> {
  let updates: any = { updated_at: new Date().toISOString() };
  if (id) updates.delete = true;
  const { data, error } = await supabase.from("meeting").update(updates).eq("_id", id).select();
  console.log("data333: ", data);
  console.log("error333: ", error);

  if (error) {
    throw new Error("Failed to fetch meeting data");
  }

  if (!data) {
    throw new Error("Meeting data not found");
  }

  return { data, error };
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

// <get_meeting_count_by_date_range>================================================================
// <월별 모임 개설 건수 파악  날짜 범위에서>
// CALL get_meeting_count_by_date_range(2023, 1, 2024, 9);

interface DataItem {
  year: number;
  month: number;
  founder_count: number;
}
export async function getMeetingCountByDateRange(
  p_start_year: string,
  p_start_month: string,
  p_end_year: string,
  p_end_month: string
) {
  // console.log("getUserInfoById userId: ", accountId);

  const { data, error } = await supabase.rpc("get_meeting_count_by_date_range", {
    p_start_year: parseInt(p_start_year),
    p_start_month: parseInt(p_start_month),
    p_end_year: parseInt(p_end_year),
    p_end_month: parseInt(p_end_month),
  });

  console.log("data get_meeting_count_by_date_range: ", data);

  function getThisMonthFounderCount(data: DataItem[]) {
    if (!data || data.length === 0) {
      return null;
    }
    const lastElement = data[data.length - 1];
    return lastElement.founder_count;
  }

  // data 배열의 첫 번째와 두 번째 객체에서 founder_count 값을 가져와 변화율을 계산해 반환하는 함수
  function getDiffLastMonth(data: DataItem[]) {
    if (!data || data.length < 2) {
      return null;
    }

    const firstElement = data[0];
    const secondElement = data[1];

    const firstCount = firstElement.founder_count;
    const secondCount = secondElement.founder_count;

    if (firstCount === 0 || secondCount === 0) {
      return null;
    }

    return (secondCount / firstCount) * 100 - 100;
  }

  if (error) {
    console.error("Error executing query:", error);
    return null;
  }

  if (data.length === 0) {
    return null;
  }

  const thisMonthFounderCount = getThisMonthFounderCount(data);
  const diffLastMonthRate = getDiffLastMonth(data);

  return {
    thisMonthFounderCount,
    diffLastMonthRate,
  };
}

interface ParticipateUserCountDataItem {
  year: number;
  month: number;
  meeting_count: number;
}

export async function getParticipateUserCountByDateRange(
  start_year: string,
  start_month: string,
  end_year: string,
  end_month: string
) {
  const { data, error } = await supabase.rpc("get_meeting_count_for_period", {
    start_year: parseInt(start_year),
    start_month: parseInt(start_month),
    end_year: parseInt(end_year),
    end_month: parseInt(end_month),
  });

  console.log("data get_meeting_count_by_date_range: ", data);
  console.log("data get_meeting_count_by_date_range error: ", error);

  function getThisMonthCount(data: ParticipateUserCountDataItem[]) {
    if (!data || data.length === 0) {
      return null;
    }
    const lastElement = data[data.length - 1];
    return lastElement.meeting_count;
  }

  // data 배열의 첫 번째와 두 번째 객체에서 founder_count 값을 가져와 변화율을 계산해 반환하는 함수
  function getDiffLastMonth(data: ParticipateUserCountDataItem[]) {
    if (!data || data.length < 2) {
      return null;
    }

    const firstElement = data[0];
    const secondElement = data[1];

    const firstCount = firstElement.meeting_count;
    const secondCount = secondElement.meeting_count;

    if (firstCount === 0 || secondCount === 0) {
      return null;
    }

    const result = (secondCount / firstCount) * 100 - 100;
    return parseInt(result.toFixed(0));
  }

  if (error) {
    console.error("Error executing query:", error);
    return null;
  }

  if (data.length === 0) {
    return null;
  }

  const thisMonthParticipateUserCount = getThisMonthCount(data);
  const diffLastMonthRate = getDiffLastMonth(data);

  return {
    thisMonthParticipateUserCount,
    diffLastMonthRate,
  };
}
