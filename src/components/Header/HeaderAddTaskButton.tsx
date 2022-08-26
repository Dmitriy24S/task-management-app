import Image from "next/image";
import React from "react";

interface Props {
  setIsNewTaskFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderAddTaskButton = ({ setIsNewTaskFormOpen }: Props) => {
  return (
    <button
      onClick={() => setIsNewTaskFormOpen(true)}
      aria-label="add task"
      className="flex items-center rounded-3xl bg-[#635FC7] py-2.5 px-4.5 hover:bg-[#6e6adf] focus:outline-offset-2 focus-visible:outline-offset-2"
    >
      <Image src="/assets/icons/icon-add-task-mobile.svg" height={12} width={12} alt="" />
      <span className="ml-1 hidden text-sm text-white sm:flex">Add new task</span>
    </button>
  );
};

export default HeaderAddTaskButton;
