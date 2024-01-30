import { FC } from "react";
import CardProps from "./Card.props";
import styles from "./Card.module.css";

const Card: FC<CardProps> = ({ car }) => {
  return (
    <>
      <div key={car.id} className={styles.card}>
        <div className={styles.card_contentt}>
          <div className={styles.img_container}>
            <img src="images/nissan.jpg" />
          </div>
          <div className={styles.description}>
            <div>
              {car.brandName} {car.yearRelese}
            </div>
            <div>{car.price}</div>
          </div>
        </div>

        <div className={styles.card_actions}>
          <button className={styles.edit_button}>Select</button>
        </div>
      </div>
    </>
  );
};

export default Card;
