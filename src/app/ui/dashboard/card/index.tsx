import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.scss";

const Card = () => {
  return (
    <>
      <section className={styles.container}>
        <MdSupervisedUserCircle size={24} />
        <div className={styles.texts}>
          <span className={styles.title}>Total Vacancys</span>
          <span className={styles.number}>10.928</span>
          <span className={styles.detail}>
            <span className={styles.positive}>12% </span>
            more than
          </span>
        </div>
      </section>
    </>
  );
};

export default Card;
