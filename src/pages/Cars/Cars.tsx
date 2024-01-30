import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCars, selectCars } from "../../store/СarSlice";
import Car from "../../interfaces/Car";
import styles from "./Cars.module.css";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import Pagination from "../../components/Pagination/Pagination";

const CarsCards = () => {
  const dispatch = useDispatch();
  const { cars, page, pageSize } = useSelector(selectCars);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get<{ cars: Car[]; totalItems: number }>(
          `https://localhost:7227/api/Car/GetCarsByPage?page=${page}&pageSize=${pageSize}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        dispatch(setCars(response.data));
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
            <div key={car.id}>
              <Card car={car} />
            </div>
          ))}
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default CarsCards;
