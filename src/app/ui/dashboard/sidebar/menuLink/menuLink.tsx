"use client";
import styles from "@/ui/dashboard/sidebar/menuLink/menuLink.module.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuLinkProps = {
  item: {
    title: string;
    path: string;
    icon: JSX.Element;
  };
};

const MenuLink = ({ item }: MenuLinkProps) => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={item.path}
        className={`${styles.container} ${
          pathname === item.path && styles.active
        }`}
      >
        {item.icon}
        {item.title}
      </Link>
    </>
  );
};

export default MenuLink;
