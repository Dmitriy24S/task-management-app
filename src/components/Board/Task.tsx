import dynamic from 'next/dynamic';
import React from "react";
import { BoardColumns, BoardSubTasks, BoardTasks } from "../../types";

interface TaskProps {
  task: BoardTasks;
  setActiveModalName: React.Dispatch<React.SetStateAction<string | null>>;
  showSubtasks: (task: BoardTasks, column: BoardColumns) => void;
  column: BoardColumns;
  index: number
  // isDragging: boolean

}
const Draggable = dynamic(
  async () => {
    const mod = await import('react-beautiful-dnd');
    return mod.Draggable;
  },
  { ssr: false },
);

const Task = ({ task, setActiveModalName, showSubtasks, column, index,
  // isDragging
}: TaskProps) => {
  // {title: 'Competitor analysis', description: '', status: 'Done', subtasks: Array(2)}
  return (
    <Draggable draggableId={task.title} index={index}>
      {(provided, snapshot) =>
        <article
          className={`group mb-4 cursor-pointer rounded-lg bg-white p-4 text-black shadow-task dark:bg-[#2B2C37] dark:text-white`}
          onClick={() => showSubtasks(task, column)}
          // (3) [{…}, {…}, {…}]
          // 0: {title: 'Settings - Account page', isCompleted: true}
          // 1: {title: 'Settings - Billing page', isCompleted: true}
          // 2: {title: 'Search page', isCompleted: false}
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3 className="font-bold group-hover:text-main-purple">{task.title}</h3>
          <p className="mt-1 text-xs font-bold text-[#828fa3]">
            {`${task.subtasks.filter((item: BoardSubTasks) => item.isCompleted).length} out of
${task.subtasks.length} subtasks`}
          </p>
        </article>
      }
    </Draggable>
  );
};

export default Task;
