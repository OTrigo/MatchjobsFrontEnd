import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/ui/dashboard/sidebar";
import Navbar from "@/ui/dashboard/navbar";
import styles from "@/ui/dashboard/dashboard.module.scss";
import Footer from "@/ui/dashboard/footer";

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
      <section className={styles.container}>
        <main className={styles.menu}>
          <Sidebar />
        </main>
        <section className={styles.content}>
          <Navbar />
          {children}
          <Footer />
        </section>
      </section>
    </>
  );
}
