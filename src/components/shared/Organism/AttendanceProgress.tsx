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

const AttendanceProgress: React.FC<AttendanceProgressProps> = ({ title = "장소별 출석률", data }) => {
  return (
    <div className="progress-bars" style={{ backgroundColor: "#3b82f6", padding: "20px", borderRadius: "8px" }}>
      <h1 style={{ color: "white", marginBottom: "20px" }}>{title}</h1>
      {data.map((item) => (
        <ProgressBar key={item.label} label={item.label} percent={item.percent} status="active" strokeWidth={12} />
      ))}
    </div>
  );
};

export default AttendanceProgress;
