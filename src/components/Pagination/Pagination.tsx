import { useDispatch, useSelector } from "react-redux";
import { selectCars, setPaginationInfo } from "../../store/СarSlice";
import styles from "./Pagination.module.css";

const Pagination = () => {
  const dispatch = useDispatch();
  const { page, pageSize, totalItems } = useSelector(selectCars);

  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage: number) => {
    dispatch(setPaginationInfo({ page: newPage, pageSize }));
  };

  return (
    <div className={styles.pagination}>
      <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={page === index + 1 ? styles.activePage : ""}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
