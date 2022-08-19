import React from "react";
import BoardSidebar from "./BoardSidebar";

interface HeaderProps {
  isBoardMenuOpen: boolean;
  setIsBoardMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

const Boards = ({ isBoardMenuOpen, setIsBoardMenuOpen, darkTheme, setDarkTheme }: HeaderProps) => {
  return (
    <div className="flex min-h-full w-full flex-grow">
      <BoardSidebar
        isBoardMenuOpen={isBoardMenuOpen}
        setIsBoardMenuOpen={setIsBoardMenuOpen}
        setDarkTheme={setDarkTheme}
        darkTheme={darkTheme}
      />
      <section
        className={`relative min-h-full w-full bg-[#F4F7FD] p-4 dark:bg-[#20212C] dark:text-white`}
      >
        Boards
      </section>
    </div>
  );
};

export default Boards;
