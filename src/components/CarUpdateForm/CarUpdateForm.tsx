import { FC, useEffect } from "react";
import CarFormProps from "./CarUpdateForm.props";
import { CarDto, Color } from "../../interfaces/Car";
import { Form, Input, Select } from "antd";
import { useSelector } from "react-redux";
import { selectCars } from "../../store/СarSlice";

const CarForm: FC<CarFormProps> = ({ car, onSave, onCancel, formRef }) => {
  const [form] = Form.useForm();
  const { brands, colors } = useSelector(selectCars);
  const { Option } = Select;

  useEffect(() => {
    if (car) {
      form.setFieldsValue(car);
    }
  }, [car, form]);

  const onFinish = (values: CarDto) => {
    if (!values.id && car) {
      values.id = car.id;
    }
    onSave(values);
  };

  useEffect(() => {
    if (formRef) {
      formRef.current = form;
    }
  }, [form, formRef]);

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        label="Brand Name"
        name="brandName"
        rules={[{ required: true, message: "Please select a brand" }]}
      >
        <Select options={brands}></Select>
      </Form.Item>
      <Form.Item
        label="Color"
        name="colorName"
        rules={[{ required: true, message: "Please select a color" }]}
      >
        <Select options={colors} labelInValue placeholder="Select a color">
          {colors.map((color) => (
            <Option key={color.id} value={color}>
              {color.name}
            </Option>
          ))}
        </Select>
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
        name="yearRelease"
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
    </Form>
  );
};

export default CarForm;
