import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import Cross from '../../assets/icons/cross.svg'
import Plus from '../../assets/icons/icon-add-task-mobile.svg'
import { RootState } from '../../redux'
import {
  addNewColumnToBoard,
  closeModal,
  deleteColumn,
} from '../../redux/BoardSlice/BoardSlice'
import Button from '../Shared/Button'
import Modal from '../Shared/Modal'

interface FormTypes {
  boardName: string
  columns: { name: string }[]
}

const formSchema = yup.object({
  boardName: yup
    .string()
    .trim()
    .min(4, 'Title must be at least 4 characters')
    .max(20, 'Title must be at most 20 characters')
    // .matches(/^[a-zA-Z0-9 ]+$/, "only letters and numbers")
    .required('Title is required'),
  columns: yup
    .array()
    .of(
      yup.object().shape({
        name: yup
          .string()
          .trim()
          .min(4, 'Name must be at least 4 characters')
          .max(20, 'Name must be at most 20 characters')
          // .matches(/^[a-zA-Z0-9 ]+$/, "only letters and numbers")
          .required('Name is required'),
      })
    )
    // .min(1, 'Cannot be empty') // allow to just edit board titles without need to add new column
    .max(2, 'Max 2')
    .required('Column names are required'),
})

interface Props {
  isNewColumnFormOpen: string | null
  kind: 'editBoard' | 'newColumn'
}

const EditBoardFormModal = ({ isNewColumnFormOpen, kind }: Props) => {
  const dispatch = useDispatch()
  const selectedBoard = useSelector((state: RootState) => state.board.selectedBoard)

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState,
    formState: { isSubmitSuccessful, errors },
  } = useForm<FormTypes>({
    mode: 'onChange', // validation error onChange while typing in input
    defaultValues: {
      boardName: selectedBoard?.name === undefined ? 'Unnamed Board' : selectedBoard.name,
      // items: [{ name: "default Value" }]
      columns: [{ name: '' }],
      // show one default empty field for column name input
    },
    resolver: yupResolver(formSchema),
  })

  const { fields, append, remove } = useFieldArray({ name: 'columns', control }) // ability to add/remove column name input field

  // Reset form inputs on render? -> fixes updates board name if all boards are deleted
  useEffect(() => {
    reset({
      boardName: selectedBoard?.name === undefined ? 'Unnamed Board' : selectedBoard.name,
      columns: [{ name: '' }],
    })
  }, [isNewColumnFormOpen])

  console.log('errors form', errors)

  return (
    <Modal isOpen={isNewColumnFormOpen}>
      {isNewColumnFormOpen && (
        <form
          className='relative flex flex-col gap-6'
          onSubmit={handleSubmit((data) => {
            // addNewColumnToBoard(data.columns, data.boardName)
            dispatch(
              addNewColumnToBoard({
                // columns: data.columns,
                newColumnsName: data.columns,
                boardName: data.boardName,
              })
            )
            dispatch(closeModal())
          })}
        >
          <button
            onClick={() => dispatch(closeModal())}
            className='absolute right-0 top-0 fill-medium-grey p-2 hover:fill-red-main focus-visible:fill-red-main'
            aria-label='close form'
            type='button'
          >
            <Cross />
          </button>
          <h1 className='text-lg font-bold'>
            {/* // TODO: Refactor text new column modal / edit board modal? */}
            {/* {kind === "editBoard" ? "Edit Board" : "Add New Column"} */}
            Edit Board
          </h1>

          {/* Board name */}
          <div className='relative flex w-full flex-col gap-2 text-white'>
            <label
              htmlFor='board-name'
              className='text-xs font-bold text-medium-grey dark:text-white'
            >
              Board Name
            </label>
            <input
              type='text'
              id='board-name'
              className='peer cursor-pointer rounded px-4 py-2 text-sm text-medium-grey outline outline-1 outline-medium-grey/25 transition-colors placeholder:text-black/25 focus:outline-main-purple dark:bg-dark-grey dark:placeholder:text-white/25'
              {...register('boardName')}
              // value={selectedBoard?.name}
              // autoFocus
            />
            {errors.boardName && (
              <p className='form-message text-sm text-red-main'>
                {errors.boardName?.message}
              </p>
            )}
          </div>

          {/* Exising columns list container - start */}
          <div className='columns-container flex flex-col gap-3'>
            <label
              className='block text-xs font-bold text-medium-grey dark:text-white'
              htmlFor='column-name0'
            >
              Columns
            </label>
            {selectedBoard?.columns.map((column, index) => {
              return (
                <fieldset
                  className='column-name flex items-center gap-1'
                  key={column.name}
                >
                  <input
                    type='text'
                    // id={`column-name${index}`}
                    className='peer w-full cursor-pointer rounded bg-transparent py-2 px-4 text-sm  text-medium-grey outline outline-1  outline-medium-grey/25 placeholder:text-black/25 focus:outline-main-purple dark:placeholder:text-white/25'
                    placeholder='Todo'
                    value={column.name}
                    readOnly
                  />
                  <button
                    type='button'
                    onClick={() => {
                      // handleDeleteColumn(column.name)
                      dispatch(deleteColumn({ columnName: column.name }))
                    }}
                    className='block h-full fill-medium-grey p-2 hover:fill-red-main focus-visible:fill-red-main'
                  >
                    {/* // ? without div/button overflow cutoff svg ? */}
                    <Cross />
                  </button>
                </fieldset>
              )
            })}

            {/* Add new columns */}
            {fields?.map((_item, index) => {
              console.log('fields', fields, index)
              const fieldName = `columns[${index}]`
              return (
                <fieldset className='flex flex-col gap-3' key={`column-name${index}`}>
                  <div className='column-name flex items-center gap-1'>
                    <input
                      type='text'
                      id={`column-name${index}`}
                      className='peer w-full cursor-pointer rounded bg-transparent py-2 px-4 text-sm  text-medium-grey outline outline-1  outline-medium-grey/25 placeholder:text-black/25 focus:outline-main-purple dark:placeholder:text-white/25'
                      placeholder='New column name'
                      {...register(`columns.${index}.name`)}
                    />
                    <button
                      type='button'
                      onClick={() => {
                        // if (fields.length > 1) {
                        remove(index)
                        // }
                      }}
                      className='block h-full fill-medium-grey p-2 hover:fill-red-main focus-visible:fill-red-main'
                      aria-label='remove'
                    >
                      <Cross />
                    </button>
                  </div>

                  {errors.columns?.[index]?.name && (
                    <p className='form-message text-sm text-red-main'>
                      {errors.columns?.[index]?.name?.message}
                    </p>
                  )}
                </fieldset>
              )
            })}
            {/* Columns list container - end */}

            {/* Add new column - button */}
            <Button
              type='button'
              style='secondary'
              onClick={() => {
                append({ name: '' })
              }}
            >
              <Plus />
              Add New Column
            </Button>
          </div>

          {/* Create button */}
          <Button type='submit' style='main-bold'>
            {/* Create New Column */}
            {/* {kind === "editBoard" ? "Save Changes" : "Create New Column"} */}
            {/* // TODO: Refactor new column modal / edit board modal? */}
            Save Changes
          </Button>
        </form>
      )}
    </Modal>
  )
}

export default EditBoardFormModal
