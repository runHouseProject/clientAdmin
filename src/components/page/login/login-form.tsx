import DefaultModal from "@/components/shared/ui/default-modal";
import { Alert, Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

interface ILoginFormValue {
  username: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [form] = useForm<ILoginFormValue>();
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleFinish = useCallback(async (value: ILoginFormValue) => {
    setIsLoading(true);

    try {
      // console.log(value);
      await signIn("login-credentials", { username: value.username, password: value.password });
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {router?.query.error && router?.query.error !== "CredentialsSignin" ? (
        <div className="mb-3">
          <Alert message={`로그인 중 오류가 발생했습니다. ${router?.query.error}`} type="warning" />
        </div>
      ) : null}
      <div className="grid grid-cols-2 gap-4">
        <a className="flex items-center justify-center h-20 grow btn" onClick={() => signIn("google")}>
          <svg width="29" height="29" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M30 16.0745c0-.9239-.0756-1.8534-.2352-2.7644H16.9335v5.2394h7.348a6.2977 6.2977 0 0 1-.9369 2.3457c-.4675.7106-1.0742 1.3191-1.7833 1.7888v3.3989h4.384C28.5201 23.7134 30 20.2147 30 16.0745Z"
              fill="#4285F4"
            ></path>
            <path
              d="M16.9306 29.3661c3.6683 0 6.7635-1.2047 9.0176-3.2848l-4.3841-3.4003c-1.2204.8312-2.7943 1.3003-4.6292 1.3003-3.55 0-6.5582-2.3952-7.6389-5.613H4.77368v3.5029c1.13278 2.2532 2.86944 4.1472 5.01613 5.4706 2.14669 1.3235 4.61899 2.0243 7.14079 2.0243Z"
              fill="#34A853"
            ></path>
            <path
              d="M9.29314 18.3684c-.56999-1.6897-.56999-3.5198 0-5.2095V9.65454H4.77367c-.95182 1.89576-1.4475 3.98776-1.4475 6.10916 0 2.1213.49568 4.2133 1.4475 6.1091l4.51947-3.5044Z"
              fill="#FBBC04"
            ></path>
            <path
              d="M16.9308 7.54168c1.9395-.03135 3.8136.70088 5.2181 2.03875l3.885-3.88361c-2.4631-2.3116-5.7253-3.5802-9.1031-3.54001-2.5227-.00052-4.9958.70057-7.14293 2.0249-2.14713 1.32433-3.88363 3.21971-5.01541 5.47428l4.51947 3.50441c1.07497-3.22497 4.08887-5.61872 7.63887-5.61872Z"
              fill="#EA4335"
            ></path>
          </svg>
        </a>
        {/* <a className="flex items-center justify-center h-20 grow btn" onClick={() => signIn("github")}>
          <svg width="28" height="28" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
              fill="#24292f"
            />
          </svg>
        </a> */}
        <a className="flex items-center justify-center h-20 bg-yellow-300 grow btn" onClick={() => signIn("kakao")}>
          {/* <svg width="28" height="28" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M24 1C10.748 1 0 10.044 0 21.333c0 6.243 3.5 11.79 8.97 15.337-.387 1.46-1.006 3.786-1.442 5.305-.23.804-.623 2.166.178 2.983.807.82 2.245.244 2.947-.165 1.682-.996 3.518-2.073 5.024-3.003 2.505.685 5.184 1.04 8.021 1.04 13.252 0 24-9.044 24-20.333S37.252 1 24 1zm-7.748 27.217c-1.52 0-2.748-1.273-2.748-2.846 0-1.574 1.228-2.846 2.748-2.846 1.517 0 2.747 1.272 2.747 2.846 0 1.573-1.23 2.846-2.747 2.846zm7.296 0c-1.521 0-2.748-1.273-2.748-2.846 0-1.574 1.227-2.846 2.748-2.846s2.747 1.272 2.747 2.846c0 1.573-1.226 2.846-2.747 2.846zm7.297 0c-1.52 0-2.747-1.273-2.747-2.846 0-1.574 1.227-2.846 2.747-2.846 1.518 0 2.748 1.272 2.748 2.846 0 1.573-1.23 2.846-2.748 2.846zm7.29 0c-1.517 0-2.746-1.273-2.746-2.846 0-1.574 1.229-2.846 2.746-2.846 1.52 0 2.749 1.272 2.749 2.846 0 1.573-1.23 2.846-2.75 2.846z"
              fill="#3b1a1a"
            />
          </svg> */}
          <svg width="25px" height="25px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#000000"
              d="M255.5 48C299.345 48 339.897 56.5332 377.156 73.5996C414.415 90.666 443.871 113.873 465.522 143.22C487.174 172.566 498 204.577 498 239.252C498 273.926 487.174 305.982 465.522 335.42C443.871 364.857 414.46 388.109 377.291 405.175C340.122 422.241 299.525 430.775 255.5 430.775C241.607 430.775 227.262 429.781 212.467 427.795C148.233 472.402 114.042 494.977 109.892 495.518C107.907 496.241 106.012 496.15 104.208 495.248C103.486 494.706 102.945 493.983 102.584 493.08C102.223 492.177 102.043 491.365 102.043 490.642V489.559C103.126 482.515 111.335 453.169 126.672 401.518C91.8486 384.181 64.1974 361.2 43.7185 332.575C23.2395 303.951 13 272.843 13 239.252C13 204.577 23.8259 172.566 45.4777 143.22C67.1295 113.873 96.5849 90.666 133.844 73.5996C171.103 56.5332 211.655 48 255.5 48Z"
            ></path>
          </svg>
        </a>
      </div>
      <div className="my-5 text-lg text-center text-gray-400">or</div>
      <Form<ILoginFormValue>
        form={form}
        layout="vertical"
        initialValues={{ username: "admin", password: "admin" }}
        onFinish={handleFinish}
      >
        <div className="mb-3">
          {router?.query.error === "CredentialsSignin" ? (
            <>
              <Alert message="로그인을 실패했습니다. 아이디 또는 비밀번호를 다시 확인해주세요." type="error" />
            </>
          ) : (
            <></>
          )}
        </div>
        <Form.Item name="username" rules={[{ required: true, message: "아이디를 입력해주세요" }]}>
          <Input size="large" placeholder="아이디" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}>
          <Input placeholder="비밀번호" type="password" size="large" />
        </Form.Item>

        <Button size="large" type="primary" htmlType="submit" className="w-full" loading={isLoading}>
          로그인
        </Button>

        <a className="inline-block mt-2 text-gray-400" onClick={() => setShowPasswordModal(true)}>
          비밀번호 찾기
        </a>
      </Form>

      <DefaultModal title="비밀번호 찾기" open={showPasswordModal} handleHide={() => setShowPasswordModal(false)}>
        🔑 임시 로그인 정보는 admin / admin 입니다.
      </DefaultModal>
    </>
  );
};

export default React.memo(LoginForm);
