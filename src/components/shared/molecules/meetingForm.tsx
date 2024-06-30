import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, Select, DatePicker } from "antd";
import dayjs from "dayjs";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values: any) => {
  console.log(values);
};

const MeetingForm: React.FC<{ meeting: any }> = ({ meeting }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      participantName: meeting.participantName,
      birthYear: meeting.birthYear,
      meeting_date: dayjs(meeting.meeting_date),
      founder: meeting.founder,
      activation: meeting.activation,
      location: meeting.location,
    });
  }, [meeting, form]);

  return (
    <Form
      {...layout}
      form={form}
      name="meetingForm"
      onFinish={onFinish}
      style={{ maxWidth: 380 }}
      validateMessages={validateMessages}
      layout="vertical"
    >
      {/* <Form form={form} name="validateOnly" layout="vertical" autoComplete="off"></Form> */}
      <Form.Item name="participantName" label="이름">
        <Input disabled />
      </Form.Item>
      <Form.Item name="birthYear" label="년생">
        <InputNumber disabled />
      </Form.Item>
      <Form.Item name="meeting_date" label="참여일">
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item name="founder" label="개설자 여부" valuePropName="checked">
        <Input type="checkbox" />
      </Form.Item>
      <Form.Item name="activation" label="활동">
        <Select>
          <Select.Option value="러닝">러닝</Select.Option>
          <Select.Option value="회의">회의</Select.Option>
          <Select.Option value="토론">토론</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="location" label="장소">
        <Select>
          <Select.Option value="태평">태평</Select.Option>
          <Select.Option value="강남">강남</Select.Option>
          <Select.Option value="홍대">홍대</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="default" htmlType="submit">
          수정
        </Button>
        <Button type="default" style={{ marginLeft: "10px" }}>
          삭제
        </Button>
        <Button type="default" style={{ marginLeft: "10px" }}>
          닫기
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MeetingForm;
