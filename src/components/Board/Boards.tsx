import { Transition } from "@headlessui/react";
import React from "react";
import ShowSidebarSVG from "../../assets/icons/sidebar-show.svg";
import { Board, BoardColumns, BoardSubTasks, BoardTasks } from "../../types";
import NewTaskForm from "../NewTaskForm";
import BoardSidebar from "../Sidemenu/BoardSidebar";
import BoardColumn from "./BoardColumn";
import Task from "./Task";

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
  setIsSubtasksOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showSubtasks: (task: BoardTasks, column: BoardColumns) => void;
  handleSwitchSelectBoard: (boardName: string) => void;
}

const generateColumnColor = (index: number) => {
  const colors = ["#49C4E5", "#8471F2", "#67E2AE", "#e5a449"];
  if (colors[index]) {
    return colors[index];
  } else {
    // index % arr.length - will loop colors?
    // console.log(generateColumnColor(5)); // #8471F2 //  hsl(216, 80%, 70%)
    let rand = Math.random();
    console.log(rand, "1"); // 0.5983916920571346 '1'
    rand = Math.floor(rand * 360);
    console.log(rand, "2"); // 215 '2'
    rand = rand + 1;
    console.log(rand, "3"); // 216 '3'
    const randomColor = `hsl(${rand}, 80%, 70%)`; // hsl(216, 80%, 70%)
    return randomColor; // #8471F2 //  hsl(216, 80%, 70%)
  }
};

const Boards = ({
  isBoardMenuOpen,
  setIsBoardMenuOpen,
  darkTheme,
  setDarkTheme,
  boardsData,
  selectedBoard,
  isNewTaskFormOpen,
  setIsNewTaskFormOpen,
  setIsSubtasksOpen,
  showSubtasks,
  handleSwitchSelectBoard,
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
        handleSwitchSelectBoard={handleSwitchSelectBoard}
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
        <div className="board-list mx-auto grid h-full w-11/12 min-w-fit grid-flow-col justify-center gap-4">
          {/* // ?  mr-40 margin right for spacing on horizontal right scroll? */}
          {/* Boards columns */}
          {selectedBoard.columns.map((column: BoardColumns, index: number) => {
            // console.log(column);
            // {name: 'Todo', tasks: Array(4)}
            return (
              <BoardColumn index={index} selectedBoard={selectedBoard} key={column.name}>
                {/* Title */}
                <h2 className="flex items-center gap-3">
                  {/* {column.name === "Todo" ? (
                    <div className="h-4 w-4 rounded-full bg-[rgba(73,196,229,1)]"></div>
                  ) : column.name === "Doing" ? (
                    <div className="h-4 w-4 rounded-full bg-[rgba(132,113,242,1)]"></div>
                  ) : (
                    <div className="h-4 w-4 rounded-full bg-[rgba(103,226,174,1)]"></div>
                  )} */}
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: generateColumnColor(index) }}
                  ></div>
                  {column.name}
                </h2>
                <div
                  className={`tasks-container flex flex-col gap-4 ${
                    column.tasks.length === 0
                      ? "h-full rounded-lg border-2 border-dashed border-gray-600"
                      : ""
                  }`}
                >
                  {/* Task */}
                  {column.tasks.map((task: BoardTasks) => {
                    return (
                      <Task
                        task={task}
                        key={task.title}
                        setIsSubtasksOpen={setIsSubtasksOpen}
                        showSubtasks={showSubtasks}
                        column={column}
                      />
                    );
                  })}
                </div>
              </BoardColumn>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Boards;
