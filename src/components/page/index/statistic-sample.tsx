import { IDashboardResponse } from "@/client/sample/dashboard";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";

import CountUp from "react-countup";
import { LineChartComponent, TinyAreaChartComponent, BasicLineChart } from "@/components/shared/chart";
import { BasicBarChart, MultiBarChart, StackedBarChart } from "@/components/shared/barChart";
import { BasicPieChart, DonutPieChart, CustomLabelPieChart } from "@/components/shared/pieChart";
import ProcessDivComponent from "@/components/shared/Organism/processDiv";
import AttendanceProgressComponent, { ProgressBarData } from "@/components/shared/Organism/AttendanceProgress";
import UserCountComponent, { TableListData } from "@/components/shared/userCountComponent";
import { getCurrentMonthInfoWithPercent } from "@/pages/api/utils";
import { getActiveUserCount } from "@/pages/api/user";
import { GetServerSideProps } from "next";
import { LoadingOutlined } from "@ant-design/icons";
import { Space, Spin } from "antd";
import {
  getDistinctFounderCountByPeriod,
  getDistinctUserForPeriodByMonth,
  getMeetingCountByDateRange,
  getParticipateUserCountByDateRange,
  getParticipationRationByLocation,
  getParticipationTrendData,
} from "@/pages/api/meeting";

interface ChartComponentProps {
  data: Array<{ name: string; dataCount: number }>;
}

const ChartData = [
  { name: "Mon", uv: 25, dataCount: 2400 },
  { name: "Tue", uv: 10, dataCount: 2210 },
  { name: "Wed", uv: 28, dataCount: 2290 },
  { name: "Thu", uv: 44, dataCount: 2000 },
  { name: "Fri", uv: 54, dataCount: 2181 },
  { name: "Sat", uv: 50, dataCount: 2500 },
  { name: "Sun", uv: 32, dataCount: 2500 },
];

interface IStatisticSampleProps {
  data: IDashboardResponse;
}

const renderChangeRate = (value: number) => {
  if (value > 0) {
    return (
      <span className="flex items-center px-2 py-1 text-sm text-white rounded-full bg-emerald">
        <ArrowUp className="w-5 h-4" />
        {value}%
      </span>
    );
  } else if (value < 0) {
    return (
      <span className="flex items-center px-2 py-1 text-sm text-white rounded-full bg-alizarin">
        <ArrowDown className="w-5 h-4" />
        {value}%
      </span>
    );
  } else {
    <span className="flex items-center px-2 py-1 text-sm text-white rounded-full bg-alizarin">{}</span>;
  }
};

const colData: TableListData[] = [
  { no: 1, name: "김건우 (99)", count: 90 },
  { no: 2, name: "송영규 (99)", count: 80 },
  { no: 3, name: "김선관 (81)", count: 70 },
  { no: 4, name: "서우혁 (82)", count: 50 },
  { no: 5, name: "전현진 (00)", count: 30 },
];

export const getServerSideProps: GetServerSideProps = async () => {
  const activeUserCount = await getActiveUserCount();
  console.log("activeUserCount:11 ", activeUserCount);

  return {
    props: {
      activeUserCount,
    },
  };
};

const AttendanceData: ProgressBarData[] = [
  { label: "종합운동장", percent: 90 },
  { label: "강남", percent: 50 },
  { label: "홍대", percent: 20 },
  { label: "홍대", percent: 10 },
  { label: "홍대", percent: 20 },
];

interface participationRationByLocationProps {
  data: Array<{ label: string; percent: number }>;
}

