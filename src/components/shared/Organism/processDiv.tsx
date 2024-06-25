import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import CountUp from "react-countup";

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
    return null;
  }
};

interface ProcessDivComponentProps {
  value: number;
  rate: number;
}

const ProcessDivComponent: React.FC<ProcessDivComponentProps> = ({ value, rate }) => {
  return (
    <div className="flex items-center mt-3">
      <div className="text-2xl font-semibold grow">
        <CountUp end={value} separator="," />명
      </div>
      <div>{renderChangeRate(rate)}</div>
    </div>
  );
};

export default ProcessDivComponent;
