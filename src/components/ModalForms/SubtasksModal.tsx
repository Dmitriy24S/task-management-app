import React from "react";
import Cross from "../../assets/icons/cross.svg";
import { Board, BoardColumns, BoardSubTasks, BoardTasks } from "../../types";
import Modal from "../Shared/Modal";

interface Props {
  // TODO: refactor/update names to 'active modal'?
  isSubtasksOpen: string | null;
  setIsSubtasksOpen: React.Dispatch<React.SetStateAction<string | null>>;
  selectedTask: BoardTasks | null;
  handleSubtaskChange: (task: BoardTasks, subtask: BoardSubTasks) => void;
  handleStatusChange: (newStatus: string, oldStatus: string, task: BoardTasks) => void;
  selectedBoard: Board;
}

const SubtasksModal = ({
  isSubtasksOpen,
  setIsSubtasksOpen,
  selectedTask,
  handleSubtaskChange,
  handleStatusChange,
  selectedBoard,
}: Props) => {
  // console.log({ selectedTask });
  // selectedTask:
  // description: ""
  // status: "Doing"
  // subtasks: (3) [{…}, {…}, {…}]
  // title: "Design settings and search pages"
  return (
    selectedTask && (
      <Modal isOpen={isSubtasksOpen} setIsOpen={setIsSubtasksOpen}>
        <h1 className="text-lg font-bold">{selectedTask.title}</h1>
        <button
          onClick={() => setIsSubtasksOpen(null)}
          className="absolute right-4 top-6 fill-medium-grey p-2 hover:fill-red-main focus-visible:fill-red-main"
          aria-label="close form"
          type="button"
        >
          <Cross />
        </button>
        <p className="text-sm text-medium-grey">
          {selectedTask.description ? selectedTask.description : "No description"}
        </p>
        <div>
          <p className="mt-1 pb-4 text-xs font-bold leading-6 text-[#828fa3]">
            {`${selectedTask?.subtasks.filter((item: BoardSubTasks) => item.isCompleted).length
              } out of
${selectedTask?.subtasks.length} subtasks`}
          </p>
          <div className="subtask-list-container flex flex-col gap-3">
            {selectedTask?.subtasks.map((subtask, index) => {
              return (
                <label
                  htmlFor={subtask.title}
                  key={subtask.title}
                  className="flex cursor-pointer items-center gap-2 rounded bg-light-grey p-4 text-sm dark:bg-very-dark-grey"
                >
                  <input
                    type="checkbox"
                    name={subtask.title}
                    id={subtask.title}
                    checked={subtask.isCompleted}
                    // onChange={() => handleSubtaskChange(selectedTask)}
                    onChange={() => {
                      console.log("index click:", index); // index click: 0
                      handleSubtaskChange(selectedTask, subtask);
                    }}
                  // onChange={() =>
                  //   handleSubtaskChange({
                  //     ...selectedTask,
                  //     subtasks: [
                  //       ...selectedTask.subtasks,
                  //       { ...subtask, isCompleted: !subtask.isCompleted },
                  //     ],
                  //   })
                  // }
                  // Warning: You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`
                  />
                  <div className="checkbox"></div>
                  <span>{subtask.title}</span>
                </label>
              );
            })}
          </div>
        </div>
        {/* Status */}
        <div>
          <div className="relative flex w-full flex-col gap-3 text-white">
            <label htmlFor="status" className="text-xs font-bold text-medium-grey dark:text-white">
              Current Status
            </label>
            <select
              name="status"
              id="status"
              title="status"
              placeholder="status"
              className="peer cursor-pointer appearance-none rounded px-4 py-2 text-sm text-black outline outline-1 outline-medium-grey/25 transition-colors placeholder:text-black/25 focus:outline-main-purple dark:bg-dark-grey dark:text-white dark:placeholder:text-white/25"
              value={selectedTask.status} // show status according to openend task
              onChange={(e) => {
                // console.log(e.target.value); // 'Todo' / 'Doing' / etc...
                handleStatusChange(e.target.value, selectedTask.status, selectedTask);
              }}
            >
              {/* show available task status according to current selected board */}
              {selectedBoard.columns.map((column) => {
                return (
                  <option key={column.name} value={`${column.name}`}>
                    {column.name}
                  </option>
                );
              })}
              {/* <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option> */}
            </select>
            {/* Arrow */}
            <svg
              stroke="currentColor"
              fill="#635FC7"
              strokeWidth="0"
              viewBox="0 0 448 512"
              className="pointer-events-none absolute right-2.5 bottom-2.5"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
            </svg>
          </div>
        </div>
      </Modal>
    )
  );
};

export default SubtasksModal;
