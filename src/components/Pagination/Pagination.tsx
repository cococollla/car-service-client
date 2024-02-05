import { useDispatch, useSelector } from "react-redux";
import { selectCars, setPaginationInfo } from "../../store/СarSlice";
import styles from "./Pagination.module.css";
import { Pagination } from "antd";

const CustomPagination = () => {
  const dispatch = useDispatch();
  const { page, pageSize, totalItems } = useSelector(selectCars);

  const handlePageChange = (newPage: number) => {
    dispatch(setPaginationInfo({ page: newPage, pageSize }));
  };

  return (
    <div className={styles.pagination}>
      <Pagination
        current={page}
        pageSize={pageSize}
        total={totalItems}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default CustomPagination;
