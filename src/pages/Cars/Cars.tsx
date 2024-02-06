import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCars, selectCars } from "../../store/СarSlice";
import Car from "../../interfaces/Car";
import styles from "./Cars.module.css";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import Pagination from "../../components/Pagination/Pagination";
import ApiCarService from "../../services/ApiCarService";

const Cars = () => {
  const dispatch = useDispatch();
  const { cars, page, pageSize } = useSelector(selectCars);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await ApiCarService.getCarsByPage(page, pageSize);

        dispatch(setCars(response));
      } catch (error) {
        console.error("Error fetching cars:", error);
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
