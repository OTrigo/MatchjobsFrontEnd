"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.scss";
import { MdSearch } from "react-icons/md";
const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className="search">
          <MdSearch />
          <input type="text" name="" placeholder="Search..." id="" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
