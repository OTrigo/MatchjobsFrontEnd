import { MdPlayCircleFilled } from "react-icons/md";
import styles from "./rightbar.module.scss";
import Link from "next/link";

const Rightbar = () => {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.item}>
          <div className={styles.bgContainer}></div>
          <div className={styles.texts}>
            <span className={styles.notification}>Available now</span>
            <h3 className={styles.title}>
              How to use the new version of the admin dashboard?
            </h3>
            <span className={styles.subtitle}>Takes 4 minutes to learn</span>
            <p className={styles.desc}>
              Watch our institutional video to learn how the use the MatchJobs
              platform to increase your application numbers!
            </p>
            <Link href="https://youtu.be/yVt9o9OouLk" target="_blank">
              <button className={styles.button}>
                <MdPlayCircleFilled />
                Watch
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Rightbar;
