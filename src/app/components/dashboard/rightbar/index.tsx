import { MdPlayCircleFilled } from "react-icons/md";
import Link from "next/link";

const Rightbar = () => {
  return (
    <>
      <section className="fixed z-10">
        <div
          className="bg-gradient-to-t from-[#182237] to-[#253352] p-5 px-6 rounded-lg mb-5 relative
"
        >
          <div
            className="absolute right-0 bottom-0 w-1/2 h-1/2
"
          ></div>
          <div
            className="flex flex-col
"
          >
            <span className="font-bold">Available now</span>
            <h3 className="text-[--textSoft] font-bold text-[12px]">
              How to use the new version of the admin dashboard?
            </h3>
            <span className="text-[--textSoft] font-bold text-[12px]">
              Takes 4 minutes to learn
            </span>
            <p className="text-[--textSoft] text-[14px]">
              Watch our institutional video to learn how the use the MatchJobs
              platform to increase your application numbers!
            </p>
            <Link href="https://youtu.be/yVt9o9OouLk" target="_blank">
              <button
                className="p-2 mt-3 flex items-center gap-2 w-max bg-[#5d57c9] text-white border-none rounded-md cursor-pointer
"
              >
                <MdPlayCircleFilled />
                Watch
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Rightbar;
