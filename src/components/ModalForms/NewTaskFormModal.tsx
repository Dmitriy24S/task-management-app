import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { FaChevronDown } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import Cross from '../../assets/icons/cross.svg'
import Plus from '../../assets/icons/icon-add-task-mobile.svg'
import { RootState } from '../../redux'
import { closeModal, updateSelectedBoard } from '../../redux/BoardSlice/BoardSlice'
import Button from '../Shared/Button'
import Modal from '../Shared/Modal'

interface Props {
  isNewTaskFormOpen: string | null
}

const formSchema = yup.object({
  taskTitle: yup
    .string()
    .trim()
    .min(4, 'Title must be at least 4 characters')
    .max(20, 'Title must be at most 20 characters')
    // .matches(/^[a-zA-Z0-9 ]+$/, "only letters and numbers")
    .required('Title is required'),
  taskDescription: yup
    .string()
    .trim()
    .min(4, 'Description must be at least 4 characters')
    .max(100, 'Description must be at most 100 characters')
    // .matches(/^[a-zA-Z0-9 ]+$/, "only letters and numbers")
    .required('Description is required'),
  // items array start
  subtasks: yup
    .array()
    .of(
      yup.object().shape({
        subtasktitle: yup
          .string()
          .trim()
          .min(4, 'Subtask name must be at least 4 characters')
          .max(20, 'Subtask name must be at most 20 characters')
          .matches(/^[a-zA-Z0-9 ]+$/, 'only letters and numbers')
          .required(),
      })
      // .minLength(1, "Minimum 1 item") // no
      // .required() // no
    )
    .min(1, 'Cannot be empty') // ? works
    .required('Subtasks are required'),
  // items array end
  taskStatus: yup.string().required('Status is required'),
})

interface FormTypes {
  taskTitle: string
  taskDescription: string
  subtasks: { subtasktitle: string }[]
  taskStatus: string
}

