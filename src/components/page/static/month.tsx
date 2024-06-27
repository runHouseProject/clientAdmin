import AttendanceProgressComponent, { ProgressBarData } from "@/components/shared/Organism/AttendanceProgress";
import ProcessDivComponent from "@/components/shared/Organism/processDiv";
import UserCountComponent, { TableListData } from "@/components/shared/userCountComponent";
import CountUp from "react-countup";
import type { DatePickerProps } from "antd";

import React, { useState } from "react";
import type { ConfigProviderProps, RadioChangeEvent } from "antd";
import { DatePicker, Radio, Space } from "antd";
import { ConfigProvider } from "antd";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import locale from "antd/locale/ko_KR";

interface IStatisticSampleProps {
  data: {
    visitor: {
      value: number;
      rate: number;
    };
  };
}

const AttendanceData: ProgressBarData[] = [
  { label: "종합운동장", percent: 90 },
  { label: "강남", percent: 50 },
  { label: "홍대", percent: 20 },
  { label: "홍대", percent: 10 },
  { label: "홍대", percent: 20 },
];

interface Participant {
  key: string;
  rank: number;
  name: string;
  birthYear: number;
  attendanceCount: number;
}

const columnsList = [
  {
    title: "순위",
    dataIndex: "rank" as keyof Participant,
  },
  {
    title: "이름(년생)",
    dataIndex: "name" as keyof Participant,
    render: (text: string, record: Participant) => `${text} (${record.birthYear})`,
  },
  {
    title: "횟수(참여)",
    dataIndex: "attendanceCount" as keyof Participant,
  },
];

const dataList: Participant[] = [
  {
    key: "1",
    rank: 1,
    name: "서우혁",
    birthYear: 1990,
    attendanceCount: 10,
  },
  {
    key: "2",
    rank: 2,
    name: "전현진",
    birthYear: 1992,
    attendanceCount: 8,
  },
  {
    key: "3",
    rank: 3,
    name: "김건우",
    birthYear: 1988,
    attendanceCount: 7,
  },
  {
    key: "4",
    rank: 5,
    name: "김선관",
    birthYear: 1988,
    attendanceCount: 7,
  },
  {
    key: "5",
    rank: 5,
    name: "송영규",
    birthYear: 1988,
    attendanceCount: 7,
  },
];

const colData: TableListData[] = [
  { no: 1, name: "김건우 (99)", count: 90 },
  { no: 2, name: "송영규 (99)", count: 80 },
  { no: 3, name: "김선관 (81)", count: 70 },
  { no: 4, name: "서우혁 (82)", count: 50 },
  { no: 5, name: "전현진 (00)", count: 30 },
];
type SizeType = ConfigProviderProps["componentSize"];

const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

const StatisticMonth = ({ data }: IStatisticSampleProps) => {
  const [size, setSize] = useState<SizeType>("middle");

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };
  return (
    <>
      {/* <Radio.Group value={size} onChange={handleSizeChange}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="middle">middle</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group> */}
      {/* <DatePicker size={size} />
      <DatePicker size={size} picker="month" /> */}
      {/* <DatePicker size={"middle"} picker="month" /> */}

      <div className="px-1 py-3">
        {/* <ConfigProvider locale={locale}>
          <DatePicker className="custom-date-picker" onChange={onChange} size="middle" picker="month" />
        </ConfigProvider> */}

        <ConfigProvider
          locale={locale}
          // theme={{
          //   components: {
          //     DatePicker: {
          //       addonBg: "#1DA57A", // 테두리 색상 설정
          //       borderRadius: 2, // 테두리 둥글기 설정
          //       activeBorderColor: "#1677ff",
          //     },
          //   },
          // }}
        >
          <DatePicker
            style={{
              border: "2px solid #40CC70", // 테두리 두께 및 색상 설정
              borderRadius: "4px", // 테두리 둥글기 설정
            }}
            className="custom-date-picker"
            onChange={onChange}
            size="middle"
            picker="month"
          />
        </ConfigProvider>
      </div>

      <div className="p-1">
        <div className="flex space-x-4">
          <div className="flex flex-col flex-1 space-y-4">
            <div className="h-full space-x-4 flex-2">
              <div className="h-full p-5 border rounded-lg">
                <ProcessDivComponent
                  title={"전체참석율"}
                  subtitle="전월대비"
                  value={data.visitor.value}
                  rate={data.visitor.rate}
                />
              </div>
            </div>
            <div className="h-full space-x-4 flex-2">
              <div className="h-full p-5 border rounded-lg">
                <ProcessDivComponent
                  title={"신규 참여율"}
                  subtitle="전월대비"
                  value={data.visitor.value}
                  rate={data.visitor.rate}
                />
              </div>
            </div>
            <div className="h-full space-x-4 flex-2">
              <div className="h-full p-5 border rounded-lg">
                <ProcessDivComponent
                  title={"재 참여율"}
                  subtitle="전월대비"
                  value={data.visitor.value}
                  rate={data.visitor.rate}
                />
              </div>
            </div>
            <div className="h-full space-x-4 flex-6">
              <div className="h-full p-5 border rounded-lg">
                <AttendanceProgressComponent title="장소별 출석률" data={AttendanceData} />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 space-y-4">
            <div className="h-full p-5 border rounded-lg">
              <UserCountComponent title="출석 랭킹" data={colData} />
            </div>
            <div className="h-full space-x-4 flex-2">
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

export default StatisticMonth;
