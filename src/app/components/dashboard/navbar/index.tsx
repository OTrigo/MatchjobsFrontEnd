"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdNotifications, MdOutlineChat, MdPublic } from "react-icons/md";
import Modal from "../../common/Modal";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const pathname = usePathname();
  const [isComingSoon, setIsComingSoon] = useState(false)
  const [isEnteringComingSoonModal, setIsEnteringComingSoonModal] = useState(false)

  return (
    <>
      <div className="flex justify-between items-center p-5 rounded-lg bg-[--bgSoft]">
        <div className="font-bold capitalize text-[--textSoft]">
          {pathname.split("/").pop()}
        </div>
        <div className="flex items-center gap-5">
          <div className="flex gap-5 cursor-pointer">
            <div onClick={() => setIsComingSoon(true)}><MdOutlineChat size={20} /></div>
            <div onClick={() => setIsComingSoon(true)}><MdNotifications size={20} /></div>
            <div onClick={() => setIsComingSoon(true)}><MdPublic size={20} /></div>
          </div>
        </div>
      </div>

      {isComingSoon && (<Modal>
        <div
          className="relative flex items-center justify-center bg-white rounded-md w-[600px] h-fit min-h-64 p-4 text-[#000] box-shadow gap-4"
          onMouseEnter={() => {
            setIsEnteringComingSoonModal(true);
          }}
          onMouseLeave={() => {
            setIsEnteringComingSoonModal(false);
          }}
        >
          <h2 className="flex justify-center text-[24px] h-full w-full font-bold">Coming soon</h2>
          <button
            className={`${!isEnteringComingSoonModal && "md:opacity-0 cursor-pointer md:visible"} opacity-1 duration-300 absolute border border-1 border-color-[#191622] flex justify-center items-center right-[-8px] top-[-8px] hover:flex w-6 h-6 bg-white rounded-full`}
            onClick={() => {
              setIsComingSoon(!isComingSoon);
            }}
          >
            <IoClose />
          </button>
        </div>
      </Modal>)}
    </>
  );
};

export default Navbar;
