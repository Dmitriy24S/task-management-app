import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa";
import * as yup from "yup";
import Cross from "../assets/icons/cross.svg";
import Plus from "../assets/icons/icon-add-task-mobile.svg";
import { Board, BoardColumns } from "../types";
import Modal from "./Modal";

interface Props {
  isNewTaskFormOpen: boolean;
  setIsNewTaskFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBoard: React.Dispatch<React.SetStateAction<Board>>;
  selectedBoard: Board;
}

const formSchema = yup.object({
  taskTitle: yup
    .string()
    .trim()
    .min(4, "Title must be at least 4 characters")
    .max(20, "Title must be at most 20 characters")
    // .matches(/^[a-zA-Z0-9 ]+$/, "only letters and numbers")
    .required("Title is required"),
  taskDescription: yup
    .string()
    .trim()
    .min(4, "Description must be at least 4 characters")
    .max(100, "Description must be at most 100 characters")
    // .matches(/^[a-zA-Z0-9 ]+$/, "only letters and numbers")
    .required("Description is required"),
  // items array start
  subtasks: yup
    .array()
    .of(
      yup.object().shape({
        subtasktitle: yup
          .string()
          .trim()
          .min(4, "Subtask name must be at least 4 characters")
          .max(20, "Subtask name must be at most 20 characters")
          .matches(/^[a-zA-Z0-9 ]+$/, "only letters and numbers")
          .required(),
      })
      // .minLength(1, "Minimum 1 item") // no
      // .required() // no
    )
    .min(1, "Cannot be empty") // ? works
    .required("Subtasks are required"),
  // items array end
  taskStatus: yup.string().required("Status is required"),
});

interface FormTypes {
  taskTitle: string;
  taskDescription: string;
  subtasks: { subtasktitle: string }[];
  taskStatus: string;
}

