import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.logo}>MatchJobs</div>
        <div className={styles.text}>All rights reserved.</div>
      </section>
    </>
  );
};

export default Footer;
