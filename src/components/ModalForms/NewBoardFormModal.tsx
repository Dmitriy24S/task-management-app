import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import Cross from "../../assets/icons/cross.svg";
import Plus from "../../assets/icons/icon-add-task-mobile.svg";
import Modal from "../Shared/Modal";

// TODO: refactor buttons into separate component? */

interface FormTypes {
  boardName: string;
  columns: { name: string }[];
}

const formSchema = yup.object({
  boardName: yup
    .string()
    .trim()
    .min(4, "Name must be at least 4 characters")
    .max(20, "Name must be at most 20 characters")
    // .matches(/^[a-zA-Z0-9 ]+$/, "only letters and numbers")
    .required("Name is required"),
  columns: yup
    .array()
    .of(
      yup.object().shape({
        name: yup
          .string()
          .trim()
          .min(4, "Name must be at least 4 characters")
          .max(20, "Name must be at most 20 characters")
          // .matches(/^[a-zA-Z0-9 ]+$/, "only letters and numbers")
          .required("Name is required"), // ?
      })
    )
    .min(1, "Cannot be empty") // ?
    .max(4, "Max 4")
    .required("Column names are required"), // ?
});

interface Props {
  isNewBoardFormOpen: string | null;
  setIsNewBoardFormOpen: React.Dispatch<React.SetStateAction<string | null>>;
  handleAddNewBoard: (boardName: string, columnsNames: { name: string }[]) => void;
}

const NewBoardFormModal = ({
  isNewBoardFormOpen,
  setIsNewBoardFormOpen,
  handleAddNewBoard,
}: Props) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormTypes>({
    mode: "onChange",
    defaultValues: {
      boardName: "",
      columns: [{ name: "" }],
    },
    resolver: yupResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({ name: "columns", control });

  // Reset form inputs on render?
  useEffect(() => {
    reset({
      boardName: "",
      columns: [{ name: "" }],
    });
  }, [isNewBoardFormOpen]);

  return (
    <Modal isOpen={isNewBoardFormOpen} setIsOpen={setIsNewBoardFormOpen}>
      {/* // TODO: refactor? */}
      {isNewBoardFormOpen === "newBoardFormModal" && (
        <form
          className="relative flex flex-col gap-6"
          onSubmit={handleSubmit((data) => {
            // console.log(data);
            // {boardName: '1234', columns: Array(1)}
            // boardName: "1234"
            // columns: Array(1)
            // 0: {name: 'qwert'}

            // console.log(data.boardName, data.columns);
            // 1111
            // (2) [{…}, {…}]
            // ... 0: {name: '2222'}
            // ... 1: {name: '3333'}

            // TODO: refactor?
            handleAddNewBoard(data.boardName, data.columns);
          })}
        >
          <button
            type="button"
            aria-label="close form"
            className="absolute right-0 top-0 fill-medium-grey p-2 hover:fill-red-main focus-visible:fill-red-main"
            // onClick={() => setIsNewBoardFormOpen(false)}
            onClick={() => setIsNewBoardFormOpen(null)}
          >
            <Cross />
          </button>
          <h1 className="text-lg font-bold">Add New Board</h1>
          <div className="relative flex w-full flex-col gap-2 text-white">
            <label
              htmlFor="board-name"
              className="text-xs font-bold text-medium-grey dark:text-white"
            >
              Board Name
            </label>
            <input
              type="text"
              id="board-name"
              placeholder="Board Name"
              className="cursor-pointer rounded px-4 py-2 text-sm text-medium-grey outline outline-1 outline-medium-grey/25 transition-colors placeholder:text-black/25 focus:outline-main-purple dark:bg-dark-grey dark:placeholder:text-white/25"
              // todo: rhf register
              {...register("boardName")}
            />
            {/* // todo: rhf errors */}
            {errors.boardName && (
              <p className="form-message text-sm text-red-main">{errors.boardName?.message}</p>
            )}
          </div>

          {/* Columns list -start*/}
          <div className="columns-container flex flex-col gap-3">
            <label
              htmlFor="column-name"
              className="text-xs font-bold text-medium-grey dark:text-white"
            >
              Columns
            </label>
            {/* // todo: rhf fields array */}
            {/* <div
              className="column-input-container flex flex-col gap-3"
              // key
            >
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  id="column-name"
                  placeholder="Column Name"
                  className="w-full cursor-pointer rounded bg-transparent py-2 px-4 text-sm text-medium-grey outline outline-1 outline-medium-grey/25 placeholder:text-black/25 focus:outline-main-purple dark:placeholder:text-white/25"
                  // todo: rhf register
                />
              </div>
            </div> */}
            {fields.map((_item, index) => {
              return (
                <div
                  className="column-input-container flex flex-col gap-3"
                  key={`column-name${index}`}
                >
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      id="column-name"
                      placeholder="Column Name"
                      className="w-full cursor-pointer rounded bg-transparent py-2 px-4 text-sm text-medium-grey outline outline-1 outline-medium-grey/25 placeholder:text-black/25 focus:outline-main-purple dark:placeholder:text-white/25"
                      {...register(`columns.${index}.name`)}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (fields.length > 1) {
                          remove(index);
                        }
                      }}
                      className="block h-full fill-medium-grey p-2 hover:fill-red-main focus-visible:fill-red-main"
                    >
                      {/* // ? without div/button overflow cutoff svg ? */}
                      <Cross />
                    </button>
                  </div>
                  {/* end input + delete button */}
                  {errors.columns?.[index]?.name && (
                    <p className="form-message text-sm text-red-main">
                      {errors.columns?.[index]?.name?.message}
                    </p>
                  )}
                </div>
                // end single input container
              );
            })}
          </div>
          {/* columns list - end */}

          {/* add new column - button */}
          <button
            type="button"
            className="hover:bg-main-puple/10 mt-1.5 flex items-center justify-center gap-1 rounded-3xl bg-main-purple/20 py-2.5 px-4.5 text-center text-sm font-bold text-main-purple focus:outline-offset-2 focus-visible:outline-offset-2 dark:text-white/90 dark:hover:bg-main-purple/30"
            onClick={() => {
              append({ name: "" });
            }}
          >
            <Plus />
            Add New Column
          </button>

          {/* create board - button */}
          {/* // TODO: refactor buttons into separate component? */}
          <button
            type="submit"
            className="flex items-center justify-center rounded-3xl bg-main-purple py-2.5 px-4.5 text-center font-bold text-white hover:bg-[#6e6adf] focus:outline-offset-2 focus-visible:outline-offset-2"
          >
            Create New Board
          </button>
        </form>
      )}
    </Modal>
  );
};

export default NewBoardFormModal;