const NewTaskFormModal = ({
  isNewTaskFormOpen,
  setIsNewTaskFormOpen,
  setSelectedBoard,
  selectedBoard,
}: Props) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState,
    formState: { isSubmitSuccessful, errors },
  } = useForm<FormTypes>({
    defaultValues: {
      // items: [{ name: "default Value" }]
      subtasks: [{ subtasktitle: "" }, { subtasktitle: "" }],
      // show two default empty fields for subtasks input
    },
    resolver: yupResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({ name: "subtasks", control }); // ability to add/remove subtasks
  // const watchFields = watch("subtasks"); // target specific field by their names
  // console.log(watchFields); // track input changes subtasks array names inside form
  // const statusSelectCheck = watch("taskStatus");
  // console.log({ statusSelectCheck });

  // Handle submit new task
  const onSubmit = (data: FormTypes) => {
    console.log("form submit data:", data);
    // {subtasks: Array(2), taskTitle: 'asdasd', taskDescription: 'asdadas'}
    // subtasks: Array(2)
    // 0: {subtasktitle: 'sadada'}
    // 1: {subtasktitle: 'sdfsdsdfsasdada'}
    // length: 2
    // [[Prototype]]: Array(0)
    // taskDescription: "asdadas"
    // taskTitle: "asdasd"

    const newTask = {
      title: data.taskTitle,
      description: data.taskDescription,
      status: data.taskStatus,
      subtasks: data.subtasks.map((item) => {
        return {
          title: item.subtasktitle,
          isCompleted: false,
        };
      }),
    };

    setSelectedBoard({
      ...selectedBoard,
      columns: selectedBoard.columns.map((column: BoardColumns) => {
        if (column.name === data.taskStatus) {
          const updatedTasks = [...column.tasks, newTask];
          // console.log({ updatedTasks });
          // updatedTasks: Array(5)
          // 0: {title: 'Build UI for onboarding flow', description: '', status: 'Todo', subtasks: Array(3)}
          // 1: {title: 'Build UI for search', desc...
          return { ...column, tasks: updatedTasks };
        }
        return column;
      }),
    });

    // reset({ ...data }); // ! not work reset w/ {...data}

    // close new task form window/modal
    setIsNewTaskFormOpen(false);
  };

  // Reset form inputs on submit
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      // reset({ ...data });
      reset({
        taskTitle: "",
        taskDescription: "",
        subtasks: [{ subtasktitle: "" }, { subtasktitle: "" }],
        taskStatus: "",
      });
    }
    // }, [formState, submittedData, reset]);
  }, [formState, reset]);

  return (
    // old modal:
    // <div className={`${isNewTaskFormOpen ? "block max-h-screen" : "hidden"} `}>
    //   <div
    //     className={`backdrop fixed inset-0 z-20 bg-black opacity-30`}
    //     onClick={() => setIsNewTaskFormOpen(false)}
    //   ></div>
    //   <section className="new-task-form-container fixed left-0 right-0 z-30 mx-auto mt-20 flex max-h-[80vh] w-11/12 min-w-[20rem] max-w-max flex-col overflow-y-auto rounded-lg bg-white p-6 text-black dark:bg-[#2B2C37] dark:text-white sm:max-w-md">

    // new refactor into Modal component:
    <Modal isOpen={isNewTaskFormOpen} setIsOpen={setIsNewTaskFormOpen}>
      <form
        className="relative flex flex-col gap-6"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <button
          onClick={() => setIsNewTaskFormOpen(false)}
          className="absolute right-0 top-0 fill-medium-grey p-2 hover:fill-red-main focus-visible:fill-red-main"
          aria-label="close form"
          type="button"
        >
          <Cross />
        </button>
        <h1 className="text-lg font-bold">Add New Task</h1>
        {/* Title */}
        <div className="relative flex w-full flex-col gap-2 text-white">
          <label
            htmlFor="task-title"
            className="text-xs font-bold text-medium-grey dark:text-white"
          >
            Title
          </label>

          <input
            type="text"
            id="task-title"
            className="peer cursor-pointer rounded px-4 py-2 text-sm text-black outline outline-1 outline-medium-grey/25 transition-colors placeholder:text-black/25 focus:outline-main-purple dark:bg-dark-grey dark:text-white dark:placeholder:text-white/25"
            placeholder="e.g. Take coffee break"
            {...register("taskTitle")}
            // autoFocus
          />
          {errors.taskTitle && (
            <p className="form-message text-sm text-red-main">{errors.taskTitle?.message}</p>
          )}
        </div>
        {/* Description */}
        <div
          className="relative flex w-full flex-col gap-2 text-white"
          placeholder="e.g. Take coffee break"
        >
          <label
            htmlFor="task-description"
            className="text-xs font-bold text-medium-grey dark:text-white"
          >
            Description
          </label>
          <textarea
            rows={4}
            id="task-description"
            className="peer cursor-pointer resize-none rounded px-4 py-2 text-sm text-black outline outline-1 outline-medium-grey/25 transition-colors placeholder:text-black/25 focus:outline-main-purple dark:bg-dark-grey dark:text-white dark:placeholder:text-white/25"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            {...register("taskDescription")}
          />
          {errors.taskDescription && (
            <p className="form-message text-sm text-red-main">{errors.taskDescription?.message}</p>
          )}
        </div>
        {/* Subtasks list container - start */}
        <div className="subtasks-container flex flex-col gap-3">
          <label
            className="block text-xs font-bold text-medium-grey dark:text-white"
            htmlFor="subtask0"
          >
            Subtasks
          </label>

          {/* show error if empty subtasks (all removed) - 'Cannot be empty' */}
          {/* {errors.subtasks && (
            <p className="form-message text-sm text-red">{errors.subtasks.message}</p>
          )} */}
          {/* // ? comment out -> prevent deletion of last subtask input in function with fields.length check, otherwise appears extra spacing for empty error div inbetween label and input */}

          {/* Subtasks list */}
          {fields?.map((_item, index) => {
            const fieldName = `subtasks[${index}]`;
            return (
              // Subtask
              // <>
              <fieldset
                className="subtask flex items-center gap-1"
                name={fieldName}
                key={fieldName}
              >
                <input
                  type="text"
                  id={`subtask${index}`}
                  className="peer w-full cursor-pointer rounded bg-transparent py-2 px-4 text-sm text-black outline outline-1 outline-medium-grey/25  placeholder:text-black/25 focus:outline-main-purple dark:text-white dark:placeholder:text-white/25"
                  placeholder="e.g. Make coffee"
                  {...register(`subtasks.${index}.subtasktitle`)}
                  name={`subtasks.${index}.subtasktitle`}
                />
                <button
                  type="button"
                  onClick={() => {
                    // prevent deleting last subtask input, keep atleast one
                    if (fields.length > 1) {
                      remove(index);
                    }
                  }}
                  className="block h-full fill-medium-grey p-2 hover:fill-red-main focus-visible:fill-red-main"
                >
                  {/* // ? without div/button overflow cutoff svg ? */}
                  <Cross />
                </button>
                {/* put inside for spacing fix? / for single .map return item with key={} */}
                {errors.subtasks?.[index]?.subtasktitle && (
                  <p className="form-message text-sm text-red-main">
                    {errors.subtasks?.[index]?.subtasktitle?.message}
                  </p>
                )}
              </fieldset>
              // {/* {errors.subtasks?.[index]?.subtasktitle && (
              //    <p className="form-message text-sm text-red-main">
              //     {errors.subtasks?.[index]?.subtasktitle?.message}
              //     </p>
              // )} */}
              // </>
            );
          })}
          {/* Subtasks list container - end */}

          {/* Add new subtask - button */}
          <button
            type="button"
            className="mt-1.5 flex items-center justify-center gap-1 rounded-3xl bg-main-purple/20 py-2.5 px-4.5 text-center text-sm font-bold text-main-purple hover:bg-main-purple/10 focus:outline-offset-2 focus-visible:outline-offset-2 dark:text-white/90 dark:hover:bg-main-purple/30"
            onClick={() => {
              append({ subtasktitle: "" });
            }}
          >
            <Plus />
            Add New Subtask
          </button>
        </div>

        {/* Select options - Status */}
        <div className="relative flex w-full flex-col gap-2 text-white">
          <label htmlFor="status" className="text-xs font-bold text-medium-grey dark:text-white">
            Status
          </label>
          <select
            id="status"
            title="status"
            // value=""
            defaultValue=""
            // placeholder="status"
            // name="status"
            {...register("taskStatus")}
            className="peer cursor-pointer appearance-none rounded px-4 py-2 text-sm text-black outline outline-1 outline-medium-grey/25 transition-colors placeholder:text-black/25 focus:outline-main-purple dark:bg-dark-grey dark:text-white dark:placeholder:text-white/25"
          >
            <option value="">Select an Option</option>
            {/* show available task status according to current selected board */}
            {selectedBoard?.columns.map((column) => {
              return (
                <option key={column.name} value={`${column.name}`}>
                  {column.name}
                </option>
              );
            })}
            {/* <option value="" disabled hidden> */}
            {/* <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option> */}
          </select>
          <FaChevronDown
            fill="#635FC7"
            className="pointer-events-none absolute right-2.5 bottom-2.5"
          />
        </div>
        {errors.taskStatus && (
          <p className="form-message text-sm text-red-main">{errors.taskStatus?.message}</p>
        )}
        {/* Create button */}
        <button
          type="submit"
          className="flex items-center justify-center rounded-3xl bg-[#635FC7] py-2.5 px-4.5 text-center font-bold text-white hover:bg-[#6e6adf] focus:outline-offset-2 focus-visible:outline-offset-2"
        >
          Create Task
        </button>
      </form>
      {/* </section> */}
      {/* </div> */}
    </Modal>
  );
};

export default NewTaskFormModal;
