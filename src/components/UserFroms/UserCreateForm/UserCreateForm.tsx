import { FC } from "react";
import { Button, Form, Input, Space } from "antd";
import { UserCreateFormProps } from "./UserCreateForm.props";
import { userData } from "../../../interfaces/User";

const UserCreateForm: FC<UserCreateFormProps> = ({ onSave, onCancel }) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const onFinish = (value: userData) => {
    onSave(value);
    form.resetFields();
  };

  const validateNoSpaces = (rule: any, value: string, callback: Function) => {
    if (/\s/.test(value)) {
      callback("Spaces are not allowed");
    } else {
      callback();
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: "Please enter the name" },
          { validator: validateNoSpaces },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter the email" },
          { validator: validateNoSpaces },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Role" name="roleName" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please enter the password" },
          { min: 6, message: "The minimum number of characters is 6" },
          { validator: validateNoSpaces },
        ]}
      >
        <Input />
      </Form.Item>
      <Space>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button onClick={() => handleCancel()}>Close</Button>
      </Space>
    </Form>
  );
};

export default UserCreateForm;
