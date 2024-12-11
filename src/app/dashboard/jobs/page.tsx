"use client";

import Search from "../../components/dashboard/search";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { VscError } from "react-icons/vsc";
import { UserContext } from "src/contexts/UserContext";
import AIButton from "src/app/components/common/AIButton";

interface JobsProps {
  id: number;
  title: string;
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
  title,
  description,
  createdAt,
  available,
  company,
}: JobsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasDeleted, setHasDeleted] = useState(false);

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    const rawToken = localStorage.getItem("user") ?? "";
    const auth = JSON.parse(rawToken)?.access_token;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}job/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + auth,
        },
      },
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
          <td className="p-3">{title}</td>
          <td className="p-3">{description}</td>
          <td className="p-3">{createdAt}</td>
          <td className="flex p-3 items-center justify-start h-[72px]">
            {available ? <FaCheckCircle /> : <VscError />}
          </td>
          <td className="p-3">{company?.name}</td>
          <td className="p-3">{company?.sector}</td>
          <td>
            <div className="flex gap-3 justify-center items-center">
              <Link href={`/dashboard/jobs/edit/${id}`} className="h-4 w-4">
                <FaRegEdit height={24} width={24} />
              </Link>
              <button className={`h-4 w-4`} onClick={() => handleDelete(id)}>
                <MdDelete height={24} width={24} />
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
  const user = useContext(UserContext);

  const rawToken = localStorage.getItem("user") ?? "";
  const auth = JSON.parse(rawToken)?.access_token;

  useEffect(() => {
    getJobsPerPage();
  }, [page]);

  const getJobsPerPage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}job/company/${user?.companyId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + auth,
          },
        },
      );

      const data = await response.json();
      setJobs(data);
      setTotalJobs(data.length);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="bg-[--bgSoft] p-5 rounded-xl mt-5">
      <div className="flex items-center justify-between">
        <Search placeholder="Search for a Jobs..." />
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
                  title={jobs?.title}
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
                <div className="flex p-8">Não há nenhum post no momento</div>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobsPage;
