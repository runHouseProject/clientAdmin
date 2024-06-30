import { Badge, BadgeProps, Calendar, CalendarProps, theme } from "antd";
import { Dayjs } from "dayjs";
import React from "react";

const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "13" },
        { type: "success", content: "3" },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "13" },
        { type: "success", content: "3" },
        { type: "error", content: "5" },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "13" },
        { type: "success", content: "3" },
        { type: "error", content: "5" },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CalendarSample = () => {
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps["status"]} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    width: 350,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusOuter,
  };

  return (
    <div style={wrapperStyle}>
      <Calendar cellRender={cellRender} fullscreen={false} />
    </div>
  );
};

export default React.memo(CalendarSample);

// import React from "react";
// import { Calendar } from "antd";
// import type { Moment } from "moment";
// import "antd/dist/antd.css"; // Ant Design CSS 파일

// // 샘플 데이터
// const data: Record<string, number> = {
//   "2024-11-13": 3,
//   "2024-11-25": 11,
// };

// // 날짜 셀 렌더링 함수
// const dateCellRender = (value: Moment) => {
//   const dateStr = value.format("YYYY-MM-DD");
//   const count = data[dateStr];

//   return <div>{count ? <div className="event">참여 {count}회</div> : null}</div>;
// };

// const App: React.FC = () => {
//   return <Calendar dateCellRender={dateCellRender} />;
// };

// export default App;

// import React from "react";
// import { Calendar } from "antd";
// import dayjs, { Dayjs } from "dayjs";
// import "antd/dist/reset.css"; // Ant Design CSS 파일

// // 샘플 데이터
// const data: Record<string, number> = {
//   "2024-06-13": 3,
//   "2024-06-25": 11,
// };

// // 날짜 셀 렌더링 함수
// const dateCellRender = (value: Dayjs) => {
//   const dateStr = value.format("YYYY-MM-DD");
//   const count = data[dateStr];

//   return <div>{count ? <div className="event">참여 {count}회</div> : null}</div>;
// };

// const App: React.FC = () => {
//   return <Calendar dateCellRender={dateCellRender} fullscreen={false} />;
// };

// export default App;

// import React from "react";
// import { Calendar, theme } from "antd";
// import type { CalendarProps } from "antd";
// import type { Dayjs } from "dayjs";

// const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
//   console.log(value.format("YYYY-MM-DD"), mode);
// };

// const App: React.FC = () => {
//   const { token } = theme.useToken();

//   const wrapperStyle: React.CSSProperties = {
//     width: 500,
//     border: `1px solid ${token.colorBorderSecondary}`,
//     borderRadius: token.borderRadiusOuter,
//   };

//   const data: Record<string, number> = {
//     "2024-06-13": 3,
//     "2024-06-25": 11,
//   };

//   // 날짜 셀 렌더링 함수
//   const dateCellRender = (value: Dayjs) => {
//     const dateStr = value.format("YYYY-MM-DD");
//     const count = data[dateStr];

//     return <div>{count ? <div className="event">참여 {count}회</div> : null}</div>;
//   };

//   return (
//     <div style={wrapperStyle}>
//       <Calendar dateCellRender={dateCellRender} fullscreen={false} onPanelChange={onPanelChange} />
//     </div>
//   );
// };

// export default App;
