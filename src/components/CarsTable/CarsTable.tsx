import { FC, useEffect, useRef, useState } from "react";
import { CarUpdateDto, Car, CarCreateDto } from "../../interfaces/Car";
import { Button, Form, FormInstance, Modal, Space, Table } from "antd";
import ApiCarService from "../../services/ApiCarService";
import CarForm from "../CarForms/CarUpdateForm/CarUpdateForm";
import { useDispatch } from "react-redux";
import { setColors, setBrands } from "../../store/СarSlice";
import { CarsTableProps } from "./CarsTableProps";
import CarCreateForm from "../CarForms/CarCreateForm/CarCreateForm";

const CarsTable: FC<CarsTableProps> = ({
  isCreateModalVisible,
  onCreateModalClose,
}) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const formRef = useRef<FormInstance<any>>(Form.useForm()[0]);

  const dispatch = useDispatch();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Brand",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Color",
      dataIndex: "colorName",
      key: "colorName",
    },
    {
      title: "Short Description",
      dataIndex: "shortDescription",
      key: "shortDescription",
    },
    {
      title: "Year of release",
      dataIndex: "yearRelese",
      key: "yearRelese",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (record: Car) => (
        <Space>
          <Button type="link" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
          <Button type="link" onClick={() => handleEdit(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [colorsResponse, brandsResponse] = await Promise.all([
          ApiCarService.getColors(),
          ApiCarService.getBrands(),
        ]);

        dispatch(setColors({ colors: colorsResponse }));
        dispatch(setBrands({ brands: brandsResponse }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    fetchCars();
  }, []);

  const confirmCreate = async (car: CarCreateDto) => {
    try {
      setLoading(true);
      await ApiCarService.addCar(car);

      await fetchCars();
      Modal.success({
        content: "Car create successfully",
        centered: true,
      });
    } catch (error) {
      Modal.error({
        content: `Failed to create car: ${error}`,
        centered: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (car: Car) => {
    setSelectedCar(car);
    setIsEditModalVisible(true);
  };

  const confirmEdit = async (updatedCar: CarUpdateDto) => {
    try {
      setLoading(true);
      await ApiCarService.updateCar(updatedCar);

      await fetchCars();
      Modal.success({
        content: "Car updated successfully",
        centered: true,
      });
      setIsEditModalVisible(false);
    } catch (error) {
      Modal.error({
        content: `Failed to update car: ${error}`,
        centered: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
  };

  const handleDelete = (carId: number) => {
    setSelectedCarId(carId);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await ApiCarService.deleteCarById(selectedCarId);

      await fetchCars();
      Modal.success({
        content: "Car deleted successfully",
        centered: true,
      });
    } catch (error) {
      Modal.error({
        content: `Failed to delete car: ${error}`,
        centered: true,
      });
    } finally {
      setLoading(false);
      setSelectedCarId(null);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await ApiCarService.getAllCars();
      setCars(response);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <div>
      <Table
        dataSource={cars}
        columns={columns}
        loading={loading}
        rowKey={(record) => record.id.toString()}
        style={{ fontFamily: "Roboto", fontSize: 20 }}
      />
      <Modal
        title="Confirm Delete"
        open={!!selectedCarId}
        onOk={confirmDelete}
        onCancel={() => setSelectedCarId(null)}
        confirmLoading={loading}
        centered
      >
        <p>Are you sure you want to delete this car?</p>
      </Modal>

      <Modal
        title="Update Car"
        open={isEditModalVisible}
        onCancel={handleEditModalClose}
        onOk={() => formRef.current!.submit()}
        confirmLoading={loading}
        centered
      >
        <CarForm car={selectedCar} onSave={confirmEdit} formRef={formRef} />
      </Modal>
      <Modal
        title="Add Car"
        open={isCreateModalVisible}
        onCancel={() => onCreateModalClose()}
        confirmLoading={loading}
        footer={false}
        centered
      >
        <CarCreateForm
          onSave={confirmCreate}
          onCancel={() => onCreateModalClose()}
        />
      </Modal>
    </div>
  );
};

export default CarsTable;
