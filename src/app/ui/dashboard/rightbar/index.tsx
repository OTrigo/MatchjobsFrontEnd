import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";
import styles from "./rightbar.module.scss";
import Image from "next/image";

const Rightbar = () => {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.item}>
          <div className={styles.bgContainer}>
            <Image src="/" alt="" fill className={styles.bgImage} />
          </div>
          <div className={styles.texts}>
            <span className={styles.notification}>Available now</span>
            <h3 className={styles.title}>
              How to use the new version of the admin dashboard?
            </h3>
            <span className={styles.subtitle}>Takes 4 minutes to learn</span>
            <p className={styles.desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
              natus iste architecto debitis, at delectus, similique maiores
              iusto distinctio assumenda.
            </p>
            <button className={styles.button}>
              <MdPlayCircleFilled />
              Watch
            </button>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.texts}>
            <span className={styles.notification}>Available now</span>
            <h3 className={styles.title}>
              How to use the new version of the admin dashboard?
            </h3>
            <span className={styles.subtitle}>Takes 4 minutes to learn</span>
            <p className={styles.desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
              natus iste architecto debitis, at delectus, similique maiores
              iusto distinctio assumenda.
            </p>
            <button className={styles.button}>
              <MdReadMore />
              Watch
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Rightbar;
