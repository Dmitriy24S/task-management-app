import React from "react";
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
}

const BoardSidebar = ({
  isBoardMenuOpen,
  setIsBoardMenuOpen,
  setDarkTheme,
  darkTheme,
  boardsData,
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
        className={`${
          isBoardMenuOpen
            ? // "flex sm:min-w-[320px] sm:border-r sm:border-gray-200 dark:sm:border-gray-700" // ? no transition s min width
              // "flex sm:w-[320px] sm:border-r sm:border-gray-200 dark:sm:border-gray-700"
              "flex sm:w-full sm:border-r sm:border-gray-200 dark:sm:border-gray-700"
            : "sm:w-0"
        } menu-container absolute right-0 left-0 z-20 mx-auto mt-20 max-w-[20rem]  overflow-x-hidden rounded-md bg-white fill-[#828FA3] text-[#828FA3] transition-[width] duration-300 ease-in-out dark:bg-[#2B2C37] sm:relative  sm:z-10  sm:mt-0 sm:rounded-none sm:pt-20`}
      >
        {/* sm:min-h-full */}
        {/* max-h-screen */}
        {/* sm:fixed */}
        {/* sm:relative */}
        <div
          className={`${
            isBoardMenuOpen ? "flex" : "hidden"
            //   } menu-content w-full flex-col gap-4 overflow-hidden p-4 sm:fixed`}
          } menu-content w-[320px] max-w-[20rem]  flex-col gap-4 overflow-hidden p-4 sm:fixed sm:min-h-[85%]`}
        >
          <h2 className="mb-2 min-w-max">All boards ({boardsData.length})</h2>
          <ul className="flex flex-col gap-3">
            {/* {boardsData.map((board: BoardColumns) => { */}
            {boardsData.map((board: Board) => {
              // 2: {name: 'Roadmap', columns: Array(3)}
              //   return <SidebarMenuListItem name={board.name} />;
              return <SidebarMenuListItem>{board.name}</SidebarMenuListItem>;
            })}
          </ul>
          {/* Create new board button */}
          <button className="flex min-w-max items-center gap-2">
            <span>
              <div>
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                </svg>
              </div>
            </span>
            + Create New Board
          </button>
          {/* Theme toggle */}
          <ThemeToggle darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        </div>
      </div>
    </>
  );
};

export default BoardSidebar;
