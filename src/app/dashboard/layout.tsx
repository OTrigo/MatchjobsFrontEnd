"use client";

import Sidebar from "../components/dashboard/sidebar";
import Navbar from "../components/dashboard/navbar";
import Footer from "../components/dashboard/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../contexts/UserContext";
import Welcome from "../components/login/Welcome";

export interface DataUserProps {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  companyId?: string;
  jobsId?: string;
  portifolio?: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [dataUser, setDataUser] = useState<DataUserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  const getUserInfo = async (rawToken: string) => {
    try {
      const dataUserToken = JSON.parse(rawToken);
      const accessToken: DataUserProps = jwtDecode(dataUserToken.access_token);
      setDataUser(accessToken);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const tokenIsValid = async (rawToken: string) => {
    console.log("tring to validate token");
    if (!rawToken) return;
    const auth = JSON.parse(rawToken)?.access_token;
    try {
      const response = await fetch(
        "https://mjbackend.azurewebsites.net/user/me",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        },
      );

      if (!response?.ok) {
        router.replace("/");
        localStorage.removeItem("user");
        setIsLogged(false);
      } else {
        setIsLogged(true);
      }
    } catch (error) {
      console.log("Failed to validate token:", error);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    const rawToken = localStorage.getItem("user");
    setIsLoading(true);

    tokenIsValid(rawToken ?? "");

    getUserInfo(rawToken ?? "");

    setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading && (
        <UserContext.Provider value={dataUser}>
          <Welcome role={dataUser?.role ?? ""} name={dataUser?.name ?? ""} />
          <section className="flex">
            <section className="flex-1 bg-[--bgSoft] p-5">
              <Sidebar />
            </section>
            <section className="flex-[4] p-5">
              <Navbar />
              {children}
              <Footer />
            </section>
          </section>
        </UserContext.Provider>
      )}
    </>
  );
}