const NewTaskFormModal = ({ isNewTaskFormOpen }: Props) => {
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
      subtasks: [{ subtasktitle: '' }, { subtasktitle: '' }],
      // show two default empty fields for subtasks input
    },
    resolver: yupResolver(formSchema),
  })

  const { fields, append, remove } = useFieldArray({ name: 'subtasks', control }) // ability to add/remove subtasks
  // const watchFields = watch("subtasks"); // target specific field by their names
  // console.log(watchFields); // track input changes subtasks array names inside form

  // Handle submit new task
  const onSubmit = (data: FormTypes) => {
    const newTask = {
      title: data.taskTitle,
      description: data.taskDescription,
      status: data.taskStatus,
      subtasks: data.subtasks.map((item) => {
        return {
          title: item.subtasktitle,
          isCompleted: false,
        }
      }),
    }

    dispatch(updateSelectedBoard(newTask))
    dispatch(closeModal())
  }

  // Reset form inputs on submit
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      // reset({ ...data });
      reset({
        taskTitle: '',
        taskDescription: '',
        subtasks: [{ subtasktitle: '' }, { subtasktitle: '' }],
        taskStatus: '',
      })
    }
  }, [formState, reset])

  const dispatch = useDispatch()
  const selectedBoard = useSelector((state: RootState) => state.board.selectedBoard)

  return (
    <Modal isOpen={isNewTaskFormOpen}>
      <form
        className='relative flex flex-col gap-6'
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <button
          onClick={() => dispatch(closeModal())}
          className='absolute right-0 top-0 fill-medium-grey p-2 hover:fill-red-main focus-visible:fill-red-main'
          aria-label='close form'
          type='button'
        >
          <Cross />
        </button>
        <h1 className='text-lg font-bold'>Add New Task</h1>
        {/* Title */}
        <div className='relative flex w-full flex-col gap-2 text-white'>
          <label
            htmlFor='task-title'
            className='text-xs font-bold text-medium-grey dark:text-white'
          >
            Title
          </label>

          <input
            type='text'
            id='task-title'
            className='peer cursor-pointer rounded px-4 py-2 text-sm text-black outline outline-1 outline-medium-grey/25 transition-colors placeholder:text-black/25 focus:outline-main-purple dark:bg-dark-grey dark:text-white dark:placeholder:text-white/25'
            placeholder='e.g. Take coffee break'
            {...register('taskTitle')}
            // autoFocus
          />
          {errors.taskTitle && (
            <p className='form-message text-sm text-red-main'>
              {errors.taskTitle?.message}
            </p>
          )}
        </div>
        {/* Description */}
        <div
          className='relative flex w-full flex-col gap-2 text-white'
          placeholder='e.g. Take coffee break'
        >
          <label
            htmlFor='task-description'
            className='text-xs font-bold text-medium-grey dark:text-white'
          >
            Description
          </label>
          <textarea
            rows={4}
            id='task-description'
            className='peer cursor-pointer resize-none rounded px-4 py-2 text-sm text-black outline outline-1 outline-medium-grey/25 transition-colors placeholder:text-black/25 focus:outline-main-purple dark:bg-dark-grey dark:text-white dark:placeholder:text-white/25'
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            {...register('taskDescription')}
          />
          {errors.taskDescription && (
            <p className='form-message text-sm text-red-main'>
              {errors.taskDescription?.message}
            </p>
          )}
        </div>
        {/* Subtasks list container - start */}
        <div className='subtasks-container flex flex-col gap-3'>
          <label
            className='block text-xs font-bold text-medium-grey dark:text-white'
            htmlFor='subtask0'
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
            const fieldName = `subtasks[${index}]`
            return (
              // Subtask
              <fieldset
                className='subtask flex flex-col gap-3'
                name={fieldName}
                key={fieldName}
              >
                <div className='subtask-input-container flex items-center gap-1'>
                  <input
                    type='text'
                    id={`subtask${index}`}
                    className='peer w-full cursor-pointer rounded bg-transparent py-2 px-4 text-sm text-black outline outline-1 outline-medium-grey/25  placeholder:text-black/25 focus:outline-main-purple dark:text-white dark:placeholder:text-white/25'
                    placeholder='e.g. Make coffee'
                    {...register(`subtasks.${index}.subtasktitle`)}
                    name={`subtasks.${index}.subtasktitle`}
                  />
                  <button
                    type='button'
                    onClick={() => {
                      // prevent deleting last subtask input, keep atleast one
                      if (fields.length > 1) {
                        remove(index)
                      }
                    }}
                    className='block h-full fill-medium-grey p-2 hover:fill-red-main focus-visible:fill-red-main'
                    aria-label='remove'
                  >
                    <Cross />
                  </button>
                </div>
                {/* put inside for spacing fix? / for single .map return item with key={} */}
                {errors.subtasks?.[index]?.subtasktitle && (
                  <p className='form-message text-sm text-red-main'>
                    {errors.subtasks?.[index]?.subtasktitle?.message}
                  </p>
                )}
              </fieldset>
            )
          })}
          {/* Subtasks list container - end */}

          {/* Add new subtask - button */}
          <Button
            type='button'
            style='secondary'
            onClick={() => {
              append({ subtasktitle: '' })
            }}
          >
            <Plus />
            Add New Subtask
          </Button>
        </div>

        {/* Select options - Status */}
        <div className='relative flex w-full flex-col gap-2 text-white'>
          <label
            htmlFor='status'
            className='text-xs font-bold text-medium-grey dark:text-white'
          >
            Status
          </label>
          <select
            id='status'
            title='status'
            // value=""
            defaultValue=''
            // placeholder="status"
            // name="status"
            {...register('taskStatus')}
            className='peer cursor-pointer appearance-none rounded px-4 py-2 text-sm text-black outline outline-1 outline-medium-grey/25 transition-colors placeholder:text-black/25 focus:outline-main-purple dark:bg-dark-grey dark:text-white dark:placeholder:text-white/25'
          >
            <option value=''>Select an Option</option>
            {/* show available task status according to current selected board */}
            {selectedBoard?.columns.map((column) => {
              return (
                <option key={column.name} value={`${column.name}`}>
                  {column.name}
                </option>
              )
            })}
          </select>
          <FaChevronDown
            fill='#635FC7'
            className='pointer-events-none absolute right-2.5 bottom-2.5'
          />
        </div>
        {errors.taskStatus && (
          <p className='form-message text-sm text-red-main'>
            {errors.taskStatus?.message}
          </p>
        )}
        {/* Create button */}
        <Button type='submit' style='main-bold'>
          Create Task
        </Button>
      </form>
    </Modal>
  )
}

export default NewTaskFormModal
