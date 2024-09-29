import { MdSupervisedUserCircle } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "src/contexts/UserContext";

const Card = ({ title, type }: any) => {
  console.log(type);
  const [isLoading, setIsLoading] = useState(true);
  const [displayValue, setDisplayValue] = useState(0);
  const rawToken = JSON.parse(localStorage.getItem("user") ?? "");
  const auth = rawToken?.access_token;
  const user = useContext(UserContext);

  const handleGetAllPosts = async () => {
    if (user?.role === "Admin") {
      try {
        console.log("ADMIN!");
        const response = await fetch(
          `https://mjbackend.azurewebsites.net/post`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer" + auth,
            },
          }
        );

        const data = await response.json();
        setDisplayValue(data?.length);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    } else {
    }
  };

  const handleGetAllJobs = async () => {
    if (user?.role === "Admin") {
      console.log("JOBS!");
      try {
        const response = await fetch(
          `https://mjbackend.azurewebsites.net/job`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer" + auth,
            },
          }
        );

        const data = await response.json();
        setDisplayValue(data?.length);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    } else {
    }
  };

  const handleGetAllApplications = async () => {
    if (user?.role === "Admin") {
      console.log("APPLICATIONS!");
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
        setDisplayValue(data?.length);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    } else {
    }
  };

  useEffect(() => {
    if (type === "post") {
      handleGetAllPosts();
    } else if (type === "job") {
      handleGetAllJobs();
    } else {
      handleGetAllApplications();
    }
  }, [type]);

  return (
    <>
      <section className="bg-[--bgSoft] p-5 rounded-lg flex gap-5 cursor-pointer w-full hover:bg-[#2e374a]
">
        <MdSupervisedUserCircle size={24} />
        <div className="flex flex-col gap-5">
          <span className="flex">
            {title} {user?.role === "Admin" && "(Admin Mode)"}
          </span>
          <span className={"text-[24px] font-medium"}>{displayValue}</span>
        </div>
      </section>
    </>
  );
};

export default Card;
