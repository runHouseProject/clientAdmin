// components/EditMeetingModal.tsx
import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

interface EditMeetingModalProps {
  visible: boolean;
  data: any;
  onCancel: () => void;
  onSave: (values: any) => void;
  onDelete: () => void;
}

const EditMeetingModal: React.FC<EditMeetingModalProps> = ({ visible, data, onCancel, onSave, onDelete }) => {
  const [form] = Form.useForm();

  // Populate form fields with data when modal is opened
  React.useEffect(() => {
    if (visible) {
      form.setFieldsValue(data);
    }
  }, [visible, data, form]);

  return (
    <Modal
      visible={visible}
      title="Edit Meeting"
      onCancel={onCancel}
      footer={[
        <Button key="delete" type="primary" danger onClick={onDelete}>
          Delete
        </Button>,
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={onSave}>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the name!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="meeting_date"
          label="Meeting Date"
          rules={[{ required: true, message: "Please input the meeting date!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="birthYear" label="Birth Year">
          <Input />
        </Form.Item>
        <Form.Item name="founder" label="Founder">
          <Input type="checkbox" />
        </Form.Item>
        <Form.Item name="activation" label="Activation">
          <Input />
        </Form.Item>
        <Form.Item name="location" label="Location">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditMeetingModal;
