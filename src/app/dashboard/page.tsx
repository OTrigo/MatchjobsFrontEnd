"use client";

import Card from "@/ui/dashboard/card";
import Transactions from "@/ui/dashboard/transactions";
import Chart from "@/ui/dashboard/chart";
import styles from "@/ui/dashboard/dashboard.module.scss";
import Rightbar from "@/ui/dashboard/rightbar";

export default function DashBoard() {
  return (
    <>
      <main className={styles.wrapper}>
        <div className={styles.main}>
          <section className={styles.cards}>
            <Card />
            <Card />
            <Card />
          </section>
          <Transactions/>
          <Chart />
        </div>
        <div className={styles.side}>
          <Rightbar />
        </div>
      </main>
    </>
  );
}
