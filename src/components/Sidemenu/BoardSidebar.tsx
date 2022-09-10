import Image from "next/image";
import React from "react";
// import { ReactComponent as HideSidebarSVG } from "../../assets/icons/sidebar-hide.svg";
import PlusSvg from "../../assets/icons/icon-add-task-mobile.svg";
import HideSidebarSVG from "../../assets/icons/sidebar-hide.svg";
import { Board } from "../../types";
import SidebarMenuListItem from "./SidebarMenuListItem";
import ThemeToggle from "./ThemeToggle";

interface BoardSidebarProps {
  isBoardMenuOpen: boolean;
  setIsBoardMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  //   boardsData: BoardColumns[];
  boardsData: Board[];
  selectedBoard: Board;
  handleSwitchSelectBoard: (boardName: string) => void;
  setActiveModalName: React.Dispatch<React.SetStateAction<string | null>>;
}

const BoardSidebar = ({
  isBoardMenuOpen,
  setIsBoardMenuOpen,
  setDarkTheme,
  darkTheme,
  boardsData,
  selectedBoard,
  handleSwitchSelectBoard,
  setActiveModalName,
}: BoardSidebarProps) => {
  return (
    <>
      <div
        className={`${
          isBoardMenuOpen ? "block" : "hidden"
        } backdrop fixed inset-0 z-20 bg-black opacity-30 sm:hidden`}
        onClick={() => setIsBoardMenuOpen(false)}
      ></div>
      <div
        className={`menu-container ${
          isBoardMenuOpen
            ? // "flex sm:min-w-[320px] sm:border-r sm:border-gray-200 dark:sm:border-gray-700" // ? no transition s min width
              // "flex sm:w-[320px] sm:border-r sm:border-gray-200 dark:sm:border-gray-700"
              "flex sm:w-full sm:border-r sm:border-gray-200 dark:sm:border-gray-700"
            : "invisible sm:flex sm:w-0"
        } fixed right-0 left-0 z-20 mx-auto mt-20 max-w-[20rem]  overflow-x-hidden rounded-md bg-white fill-[#828FA3] text-[#828FA3] transition-[width] duration-300 ease-in-out dark:bg-[#2B2C37] sm:relative sm:z-10 sm:mt-0 sm:rounded-none sm:pt-20`}
      >
        {/* sm:min-h-full */}
        {/* max-h-screen */}
        {/* sm:fixed */}
        {/* sm:relative */}
        <div
          className={`menu-content ${
            isBoardMenuOpen ? "visible flex opacity-100" : "invisible flex opacity-0"
            //   } menu-content w-full flex-col gap-4 overflow-hidden p-4 sm:fixed`}
          }  w-[320px] max-w-[20rem] flex-col gap-4 font-semibold sm:fixed sm:min-h-[85%] sm:transition-all sm:duration-300`}
        >
          {/* overflow-y-auto	overflow-x-hidden */}
          {/* overflow-hidden */}
          <h2 className="mb-2 min-w-max p-4 pb-0 text-sm uppercase tracking-wide">
            All boards ({boardsData.length})
          </h2>
          <ul className="flex flex-col gap-2 sm:mr-8">
            {/* {boardsData.map((board: BoardColumns) => { */}
            {boardsData.map((board: Board) => {
              // 2: {name: 'Roadmap', columns: Array(3)}
              //   return <SidebarMenuListItem name={board.name} />;
              // console.log(board.name);
              return (
                <SidebarMenuListItem
                  key={board.name}
                  selectedBoard={selectedBoard}
                  // className={`${board.name === selectedBoard.name ? "bg-violet-700" : ""}`}
                  handleSwitchSelectBoard={handleSwitchSelectBoard}
                >
                  {board.name}
                </SidebarMenuListItem>
              );
            })}
          </ul>

          {/* Create new board button */}
          <button
            className="group flex min-w-max items-center p-4 text-[#6f6de0] hover:bg-[#6766ad22] sm:mr-8 sm:rounded-r-full"
            onClick={() => setActiveModalName("newBoardFormModal")}
          >
            {/* Plus svg */}
            <span>
              <div>
                <svg
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 fill-[#6f6de0]"
                >
                  <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                </svg>
              </div>
            </span>
            {/* <span className="mr-1 pb-1">+</span>  */}
            {/* <Image src="/assets/icons/icon-add-task-mobile.svg" height={12} width={12} alt="" /> */}
            {/* <PlusSvg className="mr-1 fill-white" /> */}
            <PlusSvg className="mr-1 fill-[#6f6de0] text-[#6f6de0] group-hover:fill-[#6f6de0]" />
            Create New Board
          </button>

          {/* Theme toggle */}
          <ThemeToggle darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          {/* Hide sidebar button */}
          <button
            className="hover:fill-[hover:text-[#635fc7] group mt-4 hidden items-center gap-4 rounded-r-full p-4 hover:bg-violet-100 hover:text-[#635fc7] dark:hover:bg-[#20212C] sm:mr-8 sm:flex"
            onClick={() => setIsBoardMenuOpen(false)}
          >
            {/* <Image
              src={`/assets/icons/sidebar-hide.svg`}
              height={16}
              width={18}
              layout="fixed"
              alt="logo"
              priority
              // color="#e5e7eb"
              // className="fill-red-500"
            /> */}
            {/* <HideSidebarSVG className="group-hover:fill-main-purple" /> */}
            <HideSidebarSVG className="group-hover:fill-[#635fc7] group-hover:text-[#635fc7]" />
            {/* <HideSidebarSVG className=" group-hover:text-[#635fc7]" /> */}
            Hide sidebar
          </button>
        </div>
      </div>
    </>
  );
};

export default BoardSidebar;
