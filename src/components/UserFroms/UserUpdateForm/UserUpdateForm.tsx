import { FC, useEffect } from "react";
import { Button, Form, Input, Space } from "antd";
import { UserUpdateFormProps } from "./UserUpdateForm.props";
import { User } from "../../../interfaces/User";

const UserUpdateForm: FC<UserUpdateFormProps> = ({
  user,
  onSave,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const onFinish = (value: User) => {
    if (!value.id && user) {
      value.id = user.id;
    }
    onSave(value);
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
        <Button onClick={() => onCancel()}>Close</Button>
      </Space>
    </Form>
  );
};

export default UserUpdateForm;
