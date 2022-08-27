import React from "react";
import { BoardSubTasks, BoardTasks } from "../../types";

interface SubtasksProps {
  task: BoardTasks;
}

// const Subtasks = ({ task }: BoardTasks) => { // !!!! ????
const Subtasks = ({ task }: SubtasksProps) => {
  // console.log(task);
  // {title: 'Competitor analysis', description: '', status: 'Done', subtasks: Array(2)}
  return (
    <article
      // className={`rounded-lg bg-white p-4 text-black shadow-md dark:bg-[#2B2C37] dark:text-white`}
      className={`group cursor-pointer rounded-lg bg-white p-4 text-black shadow-task dark:bg-[#2B2C37] dark:text-white`}
    >
      <h3 className="font-bold group-hover:text-main-purple">{task.title}</h3>
      <p className="mt-1 text-xs font-bold text-[#828fa3]">
        {`${task.subtasks.filter((item: BoardSubTasks) => item.isCompleted).length} out of
${task.subtasks.length} subtasks`}
      </p>
    </article>
  );
};

export default Subtasks;
