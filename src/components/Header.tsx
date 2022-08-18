import Image from "next/image";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import BoardSidebar from "./BoardSidebar";

interface HeaderProps {
  isBoardMenuOpen: boolean;
  setIsBoardMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ isBoardMenuOpen, setIsBoardMenuOpen }: HeaderProps) => {
  return (
    <header className="dark:bg-[#2B2C37]">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/assets/icons/logo-mobile.svg" height={24} width={25} alt="logo" />
          <button
            className="flex items-center gap-1 focus-visible:outline-offset-2 focus:outline-offset-2"
            onClick={() => setIsBoardMenuOpen(!isBoardMenuOpen)}
          >
            Platform Launch
            {/* <span> */}
            <FaChevronDown fill="#635FC7" />
            {/* </span> */}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label="add task"
            className="bg-[#635FC7] flex items-center py-2.5 px-4.5 rounded-3xl focus-visible:outline-offset-2 focus:outline-offset-2"
          >
            <Image src="/assets/icons/icon-add-task-mobile.svg" height={12} width={12} alt="" />
          </button>
          <button aria-label="options menu" className=" flex items-center py-2.5 px-2.5">
            <BsThreeDotsVertical fontSize={25} fill="#828fa3" />
          </button>
        </div>
      </div>
      {isBoardMenuOpen && <BoardSidebar setIsBoardMenuOpen={setIsBoardMenuOpen} />}
    </header>
  );
};

export default Header;
