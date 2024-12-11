import { MdSupervisedUserCircle } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "src/contexts/UserContext";

const Card = ({ title, type }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayValue, setDisplayValue] = useState(0);
  const rawToken = localStorage?.getItem("user");
  const user = useContext(UserContext);

  const handleGetAllPosts = async () => {
    if (!rawToken) return;
    const auth = JSON.parse(rawToken)?.access_token;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${user?.role === "Admin" ? "post" : `post/myposts/${user?.id}`}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + auth,
          },
        },
      );

      const data = await response.json();

      console.log(data);
      setDisplayValue(user?.role === "Admin" ? data.length : data.total);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleGetAllJobs = async () => {
    const auth = JSON.parse(rawToken ?? "")?.access_token;
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

      console.log("user?.companyId:", user?.companyId);

      const data = await response.json();
      setDisplayValue(data?.length);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleGetAllApplications = async () => {
    const auth = JSON.parse(rawToken ?? "")?.access_token;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}company/applications/${
          user?.companyId ?? 1
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        },
      );

      const data = await response.json();
      console.log("Pegando aplicações:", data._count);
      setDisplayValue(data._count);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
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
      <section
        className="bg-[--bgSoft] p-5 rounded-lg flex gap-5 cursor-pointer w-full hover:bg-[#2e374a]
"
      >
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
