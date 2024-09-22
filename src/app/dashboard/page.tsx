"use client";

import Card from "../ui/dashboard/card";
import Chart from "../ui/dashboard/chart";
import Rightbar from "../ui/dashboard/rightbar";
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
            <tr>
              <td className="py-2.5">
                <div>Juan Claudio</div>
              </td>
              <td>
                <span className="">Pending</span>
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
