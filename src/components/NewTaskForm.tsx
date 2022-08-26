import Image from "next/image";
import React from "react";
import Cross from "../assets/icons/cross.svg";
import Plus from "../assets/icons/icon-add-task-mobile.svg";

interface Props {
  isNewTaskFormOpen: boolean;
  setIsNewTaskFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTaskForm = ({ isNewTaskFormOpen, setIsNewTaskFormOpen }: Props) => {
  return (
    <div className={`${isNewTaskFormOpen ? "block max-h-screen" : "hidden"} `}>
      <div
        className={`backdrop fixed inset-0 z-20 bg-black opacity-30`}
        onClick={() => setIsNewTaskFormOpen(false)}
      ></div>
      <section className="new-task-form-container fixed left-0 right-0 z-30 mx-auto mt-20 flex max-h-[80vh] w-11/12 min-w-[20rem] max-w-max  flex-col overflow-y-auto rounded-lg bg-white p-6 text-black dark:bg-[#2B2C37] dark:text-white sm:max-w-md">
        <form className="flex flex-col gap-6 " onSubmit={() => console.log("submit")}>
          <h1 className="text-lg font-bold">Add New Task</h1>
          {/* Title */}
          <div className="relative flex w-full flex-col gap-2 text-white">
            <label htmlFor="Title" className="text-xs font-bold text-medium-grey dark:text-white">
              Title
            </label>
            <input
              id="Title"
              className="peer cursor-pointer rounded px-4 py-2 text-sm text-black outline outline-1 outline-medium-grey/25 transition-colors placeholder:text-black/25 focus:outline-main-purple dark:bg-dark-grey dark:text-white dark:placeholder:text-white/25"
              placeholder="e.g. Take coffee break"
            />
          </div>
          {/* Description */}
          <div
            className="relative flex w-full flex-col gap-2 text-white"
            placeholder="e.g. Take coffee break"
          >
            <label
              htmlFor="Description"
              className="text-xs font-bold text-medium-grey dark:text-white"
            >
              Description
            </label>
            <textarea
              rows={4}
              id="Description"
              className="peer cursor-pointer resize-none rounded px-4 py-2 text-sm text-black outline outline-1 outline-medium-grey/25 transition-colors placeholder:text-black/25 focus:outline-main-purple dark:bg-dark-grey dark:text-white dark:placeholder:text-white/25"
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            />
          </div>
          {/* Subtasks */}
          <div className="subtasks-container flex flex-col gap-3">
            <label
              className="block text-xs font-bold text-medium-grey dark:text-white"
              htmlFor="Subtasks1"
            >
              Subtasks
            </label>
            <div className="flex items-center gap-4">
              <input
                className="peer w-full cursor-pointer rounded bg-transparent py-2 px-4 text-sm text-black outline outline-1 outline-medium-grey/25  placeholder:text-black/25 focus:outline-main-purple dark:text-white dark:placeholder:text-white/25"
                id="Subtasks1"
                type="text"
                placeholder="e.g. Make coffee"
              />
              <div>
                <Cross className="cursor-pointer fill-medium-grey hover:fill-red" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input
                className="peer w-full cursor-pointer rounded bg-transparent py-2 px-4 text-sm text-black outline outline-1 outline-medium-grey/25  placeholder:text-black/25 focus:outline-main-purple dark:text-white dark:placeholder:text-white/25"
                id="Subtasks2"
                type="text"
                placeholder="e.g. Make coffee"
              />
              <div>
                {/* // ? without div overflow cutoff svg ? */}
                <Cross className="flex cursor-pointer fill-medium-grey hover:fill-red" />
              </div>
              {/* <div className="cursor-pointer fill-medium-grey hover:fill-red">
                <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                  <g fill-rule="evenodd">
                    <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"></path>
                    <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"></path>
                  </g>
                </svg>
              </div> */}
            </div>
            {/* Add new subtask - button */}
            <button
              type="button"
              className="flex items-center justify-center gap-1 rounded-3xl bg-main-purple/20 py-2.5 px-4.5 text-center text-sm font-bold text-main-purple hover:bg-main-purple/10 focus:outline-offset-2 focus-visible:outline-offset-2 dark:text-white/90 dark:hover:bg-main-purple/30 "
            >
              <Plus className="fill-red-500" />
              Add New Subtask
            </button>
          </div>
          {/* select options - Status */}
          <div className="relative flex w-full flex-col gap-2 text-white">
            <label htmlFor="status" className="text-xs font-bold text-medium-grey dark:text-white">
              Status
            </label>
            <select
              name="status"
              id="status"
              title="status"
              placeholder="status"
              className="peer cursor-pointer rounded px-4 py-2 text-sm text-black outline outline-1 outline-medium-grey/25 transition-colors placeholder:text-black/25 focus:outline-main-purple dark:bg-dark-grey dark:text-white dark:placeholder:text-white/25"
            >
              <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
          {/* Create button */}
          <button
            type="submit"
            className="flex items-center justify-center rounded-3xl bg-[#635FC7] py-2.5 px-4.5 text-center font-bold text-white hover:bg-[#6e6adf] focus:outline-offset-2 focus-visible:outline-offset-2"
          >
            Create Task
          </button>
        </form>
      </section>
    </div>
  );
};

export default NewTaskForm;
