import useGlobalRefs from "../helpers/GlobalRefs";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const { HTMLRef } = useGlobalRefs();

  type HTMLElementType = HTMLElement | null;
  const root: HTMLElementType = HTMLRef.current;

  if (!root) {
    console.error("Cannot reach the root element.");
  }

  return (
    <div className="flex fixed justify-center items-center z-50 h-screen w-screen backdrop-blur-sm top-0 left-0 max-w-full !overflow-hidden ">
      {children}
    </div>
  );
};

export default Modal;
