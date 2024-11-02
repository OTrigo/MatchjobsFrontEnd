"use client";

import { useEffect, useRef, useState } from "react";

type UserMainProps = {
  name: string;
  role: string;
};

const Welcome = ({ name, role }: UserMainProps) => {
  const [mustEndWelcome, setMustEndWelcome] = useState(false);
  const welcomeContainer = useRef(null);

  useEffect(() => {
    if (!mustEndWelcome) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "auto";
    }
  }, [mustEndWelcome]);

  setTimeout(() => {
    setMustEndWelcome(true);
  }, 2000);

  return (
    <div
      ref={welcomeContainer}
      className={`absolute flex justify-center items-center h-screen w-full z-50 backdrop-blur-md bg-black/60 ${
        mustEndWelcome ? "animation-none welcome-out" : "welcome-in"
      }`}
    >
      <span
        className={`font-grotesk text-4xl ${
          mustEndWelcome ? "from-down-out" : "from-up-in"
        }`}
      >
        MatchJobs in {role} mode - Welcome {name}.
      </span>
    </div>
  );
};

export default Welcome;
