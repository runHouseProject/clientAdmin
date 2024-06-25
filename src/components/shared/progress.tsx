import React from "react";
import { Progress } from "antd";
import type { ProgressProps } from "antd";

interface ProgressBarProps extends ProgressProps {
  label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, percent, ...rest }) => {
  return (
    <div className="progress-bar-container">
      <span className="label">{label}</span>
      <Progress percent={percent} showInfo={false} {...rest} />
      <span className="percentage">{percent}%</span>
    </div>
  );
};

export default ProgressBar;
