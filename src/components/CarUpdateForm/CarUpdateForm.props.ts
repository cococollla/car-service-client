import { MutableRefObject } from "react";
import Car from "../../interfaces/Car";
import { FormInstance } from "antd";

interface CarFormProps {
  car?: Car | null;
  onSave: (updatedCar: Car) => void;
  onCancel: () => void;
  formRef: MutableRefObject<FormInstance<any>>;
}

export default CarFormProps;
