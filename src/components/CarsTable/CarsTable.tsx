import { useEffect, useState } from "react";
import Car from "../../interfaces/Car";
import { Button, Modal, Table } from "antd";
import ApiCarService from "../../services/ApiCarService";

const CarsTable = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);

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
        <Button type="link" onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

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
      });
    } catch (error) {
      Modal.error({
        content: `Failed to delete car: ${error}`,
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
    </div>
  );
};

export default CarsTable;
