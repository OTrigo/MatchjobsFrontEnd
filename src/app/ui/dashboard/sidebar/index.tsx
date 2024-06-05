"use client";
import styles from "../../../ui/dashboard/sidebar/sidebar.module.scss";

import {
  MdAssignmentTurnedIn,
  MdCollectionsBookmark,
  MdDashboard,
  MdHelpCenter,
  MdLogout,
  MdPerson,
} from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";

import MenuLink from "./menuLink/menuLink";
import { useContext } from "react";
import { UserContext } from "src/contexts/UserContext";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Posts",
        path: "/dashboard/posts",
        icon: <MdCollectionsBookmark />,
      },
      {
        title: "Jobs",
        path: "/dashboard/jobs",
        icon: <MdAssignmentTurnedIn />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdPerson />,
      }
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Help",
        path: "",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const SideBar = () => {
  const user = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    if (window !== undefined) {
      localStorage.removeItem("user");
      console.info("deslogando...");
      router.replace("/");
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.user}>
        <Image
          src="https://i.ibb.co/Ntynk9k/noavatar.png"
          alt=""
          width="50"
          height="50"
          className={styles.userImage}
        />
        <section className={styles.userDetail}>
          <span className={styles.username}>{user?.name}</span>
          <span className={styles.userRole}>{user?.role ?? ""}</span>
        </section>
      </section>
      <ul className={styles.list}>
        {menuItems.map((menuItem) => (
          <li key={menuItem.title}>
            <span className={styles.subItems}>{menuItem.title}</span>
            {menuItem.list.map((subItem) => (
              <MenuLink item={subItem} key={subItem.title} />
            ))}
          </li>
        ))}
      </ul>
      <button className={styles.logout} onClick={() => handleLogout()}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default SideBar;
