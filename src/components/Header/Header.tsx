import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.item_row}>
        <img src="public/images/logo.png" className={styles.logo} />
        <div>Car service</div>
      </div>
      <ul className={styles.item_group}>
        <li>
          <img src="public/images/basket.svg" />
          <b>1250 р</b>
        </li>
        <li>
          <img src="public/images/favorite.svg" />
          <b>Закладки</b>
        </li>
        <li>
          <img src="public/images/profile.svg" />
          <b>Профиль</b>
        </li>
      </ul>
    </header>
  );
};

export default Header;
