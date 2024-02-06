import { FC, useEffect } from "react";
import CarFormProps from "./CarUpdateForm.props";
import Car from "../../interfaces/Car";
import { Button, Form, Input } from "antd";

const CarForm: FC<CarFormProps> = ({ car, onSave, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (car) {
      form.setFieldsValue(car);
    }
  }, [car, form]);

  const onFinish = (values: Car) => {
    onSave(values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        label="Brand Name"
        name="brandName"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Color" name="colorName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Short Description"
        name="shortDescription"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Year of release"
        name="yearRelese"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Price" name="price" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default CarForm;
