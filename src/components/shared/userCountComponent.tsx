import React from "react";
import { Divider } from "antd";
import CountUp from "react-countup";
// tableListData 인터페이스를 여기서 직접 정의
export interface TableListData {
  no: number;
  name: string;
  lastmeeting: string;
}

interface TableListComponentProps {
  title?: string;
  data: TableListData[];
}

const UserCountComponent: React.FC<TableListComponentProps> = ({ title = "출석 랭킹", data }) => {
  return (
    <>
      <div className="mb-2 text-2xl font-semibold">
        <h1>{title}</h1>
      </div>
      <div className="table w-full font-semibold text-1xl grow">
        <div>
          {data.map((item, index) => (
            <div key={item.no} className="grid grid-cols-12 gap-2 py-2 text-left row">
              <div className="col-span-2 pl-3">{index + 1}</div>
              <div className="col-span-7 pl-3">{item.name}</div>
              <div className="col-span-3 pl-3">{item.lastmeeting}</div>

              {index < data.length - 1 && <Divider className="col-span-12 my-1" />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserCountComponent;
