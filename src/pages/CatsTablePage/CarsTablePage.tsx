import CarsTable from "../../components/CarsTable/CarsTable";
import Header from "../../components/Header/Header";
import styles from "./CarsTablePage.module.css";

const CarsTablePage = () => {
  return (
    <>
      <Header />
      <div className={styles.table_page}>
        <CarsTable />
      </div>
    </>
  );
};

export default CarsTablePage;
