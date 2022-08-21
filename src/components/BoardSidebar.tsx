import { Switch } from "@headlessui/react";
import Image from "next/image";
import React from "react";
// Transition
interface BoardSidebarProps {
  isBoardMenuOpen: boolean;
  setIsBoardMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  boardsData: any; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
        } backdrop fixed inset-0 z-10 bg-black opacity-30 sm:hidden`}
        onClick={() => setIsBoardMenuOpen(false)}
      ></div>
      <div
        className={`${
          isBoardMenuOpen
            ? // "flex sm:min-w-[320px] sm:border-r sm:border-gray-200 dark:sm:border-gray-700" // ? no transition s min width
              // "flex sm:w-[320px] sm:border-r sm:border-gray-200 dark:sm:border-gray-700"
              "flex sm:w-full sm:border-r sm:border-gray-200 dark:sm:border-gray-700"
            : "sm:w-0"
        } menu-container absolute right-0 left-0 z-20 mx-auto max-w-[20rem] rounded-md bg-white fill-[#828FA3] text-[#828FA3] transition-[width] duration-300 ease-in-out dark:bg-[#2B2C37] sm:relative sm:min-h-full sm:rounded-none `}
      >
        <div
          className={`${
            isBoardMenuOpen ? "flex" : "hidden"
          } menu-content w-full flex-col gap-4 overflow-hidden p-4`}
        >
          <h2 className="mb-2 min-w-max">All boards ({boardsData.length})</h2>
          <ul className="flex flex-col gap-3">
            {boardsData.map((board: any) => {
              // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              // 2: {name: 'Roadmap', columns: Array(3)}
              return (
                <li>
                  <button className="flex min-w-max items-center gap-2">
                    <span>
                      <div>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                        </svg>
                      </div>
                    </span>
                    {board.name}
                  </button>
                </li>
              );
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
          <section
            className="theme-toggle mt-4 flex min-w-max cursor-pointer items-center justify-center gap-6 rounded-md bg-[#F4F7FD] p-4 dark:bg-[#20212C] sm:mt-auto"
            onClick={() => {
              setDarkTheme(!darkTheme);
              if (!darkTheme) {
                localStorage.setItem("theme", "dark");
                console.log("storage save to dark");
              } else {
                // else set light theme
                // setDarkTheme(false);
                localStorage.setItem("theme", "light");
                console.log("storage save to light");
              }
            }}
          >
            {/* Light theme icon */}
            <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 0 1-1.18-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.179 1.178l-1.25-1.25a.833.833 0 0 1 .59-1.422ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 1 1-1.179-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.18 1.178L1.91 3.09a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z" />
            </svg>
            {/* Toggle */}
            <Switch
              onClick={(e: any) => {
                e.stopPropagation(); // prevent 2x local storage save, click -> switch click + div click
              }}
              checked={darkTheme}
              // onChange={() => setDarkTheme((prevDarkTheme) => !prevDarkTheme)}
              // onChange={setDarkTheme}
              onChange={(e: any) => {
                // console.log(e); // boolean
                // e.stopPropagation() // nope
                setDarkTheme(!darkTheme);
                if (!darkTheme) {
                  localStorage.setItem("theme", "dark");
                  console.log("storage save to dark");
                } else {
                  // else set light theme
                  // setDarkTheme(false);
                  localStorage.setItem("theme", "light");
                  console.log("storage save to light");
                }
              }}
              className={`${!darkTheme ? "bg-[#635FC7]" : "bg-[#444298]"}
          relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-offset-8 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Toggle dark theme</span>
              <span
                aria-hidden="true"
                className={`${darkTheme ? "translate-x-[21px]" : "translate-x-0"}
            pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            {/* Dark theme icon */}
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z" />
            </svg>
          </section>
        </div>
      </div>
    </>
  );
};

export default BoardSidebar;
