"use client";

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
        className={`p-5 flex items-center gap-2 my-1.5 rounded-md cursor-pointer hover:bg-[#2e374a] 
 ${pathname === item.path && "bg-[#2e374a]"}`}
      >
        {item.icon}
        {item.title}
      </Link>
    </>
  );
};

export default MenuLink;
