"use client";

import Sidebar from "@/ui/dashboard/sidebar";
import Navbar from "@/ui/dashboard/navbar";
import styles from "@/ui/dashboard/dashboard.module.scss";
import Footer from "@/ui/dashboard/footer";
import { useEffect, useState, useContext, createContext } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export interface DataUserProps {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
}

export const UserContext = createContext<DataUserProps | null>(null);

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
    }

    if (typeof window !== "undefined") {
      const rawToken = localStorage.getItem("user");

      const dataUserToken = rawToken ? JSON.parse(rawToken) : null;

      if (dataUserToken) {
        const acessToken: DataUserProps = jwtDecode(
          dataUserToken?.access_token
        );

        setDataUser(acessToken);
        setIsLoading(false);
      }
    }
  }, [router]);

  return (
    <>
      {!isLoading && (
        <UserContext.Provider value={dataUser}>
          <section className={styles.container}>
            <section className={styles.menu}>
              <Sidebar />
            </section>
            <section className={styles.content}>
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
