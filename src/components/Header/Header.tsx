import styles from "./Header.module.css";
import CustomLink from "../../UiKit/CustomLink/CustomLink";
import { FC } from "react";
import { HeaderProps } from "./Header.props";
import { Button, Dropdown, MenuProps } from "antd";
import useAuth from "../../hooks/useAuth";

const Header: FC<HeaderProps> = ({ activeModal }) => {
  const { logout, userRole } = useAuth();

  const roleItemsDropdown = () => {
    switch (userRole) {
      case "User":
        return [{ key: 1, label: <Button onClick={logout}>Logout</Button> }];
      case "Manager":
        return [
          {
            key: 1,
            label: <CustomLink to="/carsTable" value="Cars table" />,
          },
          { key: 2, label: <Button onClick={logout}>Logout</Button> },
        ];
      case "Admin":
        return [
          {
            key: 1,
            label: <CustomLink to="/carsTable" value="Cars table" />,
          },
          {
            key: 2,
            label: <CustomLink to="/usersTable" value="Users table" />,
          },
          { key: 3, label: <Button onClick={logout}>Logout</Button> },
        ];
      default:
        return [];
    }
  };

  const items: MenuProps["items"] = roleItemsDropdown();

  return (
    <header className={styles.header}>
      <div className={styles.item_row}>
        <img src="/images/logo.png" className={styles.logo} />
        <b className={styles.title_text}>Car service</b>
        <CustomLink to="/cars" value="Car list" />
        <div className={styles.nav_link}>{activeModal}</div>
      </div>
      <ul className={styles.item_group}>
        <li>
          <img src="/images/basket.svg" />
          <b>1250 р</b>
        </li>
        <li>
          <img src="/images/favorite.svg" />
          <b>Favorite</b>
        </li>
        <li>
          <Dropdown
            menu={{ items }}
            placement="bottom"
            arrow={true}
            trigger={["click"]}
          >
            <a
              onClick={(e) => e.preventDefault()}
              className={styles.profile_group}
            >
              <img src="/images/profile.svg" alt="Profile" />
              <b>Profile</b>
            </a>
          </Dropdown>
        </li>
      </ul>
    </header>
  );
};

export default Header;
