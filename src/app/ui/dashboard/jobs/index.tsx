import Image from "next/image";
import styles from "./jobs.module.scss";

const Jobs = () => {
  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.title}>Latest Applications</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Candidate</td>
              <td>Status</td>
              <td>Date</td>
              <td>Vacancy</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className={styles.user}>
                  <Image
                    src="https://i.ibb.co/Ntynk9k/noavatar.png"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  Juan Claudio
                </div>
              </td>
              <td>
                <span className={`${styles.status} ${styles.pending}`}>
                  Pending
                </span>
              </td>
              <td>14.02.2024</td>
              <td>Q.A</td>
            </tr>
            <tr>
              <td>
                <div className={styles.user}>
                  <Image
                    src="https://i.ibb.co/Ntynk9k/noavatar.png"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  Ruan Gomes
                </div>
              </td>
              <td>
                <span className={`${styles.status} ${styles.pending}`}>
                  Pending
                </span>
              </td>
              <td>14.02.2024</td>
              <td>Web Developer</td>
            </tr>
            <tr>
              <td>
                <div className={styles.user}>
                  <Image
                    src="https://i.ibb.co/Ntynk9k/noavatar.png"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  Manoel Gomes
                </div>
              </td>
              <td>
                <span className={`${styles.status} ${styles.cancelled}`}>
                  Cancelled
                </span>
              </td>
              <td>14.02.2024</td>
              <td>Medicine</td>
            </tr>
            <tr>
              <td>
                <div className={styles.user}>
                  <Image
                    src="https://i.ibb.co/Ntynk9k/noavatar.png"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  Matheus Marazzi
                </div>
              </td>
              <td>
                <span className={`${styles.status} ${styles.done}`}>Done</span>
              </td>
              <td>14.02.2024</td>
              <td>Production Engineer</td>
            </tr>
            <tr>
              <td>
                <div className={styles.user}>
                  <Image
                    src="https://i.ibb.co/Ntynk9k/noavatar.png"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  Gabriel Martins
                </div>
              </td>
              <td>
                <span className={`${styles.status} ${styles.done}`}>Done</span>
              </td>
              <td>14.02.2024</td>
              <td>Web Developer</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Jobs;
