import { Dispatch, SetStateAction } from "react";

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
    <div
      className="p-2.5 flex justify-between
"
    >
      <button
        className="p-1.5 cursor-pointer"
        onClick={() => handlePrev()}
        {...(page === 1 ? { disabled: true } : {})}
      >
        Previous
      </button>
      <button
        className="p-1.5 cursor-pointer
  disabled:cursor-not-allowed"
        onClick={() => handleNext()}
        {...(page > total / 10 ? { disabled: true } : {})}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
