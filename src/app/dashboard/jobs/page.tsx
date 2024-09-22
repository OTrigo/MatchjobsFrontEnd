"use client";

import Search from "../../ui/dashboard/search";
import Link from "next/link";
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
      `https://mjbackend.azurewebsites.net/job/${id}`,
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
            <div className="flex gap-3">
              <Link href={`/dashboard/jobs/edit/${id}`}>
                <button className={`py-1 px-3 bg-[teal]`}>Edit</button>
              </Link>
              <button
                className={`py-1 px-3 rounded-md cursor-pointer border-none text-[--text] bg-[crimson]`}
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
      const response = await fetch(`https://mjbackend.azurewebsites.net/job`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + auth,
        },
      });

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
    <div className="bg-[--bgSoft] p-5 rounded-xl mt-5">
      <div className="flex items-center justify-between">
        <Search placeholder="Search for a Jobs..." />
        <Link href="/dashboard/jobs/add">
          <button className="p-3 bg-[#5d57c9] text-[--text] border-none rounded-md cursor-pointer">
            Add New
          </button>
        </Link>
      </div>
      <table className="w-full">
        <thead>
          {jobs?.length > 0 && (
            <tr>
              <td className="p-3">Name</td>
              <td className="p-3">Description</td>
              <td className="p-3">Created at</td>
              <td className="p-3">Available</td>
              <td className="p-3">Company</td>
              <td className="p-3">Sector</td>
            </tr>
          )}
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td className="p-3">Carregando...</td>
              <td className="p-3">Carregando...</td>
              <td className="p-3">Carregando...</td>
              <td className="p-3">Carregando...</td>
              <td className="p-3">Carregando...</td>
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
                <div className="flex p-8">
                  Não há nenhum post no momento
                </div>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobsPage;
