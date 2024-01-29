import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCars, selectCars } from "../../store/СarSlice";
import Car from "../../interfaces/Car";
import styles from "./Cars.module.css";
import Card from "../../components/Card/Card";

const CarsCards = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get<Car[]>(
          "https://localhost:7227/api/Car/GetCars",
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
  }, [dispatch]);

  return (
    <div className={styles.cars_page}>
      <div className={styles.cards_container}>
        {cars.map((car) => (
          <Card car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarsCards;