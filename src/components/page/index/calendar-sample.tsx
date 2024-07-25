// import { Badge, BadgeProps, Calendar, CalendarProps, theme } from "antd";
// import { Dayjs } from "dayjs";
// import React from "react";

// const getListData = (value: Dayjs) => {
//   let listData;
//   switch (value.date()) {
//     case 8:
//       listData = [
//         { type: "warning", content: "13" },
//         { type: "success", content: "3" },
//       ];
//       break;
//     case 10:
//       listData = [
//         { type: "warning", content: "13" },
//         { type: "success", content: "3" },
//         { type: "error", content: "5" },
//       ];
//       break;
//     case 15:
//       listData = [
//         { type: "warning", content: "13" },
//         { type: "success", content: "3" },
//         { type: "error", content: "5" },
//       ];
//       break;
//     default:
//   }
//   return listData || [];
// };

// const getMonthData = (value: Dayjs) => {
//   if (value.month() === 8) {
//     return 1394;
//   }
// };

// const CalendarSample = () => {
//   const monthCellRender = (value: Dayjs) => {
//     const num = getMonthData(value);
//     return num ? (
//       <div className="notes-month">
//         <section>{num}</section>
//         <span>Backlog number</span>
//       </div>
//     ) : null;
//   };

//   const dateCellRender = (value: Dayjs) => {
//     const listData = getListData(value);
//     return (
//       <ul className="events">
//         {listData.map((item) => (
//           <li key={item.content}>
//             <Badge status={item.type as BadgeProps["status"]} text={item.content} />
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
//     if (info.type === "date") return dateCellRender(current);
//     if (info.type === "month") return monthCellRender(current);
//     return info.originNode;
//   };

//   const { token } = theme.useToken();

//   const wrapperStyle: React.CSSProperties = {
//     width: 350,
//     border: `1px solid ${token.colorBorderSecondary}`,
//     borderRadius: token.borderRadiusOuter,
//   };

//   return (
//     <div style={wrapperStyle}>
//       <Calendar cellRender={cellRender} fullscreen={false} />
//     </div>
//   );
// };

// export default React.memo(CalendarSample);
import { Badge, BadgeProps, Calendar, CalendarProps, theme } from "antd";
import { Dayjs } from "dayjs";
import React, { useState } from "react";

// UserEvent 인터페이스 정의: 날짜별 유저 이벤트 정보를 포함
interface UserEvent {
  date: string; // 이벤트 날짜 (형식: YYYY-MM-DD)
  count: number; // 참여자 수
  type: BadgeProps["status"]; // Badge의 상태 (success, warning, error 등)
}

// CalendarSampleProps 인터페이스 정의: userEvents와 onSelectDate를 포함
interface CalendarSampleProps {
  userEvents: UserEvent[]; // 날짜별 유저 이벤트 배열
  onSelectDate: (date: string) => void; // 날짜 선택 시 호출되는 함수
}

// CalendarSample 컴포넌트 정의
const CalendarSample: React.FC<CalendarSampleProps> = ({ userEvents, onSelectDate }) => {
  // 특정 날짜의 유저 이벤트를 필터링하는 함수
  const getListData = (value: Dayjs) => {
    return userEvents.filter((event) => event.date === value.format("YYYY-MM-DD"));
  };

  // 날짜 셀에 유저 이벤트를 표시하는 함수
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.date}>
            <Badge status={item.type} text={`${item.count}명`} />
          </li>
        ))}
      </ul>
    );
  };

  // 날짜 선택 시 호출되는 함수, 선택된 날짜를 상위 컴포넌트에 전달
  const onSelect = (date: Dayjs) => {
    onSelectDate(date.format("YYYY-MM-DD"));
  };

  const { token } = theme.useToken();

  // 달력 컴포넌트의 스타일 정의
  const wrapperStyle: React.CSSProperties = {
    width: 1000,
    height: 500,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusOuter,
  };

  return (
    <div style={wrapperStyle}>
      <Calendar
        cellRender={dateCellRender as CalendarProps<Dayjs>["cellRender"]}
        // fullscreen={false}
        onSelect={onSelect}
      />
    </div>
  );
};

// UserTableProps 인터페이스 정의: date를 포함
interface UserTableProps {
  date: string; // 선택된 날짜
}

// UserTable 컴포넌트 정의
const UserTable: React.FC<UserTableProps> = ({ date }) => {
  // 예시 데이터
  const users = [
    { name: "홍길동", attendance: "참석" },
    { name: "김철수", attendance: "참석" },
  ];

  return (
    <div style={{ marginTop: 20 }}>
      <h3>{date}의 참석자 목록</h3>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>참석 여부</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.name}>
              <td>{user.name}</td>
              <td>{user.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// App 컴포넌트 정의: 상태 관리 및 컴포넌트 렌더링
const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 선택된 날짜 상태

  // 예시 데이터: 특정 날짜의 유저 이벤트
  const exampleUserEvents: UserEvent[] = [
    { date: "2024-07-03", count: 10, type: "success" },
    { date: "2024-07-15", count: 29, type: "success" },
  ];

  // 날짜 선택 시 호출되는 함수, 선택된 날짜 상태를 업데이트
  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <div>
      {/* CalendarSample 컴포넌트 렌더링 */}
      <CalendarSample userEvents={exampleUserEvents} onSelectDate={handleSelectDate} />
      {/* 선택된 날짜가 있을 경우 UserTable 컴포넌트 렌더링 */}
      {selectedDate && <UserTable date={selectedDate} />}
    </div>
  );
};

export default App;
