import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cross from '../../assets/icons/cross.svg'
import { RootState } from '../../redux'
import {
  closeModal,
  handleSubtaskChange,
  handleTaskStatusChange,
} from '../../redux/BoardSlice/BoardSlice'
import { BoardSubTasks } from '../../types'
import Modal from '../Shared/Modal'

interface Props {
  isSubtasksOpen: string | null
}

const SubtasksModal = ({ isSubtasksOpen }: Props) => {
  const dispatch = useDispatch()
  const selectedBoard = useSelector((state: RootState) => state.board.selectedBoard)
  const selectedTask = useSelector((state: RootState) => state.board.selectedTask)

  return (
    selectedTask && (
      <Modal isOpen={isSubtasksOpen}>
        <h1 className='text-lg font-bold'>{selectedTask.title}</h1>
        <button
          onClick={() => dispatch(closeModal())}
          className='absolute right-4 top-6 fill-medium-grey p-2 hover:fill-red-main focus-visible:fill-red-main'
          aria-label='close form'
          type='button'
        >
          <Cross />
        </button>
        <p className='text-sm text-medium-grey'>
          {selectedTask.description ? selectedTask.description : 'No description'}
        </p>
        <div>
          <p className='mt-1 pb-4 text-xs font-bold leading-6 text-[#828fa3]'>
            {`${
              selectedTask?.subtasks.filter((item: BoardSubTasks) => item.isCompleted)
                .length
            } out of
${selectedTask?.subtasks.length} subtasks`}
          </p>
          <div className='subtask-list-container flex flex-col gap-3'>
            {selectedTask?.subtasks.map((subtask, index) => {
              return (
                <label
                  htmlFor={subtask.title}
                  key={subtask.title}
                  className='flex cursor-pointer items-center gap-2 rounded bg-light-grey p-4 text-sm dark:bg-very-dark-grey'
                >
                  <input
                    type='checkbox'
                    name={subtask.title}
                    id={subtask.title}
                    checked={subtask.isCompleted}
                    onChange={() => {
                      // console.log('index click:', index) // index click: 0
                      dispatch(handleSubtaskChange({ task: selectedTask, subtask }))
                    }}
                  />
                  <div className='checkbox'></div>
                  <span>{subtask.title}</span>
                </label>
              )
            })}
          </div>
        </div>
        {/* Status */}
        <div>
          <div className='relative flex w-full flex-col gap-3 text-white'>
            <label
              htmlFor='status'
              className='text-xs font-bold text-medium-grey dark:text-white'
            >
              Current Status
            </label>
            <select
              name='status'
              id='status'
              title='status'
              placeholder='status'
              className='peer cursor-pointer appearance-none rounded px-4 py-2 text-sm text-black outline outline-1 outline-medium-grey/25 transition-colors placeholder:text-black/25 focus:outline-main-purple dark:bg-dark-grey dark:text-white dark:placeholder:text-white/25'
              value={selectedTask.status} // show status according to openend task
              onChange={(e) => {
                // console.log(e.target.value); // 'Todo' / 'Doing' / etc...
                // handleStatusChange(e.target.value, selectedTask.status, selectedTask)
                const newStatus = e.target.value
                const oldStatus = selectedTask.status
                const task = selectedTask
                dispatch(
                  handleTaskStatusChange({
                    newStatus,
                    oldStatus,
                    task,
                  })
                )
                // TODO: fix if keep doing more than once with open modal -> duplication? -> temp fix: close modal after action
                dispatch(closeModal())
              }}
            >
              {/* show available task status according to current selected board */}
              {selectedBoard.columns.map((column) => {
                return (
                  <option key={column.name} value={`${column.name}`}>
                    {column.name}
                  </option>
                )
              })}
            </select>
            {/* Arrow */}
            <svg
              stroke='currentColor'
              fill='#635FC7'
              strokeWidth='0'
              viewBox='0 0 448 512'
              className='pointer-events-none absolute right-2.5 bottom-2.5'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z'></path>
            </svg>
          </div>
        </div>
      </Modal>
    )
  )
}

export default SubtasksModal
