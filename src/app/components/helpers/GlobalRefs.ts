import { useRef } from "react";

const useGlobalRefs = () => {
  const HTMLRef = useRef(null);
  return { HTMLRef };
};

export default useGlobalRefs;
