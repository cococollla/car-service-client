import { FC, useEffect } from "react";
import { Button, Form, Input, Select, SelectProps, Space } from "antd";
import { useSelector } from "react-redux";
import { selectCars } from "../../../store/СarSlice";
import { CarCreateDto } from "../../../interfaces/Car";
import { CarCreateFormProps } from "./CarCreateForm.props";

const CarCreateForm: FC<CarCreateFormProps> = ({ onSave, onCancel }) => {
  const [form] = Form.useForm();
  const { brands, colors } = useSelector(selectCars);

  useEffect(() => () => {
    form.resetFields();
  });

  const onFinish = (value: CarCreateDto) => {
    onSave(value);
    form.resetFields();
  };

  const selectForBrands: SelectProps["options"] = brands.map((brand) => {
    return {
      value: brand.id,
      label: brand.name,
    };
  });

  const selectForColors: SelectProps["options"] = colors.map((color) => {
    return {
      value: color.id,
      label: color.name,
    };
  });

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        label="Brand Name"
        name="brandId"
        rules={[{ required: true, message: "Please select a brand" }]}
      >
        <Select placeholder="Select a color" options={selectForBrands}></Select>
      </Form.Item>
      <Form.Item
        label="Color"
        name="colorId"
        rules={[{ required: true, message: "Please select a color" }]}
      >
        <Select placeholder="Select a color" options={selectForColors}></Select>
      </Form.Item>
      <Form.Item
        label="Short Description"
        name="shortDescription"
        rules={[
          { required: true, message: "Please enter a short description" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Year of release"
        name="yearRelese"
        rules={[
          { required: true, message: "Please enter the year of release" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please enter the price" }]}
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

export default CarCreateForm;
