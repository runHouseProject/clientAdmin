import React from "react";
import { Progress } from "antd";
import type { ProgressProps } from "antd";

interface ProgressBarProps extends ProgressProps {
  label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, percent, ...rest }) => {
  return (
    <div className="flex progress-bar-container">
      <div className="mr-3 flex-2 label" style={{ minWidth: "5em" }}>
        {label}
      </div>{" "}
      {/* 최소 너비를 6em으로 설정 */}
      <div className="flex-1 mr-3">
        <Progress percent={percent} showInfo={false} {...rest} />
      </div>
      <div className="mb-3 ml-2 flex-2 percentage alignOptions">{percent}%</div>
    </div>
  );
};

export default ProgressBar;
