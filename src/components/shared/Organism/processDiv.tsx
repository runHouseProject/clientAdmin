import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import CountUp from "react-countup";

const renderChangeRate = (value: number) => {
  if (value > 0) {
    return (
      <span className="flex items-center justify-center px-2 py-2 text-sm text-white rounded-lg bg-emerald">
        <ArrowUp className="w-5 h-4" />
        {value}
      </span>
    );
  } else if (value < 0) {
    return (
      <span className="flex items-center justify-center px-2 py-2 text-sm text-white rounded-lg bg-alizarin">
        <ArrowDown className="w-5 h-4" />
        {value}
      </span>
    );
  } else {
    return null;
  }
};

interface ProcessDivComponentProps {
  title: string;
  subtitle: string;
  value: number;
  rate: number;
}

const ProcessDivComponent: React.FC<ProcessDivComponentProps> = ({ title, subtitle, value, rate }) => {
  return (
    <div className="mt-3">
      <div className="grid items-end grid-cols-5 gap-4">
        <div className="col-span-4 text-2xl font-semibold">
          <h1>{title}</h1>
        </div>
        <div className="col-span-1 font-semibold text-center text-1xl">
          <h1>{subtitle}</h1>
        </div>
      </div>

      <div className="grid items-end grid-cols-5 gap-4 mt-2">
        <div className="col-span-4 text-2xl font-semibold grow">
          <CountUp end={value} separator="," />명
        </div>
        <div className="col-span-1">{renderChangeRate(rate)}</div>
      </div>
    </div>
  );
};

export default ProcessDivComponent;
