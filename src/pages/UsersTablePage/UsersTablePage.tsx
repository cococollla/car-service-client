import { useState } from "react";
import CarsTable from "../../components/CarsTable/CarsTable";
import Header from "../../components/Header/Header";
import styles from "./UsersTablePage.module.css";
import UsersTable from "../../components/UsersTable/UsersTable";

const UsersTablePage = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  return (
    <>
      <Header
        activeModal={
          <div onClick={() => setIsCreateModalVisible(true)}>Add user</div>
        }
      />
      <div className={styles.table_page}>
        <UsersTable
          isCreateModalVisible={isCreateModalVisible}
          onCreateModalClose={() => setIsCreateModalVisible(false)}
        />
      </div>
    </>
  );
};

export default UsersTablePage;
