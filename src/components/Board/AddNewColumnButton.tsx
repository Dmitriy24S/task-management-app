import Image from "next/image";
import React from "react";
import PlusSvg from "../../assets/icons/icon-add-task-mobile.svg";

interface Props {
  setIsNewColumnFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddNewColumnButton = ({ setIsNewColumnFormOpen }: Props) => {
  return (
    <section className="mb-16 pt-10">
      {/* pt-10 to offset top for missing title compared to columns? */}
      {/* mb-16 to match left column botom spacing? */}
      <button
        onClick={() => {
          console.log("open new column modal");
          setIsNewColumnFormOpen(true);
        }}
        aria-label="add new column"
        className="text-grey group flex h-full w-[22rem] items-center justify-center gap-1 rounded-lg  border border-gray-200 bg-gradient-to-b from-[#bab2eb33] via-[#908db11a] to-[rgba(130,143,163,0)] py-2.5  px-4.5 text-center font-bold text-black hover:fill-[#805fc7] hover:text-[#635FC7] focus:outline-offset-2 focus-visible:outline-offset-2 dark:border-gray-700 dark:from-[rgba(121,132,147,.2)] dark:via-[rgba(130,143,163,.1)] dark:text-[#828fa3]  dark:shadow-task"
      >
        <PlusSvg className="group-hover:text-[#635FC7]" />
        <span className="text-2xl group-hover:text-[#635FC7]">New column</span>
      </button>
    </section>
  );
};

export default AddNewColumnButton;
