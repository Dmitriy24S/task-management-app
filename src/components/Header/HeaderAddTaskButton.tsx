import Image from "next/image";
import React from "react";

const HeaderAddTaskButton = () => {
  return (
    <button
      aria-label="add task"
      className="flex items-center rounded-3xl bg-[#635FC7] py-2.5 px-4.5 focus:outline-offset-2 focus-visible:outline-offset-2"
    >
      <Image src="/assets/icons/icon-add-task-mobile.svg" height={12} width={12} alt="" />
    </button>
  );
};

export default HeaderAddTaskButton;
