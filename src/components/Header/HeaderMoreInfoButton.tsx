import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Props {
  selectedBoardName: string;
  // handleDeleteBoard: (selectedBoardName: string) => void;
}

const HeaderMoreInfoButton = ({
  selectedBoardName,
}: // handleDeleteBoard
Props) => {
  return (
    <div
      className="dropdown-end group dropdown cursor-pointer rounded-md p-2 focus-visible:outline"
      tabIndex={0}
    >
      <BsThreeDotsVertical
        fontSize={25}
        fill="#828fa3"
        className="group-hover:fill-black dark:group-hover:fill-white/80"
      />
      <ul className="dropdown-content menu rounded-box m-3 flex w-52 cursor-default flex-col gap-1 bg-base-100 bg-white p-4 shadow-task shadow focus:outline-0 dark:bg-[#2B2C37] dark:text-white">
        <li>
          <button className="font-semibold text-dark-grey/70 hover:bg-indigo-500 hover:text-white focus-visible:bg-indigo-500 focus-visible:text-white dark:text-white/70 dark:hover:text-white dark:focus-visible:text-white">
            Edit Board
          </button>
        </li>
        <li>
          <button
            className="font-bold text-red-main hover:bg-red-600 hover:text-white focus-visible:bg-red-600 focus-visible:text-white"
            onClick={() => {
              // handleDeleteBoard(selectedBoardName)
            }}
          >
            Delete Board
          </button>
        </li>
      </ul>
    </div>
  );
};

export default HeaderMoreInfoButton;
