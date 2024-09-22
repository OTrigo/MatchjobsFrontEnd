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
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Help",
        path: "https://youtu.be/yVt9o9OouLk",
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
    <div
      className="h-screen sticky top-10
"
    >
      <section
        className="flex items-center gap-5 mb-5
"
      >
        <Image
          src="https://i.ibb.co/Ntynk9k/noavatar.png"
          alt=""
          width="50"
          height="50"
          className="rounded-full object-cover
"
        />
        <section className="flex flex-col">
          <span className="font-medium">{user?.name}</span>
          <span className="text-[12px] text-[--textSoft]">
            {user?.role ?? ""}
          </span>
        </section>
      </section>
      <ul className="list-none">
        {menuItems.map((menuItem) => (
          <li key={menuItem.title}>
            <span className="">{menuItem.title}</span>
            {menuItem.list.map((subItem) => (
              <MenuLink item={subItem} key={subItem.title} />
            ))}
          </li>
        ))}
      </ul>
      <button
        className="p-5 flex items-center gap-2 my-1.5 rounded-md cursor-pointer bg-none border-none text-white w-full hover:bg-[#2e374a]"
        onClick={() => handleLogout()}
      >
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default SideBar;
