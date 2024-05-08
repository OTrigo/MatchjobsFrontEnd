import { MdSearch } from "react-icons/md";
import styles from "./search.module.scss";

const Search = ({ placeholder }: any) => {
  return (
    <div className={styles.search}>
      <MdSearch />
      <input type="text" placeholder={placeholder} className={styles.searchInput} />
    </div>
  );
};

export default Search;
