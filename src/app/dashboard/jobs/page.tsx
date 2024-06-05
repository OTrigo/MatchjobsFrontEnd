"use client";

import styles from "../../ui/dashboard/jobs/jobs.module.scss";
import Search from "../../ui/dashboard/search";
import Link from "next/link";
import Pagination from "../../ui/dashboard/pagination";
import { useEffect, useState } from "react";

interface JobsProps {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  available: boolean;
  company: {
    id: number;
    name: string;
    sector: string;
    employeeAmount: number;
    rating: number;
  };
  companyId?: number;
}

const Job = ({
  id,
  name,
  description,
  createdAt,
  available,
  company,
}: JobsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasDeleted, setHasDeleted] = useState(false);

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    const rawToken = JSON.parse(localStorage.getItem("user") ?? "");
    const auth = rawToken?.access_token;
    const response = await fetch(
      `https://matchjobsbackend-7lo5.onrender.com/job/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + auth,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.info(data);
      setIsLoading(false);
      setHasDeleted(true);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading || hasDeleted ? (
        <></>
      ) : (
        <tr>
          <td>{name}</td>
          <td>{description}</td>
          <td>{createdAt}</td>
          <td>{available ? "Yes" : "No"}</td>
          <td>{company?.name}</td>
          <td>{company?.sector}</td>
          <td>
            <div className={styles.actions}>
              <Link href={`/dashboard/jobs/edit/${id}`}>
                <button className={`${styles.button} ${styles.view}`}>
                  Edit
                </button>
              </Link>
              <button
                className={`${styles.button} ${styles.delete}`}
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const JobsPage = () => {
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState<JobsProps[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const rawToken = JSON.parse(localStorage.getItem("user") ?? "");
  const auth = rawToken?.access_token;

  useEffect(() => {
    getJobsPerPage();
  }, [page]);

  const getJobsPerPage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://matchjobsbackend-7lo5.onrender.com/job`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + auth,
          },
        }
      );

      const data = await response.json();
      setJobs(data);
      setTotalJobs(data.length);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a Jobs..." />
        <Link href="/dashboard/jobs/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          {jobs?.length > 0 && (
            <tr>
              <td>Name</td>
              <td>Description</td>
              <td>Created at</td>
              <td>Available</td>
              <td>Company</td>
              <td>Sector</td>
            </tr>
          )}
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td>Carregando...</td>
              <td>Carregando...</td>
              <td>Carregando...</td>
              <td>Carregando...</td>
              <td>Carregando...</td>
            </tr>
          )}
          {jobs?.length > 0 ? (
            <>
              {jobs?.map((jobs, id) => (
                <Job
                  key={id}
                  id={jobs?.id}
                  name={jobs?.name}
                  description={jobs?.description}
                  createdAt={jobs?.createdAt}
                  available={jobs?.available}
                  company={jobs?.company}
                />
              ))}
            </>
          ) : (
            <>
              {!isLoading && (
                <div className={styles.noPosts}>
                  Não há nenhum post no momento
                </div>
              )}
            </>
          )}
        </tbody>
      </table>
      <Pagination setPage={setPage} page={page} total={totalJobs} />
    </div>
  );
};

export default JobsPage;
