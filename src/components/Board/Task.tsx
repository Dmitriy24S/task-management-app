import dynamic from 'next/dynamic'
import React from 'react'
import { useDispatch } from 'react-redux'
import { RootState } from '../../redux'
import { showSubtasks } from '../../redux/BoardSlice/BoardSlice'
import { BoardColumns, BoardSubTasks, BoardTasks } from '../../types'

interface TaskProps {
  task: BoardTasks
  column: BoardColumns
  index: number
}

const Draggable = dynamic(
  async () => {
    const mod = await import('react-beautiful-dnd')
    return mod.Draggable
  },
  { ssr: false }
)

const Task = ({ task, column, index }: TaskProps) => {
  // {title: 'Competitor analysis', description: '', status: 'Done', subtasks: Array(2)}
  const dispatch = useDispatch()

  return (
    <Draggable draggableId={task.title} index={index}>
      {(provided, snapshot) => (
        <article
          className={`group mb-5 cursor-pointer rounded-lg border border-[#86868619] bg-white p-5 py-6 text-black shadow-task dark:bg-[#2B2C37] dark:text-white`}
          onClick={() => dispatch(showSubtasks({ task, column }))}
          // (3) [{…}, {…}, {…}]
          // 0: {title: 'Settings - Account page', isCompleted: true}
          // 1: {title: 'Settings - Billing page', isCompleted: true}
          // 2: {title: 'Search page', isCompleted: false}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3 className='text-[14.5px] font-bold group-hover:text-main-purple'>
            {task.title}
          </h3>
          <p className='mt-3 text-xs font-bold text-[#828fa3]'>
            {`${
              task.subtasks.filter((item: BoardSubTasks) => item.isCompleted).length
            } out of
${task.subtasks.length} subtasks`}
          </p>
        </article>
      )}
    </Draggable>
  )
}

export default Task
