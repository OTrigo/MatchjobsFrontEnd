"use client";

import Card from "../components/dashboard/card";
import Chart from "../components/dashboard/chart";
import Rightbar from "../components/dashboard/rightbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "src/contexts/UserContext";
import Welcome from "../components/login/Welcome";

const Applications = () => {
  const [page, setPage] = useState(1);
  const [applications, setApplications] = useState<Application[]>([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const user = useContext(UserContext);

  const rawToken = localStorage.getItem("user") ?? "";

  useEffect(() => {
    getapplications();
  }, [page]);

  const getapplications = async () => {
    if (!rawToken) return;
    const auth = JSON.parse(rawToken)?.access_token;
    try {
      const response = await fetch(
        `https://mjbackend.azurewebsites.net/company/applications/recruiter/${
          user?.companyId ?? 1
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        },
      );

      const data = await response.json();
      setApplications(data);
      setTotalApplications(data.length);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <section
        className="bg-[#182237] p-5 rounded-lg mt-5
"
      >
        <h2 className="flex">Latest Applications</h2>
        <table className="w-full">
          <thead>
            <tr>
              <td className="py-2.5">Candidate</td>
              <td className="py-2.5">Status</td>
              <td className="py-2.5">Date</td>
              <td className="py-2.5">Vacancy</td>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              <>
                {applications?.map((application: Application) => (
                  <>
                    <tr>
                      <td className="py-2.5">
                        <div>{application.user?.name}</div>
                      </td>
                      <td>
                        <span className="">
                          {application?.status ?? "Pending"}
                        </span>
                      </td>
                      <td>
                        {application.createdAt?.toString() ?? "00-00-0000"}
                      </td>
                      <td>{application.job?.title ?? ""}</td>
                    </tr>
                  </>
                ))}
              </>
            ) : (
              <>
                <tr>
                  <td className="py-2.5">Sem aplicações recentes.</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default function DashBoard() {
  return (
    <>
      <section className="flex gap-5 mt-5 max-w-[80%]">
        <div className="flex-grow flex flex-col gap-5">
          <section className="flex gap-5">
            <Card title={"Total de posts"} type={"post"} />
            <Card title={"Total de jobs"} type={"job"} />
            <Card title={"Total de aplicações"} type={"applications"} />
          </section>
          <Applications />
          <Chart />
        </div>
        <div className="flex-[1]">
          <Rightbar />
        </div>
      </section>
    </>
  );
}
