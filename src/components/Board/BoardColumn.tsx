import React from "react";
import { DragDropContext, DragUpdate, Droppable, DropResult } from 'react-beautiful-dnd';
import { Board, BoardColumns, BoardTasks } from "../../types";

interface Props {
  children: React.ReactNode;
  index: number;
  selectedBoard: Board;
  ref?: any
  provided?: any
}

const BoardColumn = ({ children, index, selectedBoard, provided, ref }: Props) => {
  return (
    <section
      className={`flex w-[22rem] flex-col gap-4 mr-4`}
    // spacing to right of main board for view with x-overflow scroll
    // ${ index === selectedBoard.columns.length - 1 ? "pr-4" : "" }
    >
      {children}
    </section>
  );
};

export default BoardColumn;
