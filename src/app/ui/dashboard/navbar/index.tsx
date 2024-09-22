"use client";
import { usePathname } from "next/navigation";
import { MdNotifications, MdOutlineChat, MdPublic } from "react-icons/md";
const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="flex justify-between items-center p-5 rounded-lg bg-[--bgSoft]">
      <div className="font-bold capitalize text-[--textSoft]">
        {pathname.split("/").pop()}
      </div>
      <div className="flex items-center gap-5">
        <div className="flex gap-5">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
