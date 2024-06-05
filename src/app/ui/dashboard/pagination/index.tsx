import { Dispatch, SetStateAction } from "react";
import styles from "./pagination.module.scss";

interface PaginationProps {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  total: number;
}

const Pagination = ({ setPage, page, total }: PaginationProps) => {
  console.log(page, total, total / 10, page > total / 10);
  const handleNext = () => {
    if (page <= total / 10) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    page >= 1 ? setPage(page - 1) : page;
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => handlePrev()}
        {...(page === 1 ? { disabled: true } : {})}
      >
        Previous
      </button>
      <button
        className={styles.button}
        onClick={() => handleNext()}
        {...(page > total / 10 ? { disabled: true } : {})}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
