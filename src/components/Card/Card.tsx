import { FC } from "react";
import CardProps from "./Card.props";
import styles from "./Card.module.css";

const Card: FC<CardProps> = ({ car }) => {
  return (
    <>
      <div key={car.id} className={styles.card}>
        <div className={styles.card_contentt}>
          <div>{car.brandName}</div>
          <div>
            <img src="images/nissan.jpg" />
          </div>
        </div>

        <div className={styles.card_actions}>
          <button className={styles.edit_button}>Edit</button>
          <button className={styles.delete_button}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default Card;
