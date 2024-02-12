import { useState } from "react";
import CarsTable from "../../components/CarsTable/CarsTable";
import Header from "../../components/Header/Header";
import styles from "./CarsTablePage.module.css";

const CarsTablePage = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  return (
    <>
      <Header
        activeModal={
          <div onClick={() => setIsCreateModalVisible(true)}>Add car</div>
        }
      />
      <div className={styles.table_page}>
        <CarsTable
          isCreateModalVisible={isCreateModalVisible}
          onCreateModalClose={() => setIsCreateModalVisible(false)}
        />
      </div>
    </>
  );
};

export default CarsTablePage;
