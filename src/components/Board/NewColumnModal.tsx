import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import Cross from "../../assets/icons/cross.svg";
import Plus from "../../assets/icons/icon-add-task-mobile.svg";
import { Board } from "../../types";
import Modal from "../Modal";

import { useFieldArray, useForm } from "react-hook-form";

import * as yup from "yup";

interface FormTypes {
  columns: { name: string }[];
}

interface Props {
  isNewColumnFormOpen: boolean;
  setIsNewColumnFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBoard: Board;
  addNewColumnToBoard: (newColumnsName: { name: string }[]) => void;
}

const formSchema = yup.object({
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
          .required("Name is required"),
      })
    )
    .min(1, "Cannot be empty") // ?
    .max(2, "Max 2")
    .required("Column names are required"),
});

const NewColumnModal = ({
  isNewColumnFormOpen,
  setIsNewColumnFormOpen,
  selectedBoard,
  addNewColumnToBoard,
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
    mode: "onChange", // validation error onChange while typing in input
    defaultValues: {
      // items: [{ name: "default Value" }]
      columns: [{ name: "" }],
      // show one default empty field for column name input
    },
    resolver: yupResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({ name: "columns", control }); // ability to add/remove column name input field

  // Reset form inputs on submit
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        columns: [{ name: "" }],
      });
    }
  }, [formState, reset]);

  return (
    <Modal isOpen={isNewColumnFormOpen} setIsOpen={setIsNewColumnFormOpen}>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit((data) => {
          // console.log(data);
          // {columns: Array(1)}
          // columns: Array(1)
          // 0:
          // name: "1111"

          // console.log(data.columns);
          // [{…}]
          // 0: {name: '1111'}

          addNewColumnToBoard(data.columns);

          // setIsNewColumnFormOpen(false);
        })}
      >
        <h1 className="text-lg font-bold">Add New Column</h1>

        {/* Board name */}
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
            className="peer cursor-pointer rounded px-4 py-2 text-sm text-medium-grey outline outline-1 outline-medium-grey/25 transition-colors placeholder:text-black/25 focus:outline-main-purple dark:bg-dark-grey dark:placeholder:text-white/25"
            value={selectedBoard.name}
            readOnly
          />
        </div>

        {/* Exising columns list container - start */}
        <div className="columns-container flex flex-col gap-3">
          <label
            className="block text-xs font-bold text-medium-grey dark:text-white"
            htmlFor="column-name0"
          >
            Columns
          </label>
          {selectedBoard.columns.map((column, index) => {
            return (
              <>
                <fieldset className="column flex items-center gap-1">
                  <input
                    type="text"
                    // id={`column-name${index}`}
                    className="peer w-full cursor-pointer rounded bg-transparent py-2 px-4 text-sm  text-medium-grey outline outline-1  outline-medium-grey/25 placeholder:text-black/25 focus:outline-main-purple dark:placeholder:text-white/25"
                    placeholder="Todo"
                    value={column.name}
                    readOnly
                  />
                </fieldset>
              </>
            );
          })}

          {/* Add new columns */}
          {fields?.map((_item, index) => {
            const fieldName = `columns[${index}]`;
            return (
              <fieldset className="flex flex-col gap-3">
                <div className="column-name flex items-center gap-1">
                  <input
                    type="text"
                    id={`column-name${index}`}
                    className="peer w-full cursor-pointer rounded bg-transparent py-2 px-4 text-sm  text-medium-grey outline outline-1  outline-medium-grey/25 placeholder:text-black/25 focus:outline-main-purple dark:placeholder:text-white/25"
                    placeholder="New column name"
                    {...register(`columns.${index}.name`)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (fields.length > 1) {
                        remove(index);
                      }
                    }}
                    className="block h-full fill-medium-grey p-2 hover:fill-red focus-visible:fill-red"
                  >
                    {/* // ? without div/button overflow cutoff svg ? */}
                    <Cross />
                  </button>
                </div>

                {errors.columns?.[index]?.name && (
                  <p className="form-message text-sm text-red">
                    {errors.columns?.[index]?.name?.message}
                  </p>
                )}
              </fieldset>
            );
          })}
          {/* Columns list container - end */}

          {/* Add new column - button */}
          <button
            type="button"
            className="mt-1.5 flex items-center justify-center gap-1 rounded-3xl bg-main-purple/20 py-2.5 px-4.5 text-center text-sm font-bold text-main-purple hover:bg-main-purple/10 focus:outline-offset-2 focus-visible:outline-offset-2 dark:text-white/90 dark:hover:bg-main-purple/30"
            onClick={() => {
              append({ name: "" });
            }}
          >
            <Plus className="fill-red-500" />
            Add New Column
          </button>
        </div>

        {/* Create button */}
        <button
          type="submit"
          className="flex items-center justify-center rounded-3xl bg-[#635FC7] py-2.5 px-4.5 text-center font-bold text-white hover:bg-[#6e6adf] focus:outline-offset-2 focus-visible:outline-offset-2"
        >
          Create New Column
        </button>
      </form>
    </Modal>
  );
};

export default NewColumnModal;