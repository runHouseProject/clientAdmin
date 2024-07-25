import { useDashboard } from "@/client/sample/dashboard";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CalendarSample from "@/components/page/index/calendar-sample";
import StatisticSample from "@/components/page/index/statistic-sample";
import { useAuth } from "@/lib/auth/auth-provider";
import ProductListPage from "@/pages/sample/product/list";
import { Alert, Divider, Skeleton } from "antd";

const pageHeader: IPageHeader = {
  title: "Welcome",
};

// 메인 페이지

const IndexPage: IDefaultLayoutPage = () => {
  const { session } = useAuth();
  const { data, error } = useDashboard();

  return (
    <>
      {/* <h2 className="title">👋 {session.user.name || "관리자"}님 안녕하세요!</h2> */}
      {/* <div>
        {data ? (
          <StatisticSample data={data} />
        ) : error ? (
          <Alert message="대시보드 API 호출 중 오류가 발생했습니다." type="warning" />
        ) : (
          <Skeleton />
        )}
      </div> */}
      {/* ProductListPage */}
      {/* <ProductListPage /> */}
      <h3 className="title">달력</h3>
      <CalendarSample />
      {/* <Divider />v */}
    </>
  );
};

IndexPage.getLayout = getDefaultLayout;
// IndexPage.pageHeader = pageHeader;

export default IndexPage;

// ProductListPage;
