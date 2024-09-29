"use client";

import Sidebar from "../components/dashboard/sidebar";
import Navbar from "../components/dashboard/navbar";
import Footer from "../components/dashboard/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../contexts/UserContext";

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
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      router.replace("/");
      return;
    }

    if (typeof window !== "undefined") {
      const rawToken = localStorage.getItem("user");

      if (rawToken) {
        try {
          const dataUserToken = JSON.parse(rawToken);
          const accessToken: DataUserProps = jwtDecode(
            dataUserToken.access_token
          );
          setDataUser(accessToken);
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      }
      setIsLoading(false);
    }
  }, [router]);

  return (
    <>
      {!isLoading && (
        <UserContext.Provider value={dataUser}>
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
