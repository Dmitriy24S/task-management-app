import Image from "next/image";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";

interface HeaderProps {
  isBoardMenuOpen: boolean;
  setIsBoardMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  darkTheme: boolean | null;
  selectedBoard: any; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

const Header = ({ isBoardMenuOpen, setIsBoardMenuOpen, darkTheme, selectedBoard }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white dark:bg-[#2B2C37] dark:text-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
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
          <button
            className="flex items-center gap-1 focus:outline-offset-2 focus-visible:outline-offset-2"
            onClick={() => setIsBoardMenuOpen(!isBoardMenuOpen)}
          >
            {selectedBoard.name} <FaChevronDown fill="#635FC7" className="sm:hidden" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label="add task"
            className="flex items-center rounded-3xl bg-[#635FC7] py-2.5 px-4.5 focus:outline-offset-2 focus-visible:outline-offset-2"
          >
            <Image src="/assets/icons/icon-add-task-mobile.svg" height={12} width={12} alt="" />
          </button>
          <button aria-label="options menu" className=" flex items-center py-2.5 px-2.5">
            <BsThreeDotsVertical fontSize={25} fill="#828fa3" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
