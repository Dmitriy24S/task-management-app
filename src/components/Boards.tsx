import { Transition } from "@headlessui/react";
import React from "react";
import BoardSidebar from "./BoardSidebar";

interface HeaderProps {
  isBoardMenuOpen: boolean;
  setIsBoardMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  boardsData: any; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

const Boards = ({
  isBoardMenuOpen,
  setIsBoardMenuOpen,
  darkTheme,
  setDarkTheme,
  boardsData,
}: HeaderProps) => {
  return (
    <div className="relative flex min-h-full min-w-full flex-grow">
      <BoardSidebar
        isBoardMenuOpen={isBoardMenuOpen}
        setIsBoardMenuOpen={setIsBoardMenuOpen}
        setDarkTheme={setDarkTheme}
        darkTheme={darkTheme}
        boardsData={boardsData}
      />
      <section
        // className={`${
        //   isBoardMenuOpen ? "translate-x-[320px]" : "translate-x-0"
        // } relative min-h-full w-full bg-[#F4F7FD] p-4 transition-transform duration-300 dark:bg-[#20212C] dark:text-white`}
        className={`relative min-h-full w-full bg-[#F4F7FD] p-4 transition-transform duration-300 dark:bg-[#20212C] dark:text-white`}
      >
        Boards
      </section>
      {/* </Transition> */}
    </div>
  );
};

export default Boards;
