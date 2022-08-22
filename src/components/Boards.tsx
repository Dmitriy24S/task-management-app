import { Transition } from "@headlessui/react";
import React from "react";
import BoardSidebar from "./BoardSidebar";

interface HeaderProps {
  isBoardMenuOpen: boolean;
  setIsBoardMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  boardsData: any; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  selectedBoard: any; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

const Boards = ({
  isBoardMenuOpen,
  setIsBoardMenuOpen,
  darkTheme,
  setDarkTheme,
  boardsData,
  selectedBoard,
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
        className={`relative min-h-full w-full overflow-x-scroll bg-[#F4F7FD] px-4 pb-24 pt-24 transition-transform duration-300 dark:bg-[#20212C] dark:text-white`}
      >
        <div className="mx-auto grid w-11/12 grid-flow-col justify-center gap-4 px-4">
          {/* // ?  mr-40 margin right for spacing on horizontal right scroll? */}
          {/* Boards */}
          {selectedBoard.columns.map((column: any, index: number) => {
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            return (
              <>
                <section
                  className={`flex min-w-[20rem] max-w-[22rem] flex-col gap-4 ${
                    index === selectedBoard.columns.length - 1 ? "pr-4" : ""
                  }`}
                >
                  <h2>{column.name}</h2>
                  {column.tasks.map((task: any) => {
                    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    return (
                      <article
                        className={`rounded-lg bg-white p-4 text-black shadow-md dark:bg-[#2B2C37] dark:text-white`}
                      >
                        <h3>{task.title}</h3>
                        <p className="text-[#828fa3]">
                          {/* // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                          {`${task.subtasks.filter((item: any) => item.isCompleted).length} out of
                      ${task.subtasks.length}`}
                        </p>
                      </article>
                    );
                  })}
                </section>
              </>
            );
          })}
        </div>
      </section>
      {/* </Transition> */}
    </div>
  );
};

export default Boards;
