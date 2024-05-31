import { Dispatch, SetStateAction } from "react";
import styles from "./pagination.module.scss";

interface PaginationProps {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  totalPosts: number;
}

const Pagination = ({ setPage, page, totalPosts }: PaginationProps) => {
  const handleNext = () => {
    if (page <= totalPosts / 10) {
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
        {...(page > (totalPosts / 10) ? { disabled: true } : {})}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
