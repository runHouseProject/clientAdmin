// components/shared/molecules/MeetingForm.tsx
import React, { useEffect } from "react";
import { Switch, Button, Form, Input, InputNumber, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

interface Option {
  value: string;
  label: string;
}

interface FormField {
  name: string;
  label: string;
  type: "input" | "inputNumber" | "select" | "datePicker" | "checkbox" | "switch";
  options?: Option[];
  disabled?: boolean;
}

interface MeetingFormProps {
  meeting: any;
  fields: FormField[];
  onFormFinish: (values: any) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
  layout?: {
    labelCol?: { span: number };
    wrapperCol?: { span: number };
  };
}

const MeetingForm: React.FC<MeetingFormProps> = ({ meeting, fields, onFormFinish, onDelete, onClose, layout }) => {
  // console.log("meeting1111166666: ", meeting);
  const [form] = Form.useForm();

  useEffect(() => {
    const initialValues: any = {};
    fields.forEach((field) => {
      initialValues[field.name] =
        field.type === "datePicker" ? dayjs(meeting[field.name]).tz("Asia/Seoul") : meeting[field.name];
    });
    form.setFieldsValue(initialValues);
  }, [meeting, fields, form]);

  const defaultLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const handleFinish = (values: any) => {
    const adjustedValues = { ...values, id: meeting.key };
    adjustedValues.meeting_date = adjustedValues.meeting_date.tz("Asia/Seoul").format("YYYY-MM-DD");
    onFormFinish(adjustedValues);
  };

  const handleDelete = () => {
    onDelete(meeting.key);
  };

  return (
    <Form
      {...(layout || defaultLayout)}
      form={form}
      name="meetingForm"
      onFinish={handleFinish}
      style={{ maxWidth: 300 }}
      validateMessages={{
        required: "${label} is required!",
        types: {
          email: "${label} is not a valid email!",
          number: "${label} is not a valid number!",
        },
        number: {
          range: "${label} must be between ${min} and ${max}",
        },
      }}
      // layout="vertical"
    >
      {fields.map((field) => (
        <Form.Item
          key={field.name}
          name={field.name}
          label={<div className="font-semibold text-1xl grow">{field.label}</div>} // Tailwind CSS 적용
        >
          {field.type === "input" && <Input disabled={field.disabled} />}
          {field.type === "inputNumber" && <InputNumber disabled={field.disabled} />}
          {field.type === "select" && (
            <Select>
              {field.options?.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          )}
          {field.type === "datePicker" && <DatePicker format="YYYY-MM-DD" className="w-full" />}
          {field.type === "checkbox" && (
            <div className="flex items-center">
              <input type="checkbox" className="h-6 mr-2 w-30" />
            </div>
          )}
          {field.type === "switch" && <Switch />}
        </Form.Item>
      ))}
      <Form.Item wrapperCol={{ ...defaultLayout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          수정
        </Button>
        <Button type="primary" onClick={handleDelete} style={{ marginLeft: "10px" }}>
          삭제
        </Button>
        <Button type="default" onClick={onClose} style={{ marginLeft: "10px" }}>
          닫기
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MeetingForm;
