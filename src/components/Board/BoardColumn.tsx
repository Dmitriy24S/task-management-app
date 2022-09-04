import React from "react";
import { Board, BoardColumns, BoardTasks } from "../../types";

interface Props {
  // children: any; // !!!!!
  // children: JSX.Element; // !!!!!
  // children: JSX.Element | JSX.Element[]; // !!!!!
  children: React.ReactNode;
  index: number;
  selectedBoard: Board;
}

const BoardColumn = ({ children, index, selectedBoard }: Props) => {
  return (
    <section
      className={`flex w-[22rem] flex-col gap-4 last:pr-4`}
      // spacing to right of main board for view with x-overflow scroll
      // ${ index === selectedBoard.columns.length - 1 ? "pr-4" : "" }
    >
      {children}
    </section>
  );
};

export default BoardColumn;
