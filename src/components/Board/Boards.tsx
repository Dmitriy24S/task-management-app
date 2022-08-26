import { Transition } from "@headlessui/react";
import React from "react";
import ShowSidebarSVG from "../../assets/icons/sidebar-show.svg";
import { Board, BoardColumns, BoardSubTasks, BoardTasks } from "../../types";
import NewTaskForm from "../NewTaskForm";
import BoardSidebar from "../Sidemenu/BoardSidebar";
import BoardColumn from "./BoardColumn";
import Subtasks from "./Subtasks";

interface HeaderProps {
  isBoardMenuOpen: boolean;
  setIsBoardMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  // boardsData: BoardColumns[];
  boardsData: Board[];
  selectedBoard: Board;
  isNewTaskFormOpen: boolean;
  setIsNewTaskFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Boards = ({
  isBoardMenuOpen,
  setIsBoardMenuOpen,
  darkTheme,
  setDarkTheme,
  boardsData,
  selectedBoard,
  isNewTaskFormOpen,
  setIsNewTaskFormOpen,
}: HeaderProps) => {
  return (
    <div className="relative flex min-h-full min-w-full flex-grow dark:bg-[#2B2C37]">
      <BoardSidebar
        isBoardMenuOpen={isBoardMenuOpen}
        setIsBoardMenuOpen={setIsBoardMenuOpen}
        setDarkTheme={setDarkTheme}
        darkTheme={darkTheme}
        boardsData={boardsData}
        selectedBoard={selectedBoard}
      />
      {/* Open sidebar desktop */}
      {/* {!isBoardMenuOpen && ( )} */}
      <button
        aria-label="show sidebar menu"
        className={`${
          isBoardMenuOpen ? "invisible opacity-0 duration-300" : "visible opacity-100 duration-700"
        } fixed left-0 bottom-12 z-10 flex rounded-r-full bg-[#635FC7] p-4 pr-5 transition-opacity  hover:bg-[#736fe6]`}
        onClick={() => setIsBoardMenuOpen(true)}
      >
        <ShowSidebarSVG />
      </button>

      {/* Main board container list */}
      <section
        // className={`${
        //   isBoardMenuOpen ? "translate-x-[320px]" : "translate-x-0"
        // } relative min-h-full w-full bg-[#F4F7FD] p-4 transition-transform duration-300 dark:bg-[#20212C] dark:text-white`}
        className={`main-container relative min-h-full w-full overflow-x-auto bg-[#F4F7FD] px-6 pb-24 pt-24 transition-transform duration-300 dark:bg-[#20212C] dark:text-white`}
      >
        <div className="board-list mx-auto grid w-11/12 min-w-fit grid-flow-col justify-center gap-4">
          {/* // ?  mr-40 margin right for spacing on horizontal right scroll? */}
          {/* Boards columns */}
          {selectedBoard.columns.map((column: BoardColumns, index: number) => {
            // console.log(column);
            // {name: 'Todo', tasks: Array(4)}
            return (
              <BoardColumn index={index} selectedBoard={selectedBoard}>
                <h2>{column.name}</h2>
                {column.tasks.map((task: BoardTasks) => {
                  return <Subtasks task={task} />;
                })}
              </BoardColumn>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Boards;
