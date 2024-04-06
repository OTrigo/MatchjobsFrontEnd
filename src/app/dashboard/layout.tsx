import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/ui/dashboard/sidebar";
import Navbar from "@/ui/dashboard/navbar";
import styles from "@/ui/dashboard/dashboard.module.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MatchJobs",
  description: "The business platform from MatchJobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.menu}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <Navbar />
          {children}
        </div>
      </div>
    </>
  );
}
