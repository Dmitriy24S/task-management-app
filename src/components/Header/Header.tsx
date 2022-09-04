import Image from "next/image";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { Board } from "../../types";
import HeaderAddTaskButton from "./HeaderAddTaskButton";
import HeaderMoreInfoButton from "./HeaderMoreInfoButton";

interface HeaderProps {
  isBoardMenuOpen: boolean;
  setIsBoardMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  darkTheme: boolean | null;
  // selectedBoard: any; // !!!!!
  selectedBoard: Board;
  setIsNewTaskFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({
  isBoardMenuOpen,
  setIsBoardMenuOpen,
  darkTheme,
  selectedBoard,
  setIsNewTaskFormOpen,
}: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white dark:bg-[#2B2C37] dark:text-white">
      <div className="flex items-center justify-between p-4">
        <div className="header-left flex items-center gap-3">
          {/* Logo */}
          <div className="hidden sm:mr-4 sm:block">
            <Image
              src={`/assets/icons/logo-${darkTheme ? "light" : "dark"}.svg`}
              height={26}
              width={153}
              layout="fixed"
              alt="logo"
              priority
            />
          </div>
          <div className="sm:hidden">
            <Image src="/assets/icons/logo-mobile.svg" height={24} width={25} alt="logo" />
          </div>
          {/* Active board name / open/close sidebar menu */}
          <button
            className="relative flex items-center gap-1 text-2xl font-bold before:absolute before:-inset-1 before:top-full before:left-0 before:block before:h-0.5 before:w-0 before:bg-[#635FC7] before:opacity-100 before:transition-all before:duration-300 hover:before:w-full hover:before:opacity-100 sm:focus:outline-offset-2 sm:focus-visible:outline-offset-2"
            onClick={() => setIsBoardMenuOpen(!isBoardMenuOpen)}
          >
            {selectedBoard.name} <FaChevronDown fill="#635FC7" className="sm:hidden" />
          </button>
        </div>
        <div className="header-right flex items-center gap-1.5">
          <HeaderAddTaskButton setIsNewTaskFormOpen={setIsNewTaskFormOpen} />
          <HeaderMoreInfoButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
