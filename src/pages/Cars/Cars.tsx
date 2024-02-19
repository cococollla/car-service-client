import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCars, selectCars } from "../../store/СarSlice";
import styles from "./Cars.module.css";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import Pagination from "../../components/Pagination/Pagination";
import ApiCarService from "../../services/ApiCarService";
import { Modal } from "antd";

const Cars = () => {
  const dispatch = useDispatch();
  const { cars, page, pageSize } = useSelector(selectCars);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await ApiCarService.getCarsByPage(page, pageSize);

        dispatch(setCars(response));
      } catch (error) {
        Modal.error({
          content: "Error loading cars",
          centered: true,
        });
      }
    };

    fetchCars();
  }, [dispatch, page, pageSize]);

  return (
    <>
      <Header />
      <div className={styles.cars_page}>
        <div className={styles.cards_container}>
          {cars.map((car) => (
            <Card car={car} key={car.id} />
          ))}
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default Cars;
