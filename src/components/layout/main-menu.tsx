import { Divider } from "antd";
import { Home, Monitor, Package2 } from "lucide-react";
import React from "react";
import Menu, { IMenu } from "./nav";

const mainMenuData: IMenu[] = [
  {
    id: "home",
    name: "홈",
    icon: <Home className="w-5 h-5" />,
    link: {
      path: "/",
    },
  },
  {
    id: "meeting",
    name: "모임",
    icon: <Package2 className="w-5 h-5" />,
    submenu: [
      {
        id: "productList",
        name: "모임",
        link: {
          path: "/meeting/list",
        },
      },
      {
        id: "productStatic",
        name: "달력",
        link: {
          path: "/meeting/calendar",
        },
      },
    ],
  },
  {
    id: "user",
    name: "크루원",
    icon: <Package2 className="w-5 h-5" />,
    submenu: [
      {
        id: "userList",
        name: "크루원",
        link: {
          path: "/user/list",
        },
      },
    ],
  },
];

const devMenuData: IMenu[] = [
  {
    id: "dev",
    name: "데이터 통계",
    icon: <Monitor className="w-5 h-5" />,
    submenu: [
      {
        name: "월간",
        link: {
          path: "/static/month",
        },
      },
      {
        name: "모임",
        link: {
          path: "/static/meeting",
        },
      },
    ],
  },
];

const MainMenu = () => {
  return (
    <>
      <>
        <Divider orientation="left" plain>
          관리
        </Divider>

        <Menu data={mainMenuData} />
      </>
      <>
        <Divider orientation="left" plain>
          분석
        </Divider>

        <Menu data={devMenuData} />
      </>
    </>
  );
};

export default React.memo(MainMenu);
