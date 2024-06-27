import React from "react";
import ProgressBar from "@/components/shared/progress";

// ProgressBarData 인터페이스를 여기서 직접 정의
export interface ProgressBarData {
  label: string;
  percent: number;
}

interface AttendanceProgressProps {
  title?: string;
  data: ProgressBarData[];
}

const AttendanceProgressComponent: React.FC<AttendanceProgressProps> = ({ title = "장소별 출석률", data }) => {
  return (
    <>
      <div className="mb-4 text-2xl font-semibold grow">
        <h1>{title}</h1>
      </div>

      <div className="flex-col font-semibold text-1xl grow">
        {data.map((item) => (
          <div key={item.label} className="progress-bar-container">
            <ProgressBar label={item.label} percent={item.percent} status="active" strokeWidth={12} />
          </div>
        ))}
      </div>
    </>
  );
};

export default AttendanceProgressComponent;
