import styles from "@/ui/dashboard/sidebar/sidebar.module.scss";
import {
  MdAssignmentTurnedIn,
  MdCollectionsBookmark,
  MdDashboard,
  MdHelpCenter,
  MdLogout,
  MdOutlineSettings,
  MdPeople,
  MdWork,
} from "react-icons/md";
import Image from "next/image";

import MenuLink from "./menuLink/menuLink";

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
        title: "Vacancys",
        path: "/dashboard/vacancys",
        icon: <MdAssignmentTurnedIn />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const SideBar = () => {
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
            <span className={styles.username}>Jorge Lucas</span>
            <span className={styles.userRole}>Administrator</span>
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
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </div>
  );
};

export default SideBar;
