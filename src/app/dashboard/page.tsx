"use client";

import Card from "../ui/dashboard/card";
import Chart from "../ui/dashboard/chart";
import styles from "../ui/dashboard/dashboard.module.scss";
import Rightbar from "../ui/dashboard/rightbar";
import jobsStyles from "../ui/dashboard/jobs/jobs.module.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "src/contexts/UserContext";

const Applications = () => {
  const [page, setPage] = useState(1);
  const [applications, setApplications] = useState<any[]>([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const user = useContext(UserContext);

  const rawToken = JSON.parse(localStorage.getItem("user") ?? "");
  const auth = rawToken?.access_token;

  useEffect(() => {
    getapplications();
  }, [page]);

  const getapplications = async () => {
    try {
      const response = await fetch(
        `https://mjbackend.azurewebsites.net/job/candidates/${
          user?.companyId ?? 1
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + auth,
          },
        }
      );

      const data = await response.json();
      setApplications(data);
      setTotalApplications(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <section className={jobsStyles.container}>
        <h2 className={jobsStyles.title}>Latest Applications</h2>
        <table className={jobsStyles.table}>
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
                <div className={jobsStyles.user}>Juan Claudio</div>
              </td>
              <td>
                <span className={`${jobsStyles.status} ${jobsStyles.pending}`}>
                  Pending
                </span>
              </td>
              <td>14.02.2024</td>
              <td>Q.A</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default function DashBoard() {
  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.main}>
          <section className={styles.cards}>
            <Card title={"Total de posts"} type={"post"} />
            <Card title={"Total de jobs"} type={"job"} />
            <Card title={"Total de aplicações"} type={"applications"} />
          </section>
          <Applications />
          <Chart />
        </div>
        <div className={styles.side}>
          <Rightbar />
        </div>
      </section>
    </>
  );
}
