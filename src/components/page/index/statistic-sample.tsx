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
import { getMeetingCountByDateRange } from "@/pages/api/meeting";

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

const StatisticSample = ({ data }: IStatisticSampleProps) => {
  console.log("data: ", data);
  const result = getCurrentMonthInfoWithPercent();

  const AttendanceData: ProgressBarData[] = [result];

  const [activeUserCount, setActiveUserCount] = useState<number | null>(null);
  const [meetingCount, setMeetingCount] = useState<number | null>(null);
  const [diffLastMontMeetingCount, setDiffLastMontMeetingCount] = useState<number | null>(null);
  console.log("activeUserCount: ", activeUserCount);

  useEffect(() => {
    // getMeetingCountByDateRange

    const fetchMeetingCountByDateRange = async () => {
      const count = await getMeetingCountByDateRange("2024", "6", "2024", "7");
      console.log("count1123123: ", count);
      const meetingCount = count?.thisMonthFounderCount ?? 0;
      const diffLastMontMeetingCount = count?.diffLastMonthRate ?? 0;
      setMeetingCount(meetingCount);
      setDiffLastMontMeetingCount(diffLastMontMeetingCount);
    };

    const fetchActiveUserCount = async () => {
      const count = await getActiveUserCount();
      setActiveUserCount(count);
    };

    fetchActiveUserCount();
    fetchMeetingCountByDateRange();
  }, []);

  return (
    <>
      <div className="p-1">
        <div className="flex space-x-4">
          <div className="flex flex-col flex-1 space-y-4">
            <div className="px-5 py-5 border rounded-lg ">
              <AttendanceProgressComponent title="이번 달 진행율" data={AttendanceData} />
            </div>
            <div className="p-5 border rounded-lg ">
              <div>총크루원</div>
              <div className="mt-3">
                <div className="flex items-center mt-3">
                  <div className="text-2xl font-semibold grow">
                    <CountUp end={activeUserCount !== null ? activeUserCount : 0} separator="," />명
                  </div>
                  <div>{renderChangeRate(data.visitor.rate)}</div>
                </div>
              </div>
            </div>
            <div className="p-5 border rounded-lg ">
              <div>이 달 모임건수</div>
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
              <div>이 달 참여자수(이달 참여자수/전달 모임건수)</div>
              <div className="mt-3">
                <div className="flex items-center mt-3">
                  <div className="text-2xl font-semibold grow">
                    <CountUp end={data.visitor.value} separator="," />명
                  </div>
                  <div>{renderChangeRate(data.visitor.rate)}</div>
                </div>
              </div>
            </div>
            <div className="p-5 border rounded-lg ">
              <div>이 달 참여 활성도(이번달 참여자수(단한번)/전체크루원수)</div>
              <div className="mt-3">
                <div className="flex items-center mt-3">
                  <div className="text-2xl font-semibold grow">
                    <CountUp end={data.visitor.value} separator="," />명
                  </div>
                  <div>{renderChangeRate(data.visitor.rate)}</div>
                </div>
              </div>
            </div>
            <div className="p-5 border rounded-lg ">
              <div>이 달 모임개설 활성도(이번달 개설건수(사용자별 한번)/전체크루원수)</div>
              <div className="mt-3">
                <div className="flex items-center mt-3">
                  <div className="text-2xl font-semibold grow">
                    <CountUp end={data.visitor.value} separator="," />명
                  </div>
                  <div>{renderChangeRate(data.visitor.rate)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 space-y-4">
            <div className="h-full space-x-4 flex-2">
              <div className="h-full p-5 border rounded-lg">
                <div>장소별 참여율(장소별 참여건수/전체 참여건수)</div>
                <div className="mt-3">
                  <div className="flex items-center mt-3">
                    <div className="text-2xl font-semibold grow">
                      <CountUp end={data.visitor.value} separator="," />명
                    </div>
                    <div>{renderChangeRate(data.visitor.rate)}</div>
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
                <div>참여자수 추이(주마다의 참여자수)의 추이 </div>
                {/* <div className="mt-3">
                  <div className="text-2xl font-semibold grow">
                    <CountUp end={data.visitor.value} separator="," />명
                  </div>
                  <div>{renderChangeRate(data.visitor.rate)}</div>
                </div> */}
                <div>
                  {/* LineChartComponent, TinyAreaChartComponent, BasicLineChart */}
                  <LineChartComponent />
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
