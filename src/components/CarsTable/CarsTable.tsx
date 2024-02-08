import { useEffect, useRef, useState } from "react";
import { CarDto, Car } from "../../interfaces/Car";
import { Button, Form, FormInstance, Modal, Space, Table } from "antd";
import ApiCarService from "../../services/ApiCarService";
import CarForm from "../CarUpdateForm/CarUpdateForm";
import { useDispatch } from "react-redux";
import { setColors, setBrands } from "../../store/СarSlice";

const CarsTable = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const formRef = useRef<FormInstance<any>>(Form.useForm()[0]);

  const dispatch = useDispatch();

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
          <Button type="link" onClick={() => handleUpdate(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  const handleUpdate = (car: Car) => {
    setSelectedCar(car);
    setIsModalVisible(true);
  };

  const handleSave = async (updatedCar: CarDto) => {
    try {
      setLoading(true);
      await ApiCarService.updateCar(updatedCar, () => {
        Modal.success({
          content: "Car updated successfully",
        });
        setIsModalVisible(false);
      });
    } catch (error) {
      Modal.error({
        content: `Failed to update car: ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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

  useEffect(() => {
    fetchCars();
  }, []);

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
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => formRef.current!.submit()}
        confirmLoading={loading}
        centered
      >
        <CarForm
          car={selectedCar}
          onSave={handleSave}
          onCancel={handleCancel}
          formRef={formRef}
        />
      </Modal>
    </div>
  );
};

export default CarsTable;
