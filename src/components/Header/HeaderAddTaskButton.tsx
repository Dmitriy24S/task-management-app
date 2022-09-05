import Image from "next/image";
import React from "react";
import PlusSvg from "../../assets/icons/icon-add-task-mobile.svg";

interface Props {
  setIsNewTaskFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderAddTaskButton = ({ setIsNewTaskFormOpen }: Props) => {
  return (
    <button
      onClick={() => setIsNewTaskFormOpen(true)}
      aria-label="add task"
      className="flex items-center rounded-3xl bg-[#635FC7] py-2.5 px-4.5 text-white hover:bg-[#6e6adf] focus:outline-offset-2 focus-visible:outline-offset-2"
    >
      {/* <Image src="/assets/icons/icon-add-task-mobile.svg" height={12} width={12} alt="" /> */}
      <PlusSvg />
      <span className="ml-1 hidden text-sm sm:flex">Add new task</span>
    </button>
  );
};

export default HeaderAddTaskButton;
