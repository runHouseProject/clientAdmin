import React from "react";
import ProgressBar from "@/components/shared/progress";

// ProgressBarData 인터페이스를 여기서 직접 정의
export interface ProgressBarData {
  label: string;
  percent: number;
}
interface AttendanceProgressProps {
  title?: string; // title을 선택적(optional) 속성으로 설정합니다.
  data: Array<{ label: string; percent: number }> | null; // data를 nullable로 설정합니다.
}

const AttendanceProgressComponent: React.FC<AttendanceProgressProps> = ({ title, data }) => {
  return (
    <>
      {title && (
        <div className="mb-4 text-2xl font-semibold grow">
          <h1>{title}</h1>
        </div>
      )}
      <div className="flex-col font-semibold text-1xl grow">
        {data ? (
          data.map((item) => (
            <div key={item.label} className="progress-bar-container">
              <ProgressBar label={item.label} percent={item.percent} status="active" strokeWidth={12} />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">데이터가 없음</div>
        )}
      </div>
    </>
  );
};

export default AttendanceProgressComponent;
