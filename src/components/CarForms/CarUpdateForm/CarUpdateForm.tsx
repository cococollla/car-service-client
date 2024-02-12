import { FC, useEffect } from "react";
import CarFormProps from "./CarUpdateForm.props";
import { CarUpdateDto } from "../../../interfaces/Car";
import { Form, Input, Select, SelectProps } from "antd";
import { useSelector } from "react-redux";
import { selectCars } from "../../../store/СarSlice";

const CarForm: FC<CarFormProps> = ({ car, onSave, formRef }) => {
  const [form] = Form.useForm();
  const { brands, colors } = useSelector(selectCars);

  useEffect(() => {
    if (car) {
      const initialBrandId = brands.find(
        (brand) => brand.name === car.brandName
      )?.id;
      const initialColorId = colors.find(
        (color) => color.name === car.colorName
      )?.id;

      form.setFieldsValue({
        ...car,
        brandId: initialBrandId,
        colorId: initialColorId,
      });
    }
  }, [car, brands, colors, form]);

  const onFinish = (values: CarUpdateDto) => {
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
    </Form>
  );
};

export default CarForm;
