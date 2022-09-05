import React from "react";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // !!! refactor ??? reused props
}

const Modal = ({ children, isOpen, setIsOpen }: Props) => {
  return (
    <div className={`${isOpen ? "block max-h-screen" : "hidden"} `}>
      <div
        className={`backdrop fixed inset-0 z-20 bg-black opacity-60`}
        onClick={() => setIsOpen(false)}
      ></div>
      <section className="content-container fixed left-0 right-0 z-30 mx-auto mt-20 flex max-h-[80vh] w-11/12 min-w-[20rem] max-w-md flex-col gap-6 overflow-y-auto rounded-lg bg-white p-6 text-black dark:bg-[#2B2C37] dark:text-white sm:max-w-md">
        {children}
      </section>
    </div>
  );
};

export default Modal;
