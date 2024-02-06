import Car from "../../interfaces/Car";

interface CarFormProps {
  car?: Car | null;
  onSave: (updatedCar: Car) => void;
  onCancel: () => void;
}

export default CarFormProps;
