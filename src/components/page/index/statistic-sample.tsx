import { IDashboardResponse } from "@/client/sample/dashboard";
import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";
import CountUp from "react-countup";
import { LineChartComponent, TinyAreaChartComponent, BasicLineChart } from "@/components/shared/chart";
import { BasicBarChart, MultiBarChart, StackedBarChart } from "@/components/shared/barChart";
import { BasicPieChart, DonutPieChart, CustomLabelPieChart } from "@/components/shared/pieChart";

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
  }
};

const StatisticSample = ({ data }: IStatisticSampleProps) => {
  return (
    <>
      <div className="p-1">
        <div className="flex space-x-4">
          <div className="flex flex-col flex-1 space-y-4">
            <div className="p-5 border rounded-lg ">
              <div>1</div>
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
              <div>2</div>
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
              <div>3</div>
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
              <div>4</div>
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
              <div>5</div>
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
              <div>6</div>
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
                <div>6</div>
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
                <div>7</div>
                {/* <div className="mt-3">
                  <div className="text-2xl font-semibold grow">
                    <CountUp end={data.visitor.value} separator="," />명
                  </div>
                  <div>{renderChangeRate(data.visitor.rate)}</div>
                </div> */}
                {/* { BasicBarChart, MultiBarChart, StackedBarChart } */}
                {/* {(BasicPieChart, DonutPieChart, CustomLabelPieChart)} */}
                <CustomLabelPieChart />
              </div>
            </div>
            <div className="h-full space-x-4 flex-2">
              <div className="h-full p-5 border rounded-lg ">
                <div>7</div>
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
                <div>10</div>
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
            <div className="flex-1 h-full space-x-4">
              <div className="h-full p-5 border rounded-lg ">
                <div>11</div>
                <div className="mt-3">
                  <div className="text-2xl font-semibold grow">
                    <CountUp end={data.visitor.value} separator="," />명
                  </div>
                  <div>{renderChangeRate(data.visitor.rate)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(StatisticSample);
