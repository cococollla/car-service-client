import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCars, selectCars } from "../../store/carSlice";
import Car from "../../interfaces/Car";
import styles from "./CarCards.module.css";

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
    <div className={styles.cardsContainer}>
      {cars.map((car) => (
        <div key={car.id} className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.brand}>{car.brandName}</div>
            <div className={styles.description}>{car.shortDescription}</div>
            <div className={styles.price}>{car.price}</div>
          </div>
          <div className={styles.cardActions}>
            <button className={styles.editButton}>Edit</button>
            <button className={styles.deleteButton}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarsCards;