const StatisticSample = ({ data }: IStatisticSampleProps) => {
  console.log("data: ", data);
  const result = getCurrentMonthInfoWithPercent();
  console.log("result3333: ", result);
  const monthProcessPercent: ProgressBarData[] = [result];

  //총 크루원수
  const [activeUserCount, setActiveUserCount] = useState<number | null>(null);
  const [diffUserAccCountRatio, setDiffUserAccCountRatio] = useState<number | null>(null);

  //이달 모임건수
  const [meetingCount, setMeetingCount] = useState<number | null>(null);
  const [diffLastMontMeetingCount, setDiffLastMontMeetingCount] = useState<number | null>(null);

  //이달 참여자 수
  const [participateUserCount, setParticipateUserCount] = useState<number | null>(null);
  const [diffLastParticipateUserCount, setDiffLastParticipateUserCount] = useState<number | null>(null);

  //이달 참여크루원
  const [distinctParticipateUserCount, setDistinctParticipateUserCount] = useState<number | null>(null);
  const [diffLastDistinctParticipateUserCount, setDiffLastDistinctParticipateUserCount] = useState<number | null>(null);

  //이 달 모임 개설 크루원
  const [distinctFounderCount, setDistinctFounderCount] = useState<number | null>(null);
  const [diffLastDistinctFounderCount, setDiffLastDistinctFounderCount] = useState<number | null>(null);

  //참여자수 추이(주마다의 참여자수)의 추이
  const [participationTrendData, setParticipationTrendData] = useState<ChartComponentProps["data"] | null>(null);

  //장소별 참여율
  const [participationRationByLocation, setParticipationRationByLocation] = useState<
    participationRationByLocationProps["data"] | null
  >(null);

  useEffect(() => {
    //총 크루원수
    const fetchActiveUserCount = async () => {
      const count = await getActiveUserCount();
      if (count) setActiveUserCount(count?.thisMonthUserAccCount);
      if (count) setDiffUserAccCountRatio(count?.diffUserAccCountRatio);
    };

    //이 달 모임건수
    const fetchMeetingCountByDateRange = async () => {
      const count = await getMeetingCountByDateRange("2024", "6", "2024", "7");
      if (count) setMeetingCount(count?.thisMonthFounderCount);
      if (count) setDiffLastMontMeetingCount(count?.diffLastMonthRate);
    };

    //이 달 모임건수
    const fetchParticipateUserCountByDateRange = async () => {
      const count = await getParticipateUserCountByDateRange("2024", "6", "2024", "7");
      if (count) setParticipateUserCount(count?.thisMonthParticipateUserCount);
      if (count) setDiffLastParticipateUserCount(count?.diffLastMonthRate);
    };

    //이 달 참여크루원
    const fetchParticipateDistinctUserCountByDateRange = async () => {
      const count = await getDistinctUserForPeriodByMonth("2024", "6", "2024", "7");
      if (count) setDistinctParticipateUserCount(count?.thisMonthParticipateDistinctUserCount);
      if (count) setDiffLastDistinctParticipateUserCount(count?.diffLastMonthRate);
    };

    //이 달 모임 개설 크루원
    const fetchDistinctFounderCountByPeriod = async () => {
      const count = await getDistinctFounderCountByPeriod("2024", "6", "2024", "7");
      if (count) setDistinctFounderCount(count?.thisMonthDistinctFounderCount);
      if (count) setDiffLastDistinctFounderCount(count?.diffLastMonthRate);
    };

    //참여자수 추이(주마다의 참여자수)의 추이
    const fetchParticipationTrendData = async () => {
      const count = await getParticipationTrendData("2024", "6", "2024", "7");
      console.log("count: ", count);
      if (count) setParticipationTrendData(count);
    };

    //장소별 참여율
    const fetchParticipationRationByLocation = async () => {
      const result = await getParticipationRationByLocation("2024", "7", "2024", "7");
      if (result) setParticipationRationByLocation(result);
    };

    // const [participationRationByLocation, setParticipationRationByLocation] = useState<

    fetchParticipationRationByLocation();
    fetchParticipationTrendData();
    fetchDistinctFounderCountByPeriod();
    fetchParticipateDistinctUserCountByDateRange();
    fetchActiveUserCount();
    fetchParticipateUserCountByDateRange();
    fetchMeetingCountByDateRange();
  }, []);

  return (
    <>
      <div className="p-1">
        <div className="flex space-x-4">
          <div className="flex flex-col flex-1 space-y-4">
            <div className="px-5 py-5 border rounded-lg ">
              <AttendanceProgressComponent title="이번 달 진행율" data={monthProcessPercent} />
            </div>
            <div className="p-5 border rounded-lg ">
              <div>총 크루원</div>
              <div className="mt-3">
                <div className="flex items-center mt-3">
                  <div className="text-2xl font-semibold grow">
                    <CountUp end={activeUserCount !== null ? activeUserCount : 0} separator="," />명
                  </div>
                  <div>{renderChangeRate(diffUserAccCountRatio !== null ? diffUserAccCountRatio : 0)}</div>
                </div>
              </div>
            </div>
            <div className="p-5 border rounded-lg ">
              <div>이 달 모임 건수(정기런 제외)</div>
              <div className="mt-3">
                <div className="flex items-center mt-3">
                  <div className="text-2xl font-semibold grow">
                    <CountUp end={meetingCount !== null ? meetingCount : 0} separator="," />건
                  </div>
                  <div>{renderChangeRate(diffLastMontMeetingCount !== null ? diffLastMontMeetingCount : 0)}</div>
                </div>
              </div>
            </div>
            <div className="p-5 border rounded-lg ">
              <div>이 달 참여 건 수</div>
              <div className="mt-3">
                <div className="flex items-center mt-3">
                  <div className="text-2xl font-semibold grow">
                    <CountUp end={participateUserCount !== null ? participateUserCount : 0} separator="," />건
                  </div>
                  <div>
                    {renderChangeRate(diffLastParticipateUserCount !== null ? diffLastParticipateUserCount : 0)}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 border rounded-lg ">
              <div>이 달 참여 크루원 수</div>
              <div className="flex items-center mt-3">
                <div className="text-2xl font-semibold grow">
                  <CountUp
                    end={distinctParticipateUserCount !== null ? distinctParticipateUserCount : 0}
                    separator=","
                  />
                  명
                </div>
                <div>
                  {renderChangeRate(
                    diffLastDistinctParticipateUserCount !== null ? diffLastDistinctParticipateUserCount : 0
                  )}
                </div>
              </div>
            </div>
            <div className="p-5 border rounded-lg ">
              <div>이 달 모임개설 크루원</div>
              <div className="flex items-center mt-3">
                <div className="text-2xl font-semibold grow">
                  <CountUp end={distinctFounderCount !== null ? distinctFounderCount : 0} separator="," />명
                </div>
                <div>{renderChangeRate(diffLastDistinctFounderCount !== null ? diffLastDistinctFounderCount : 0)}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 space-y-4">
            <div className="h-full space-x-4 flex-2">
              <div className="h-full p-5 border rounded-lg">
                <div>장소별 참여율(정기런 포함)</div>
                <div className="mt-3">
                  <div className="flex items-center mt-3">
                    {/* <div className="text-2xl font-semibold grow">
                      <CountUp end={data.visitor.value} separator="," />명
                    </div>
                    <div>{renderChangeRate(data.visitor.rate)}</div> */}
                    <AttendanceProgressComponent
                      data={participationRationByLocation !== null ? participationRationByLocation : null}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full space-x-4 flex-2">
              <div className="h-full p-5 border rounded-lg ">
                <div>연령대별 출석률(5살 단위,20,25,30,35,40,45)</div>
                {/* <div className="mt-3">
                  <div className="text-2xl font-semibold grow">
                    <CountUp end={data.visitor.value} separator="," />명
                  </div>출석 랭킹
                  <div>{renderChangeRate(data.visitor.rate)}</div>
                </div> */}
                {/* { BasicBarChart, MultiBarChart, StackedBarChart } */}
                {/* {(BasicPieChart, DonutPieChart, CustomLabelPieChart)} */}
                <CustomLabelPieChart />
              </div>
            </div>
            <div className="h-full space-x-4 flex-2">
              <div className="h-full p-5 border rounded-lg ">
                <div>참여 크루원 수</div>
                <div>
                  {participationTrendData ? (
                    <LineChartComponent data={participationTrendData} />
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 space-y-4">
            <div className="flex-1 h-full space-x-4">
              <div className="h-full p-5 border rounded-lg">
                <UserCountComponent title="출석 랭킹" data={colData} />
              </div>
            </div>
            <div className="flex-1 h-full space-x-4">
              <div className="h-full p-5 border rounded-lg ">
                <UserCountComponent title="개설 랭킹" data={colData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(StatisticSample);
