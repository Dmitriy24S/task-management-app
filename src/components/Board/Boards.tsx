import dynamic from 'next/dynamic'
import React from 'react'
import { DragUpdate, DropResult } from 'react-beautiful-dnd'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useDispatch, useSelector } from 'react-redux'
import ShowSidebarSVG from '../../assets/icons/sidebar-show.svg'
import { RootState } from '../../redux'
import { setSelectedBoard, toggleBoardMenu } from '../../redux/BoardSlice/BoardSlice'
import { BoardColumns, BoardTasks } from '../../types'
import BoardSidebar from '../Sidemenu/BoardSidebar'
import AddNewColumnButton from './AddNewColumnButton'
import Task from './Task'

const DragDropContext = dynamic(
  async () => {
    const mod = await import('react-beautiful-dnd')
    return mod.DragDropContext
  },
  { ssr: false }
)

const Droppable = dynamic(
  async () => {
    const mod = await import('react-beautiful-dnd')
    return mod.Droppable
  },
  { ssr: false }
)

const Draggable = dynamic(
  async () => {
    const mod = await import('react-beautiful-dnd')
    return mod.Draggable
  },
  { ssr: false }
)

const Boards = () => {
  const dispatch = useDispatch()
  const { isBoardMenuOpen } = useSelector((state: RootState) => state.board)

  // Reorder items inside column / Reoder/move column
  const onDragEnd = (result: DropResult) => {
    console.log('DRAG END')
    const { destination, source, draggableId, type } = result

    // check if dragging column or a task

    // outside
    if (!destination) {
      return
    }
    // same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = source.droppableId
    const finish = destination.droppableId

    // Reordering of Columns:
    if (type === 'column') {
      const tempColumnsArr = Array.from(selectedBoard.columns)
      tempColumnsArr.splice(source.index, 1) // remove selected column from old position
      tempColumnsArr.splice(destination.index, 0, selectedBoard.columns[source.index]) // insert selected column in new position

      // setSelectedBoard({ ...selectedBoard, columns: tempColumnsArr })
      dispatch(setSelectedBoard({ ...selectedBoard, columns: tempColumnsArr }))
      return
    }

    // Reordering of Tasks inside Column:
    // 1. keep original logic move inside 1 column
    if (start === finish) {
      const columnIdx = selectedBoard.columns.findIndex((object) => {
        return object.name === start
        // start & finish : droppableId - (Done / Doing / etc)
      })

      const tempTasksArr = Array.from(selectedBoard.columns[columnIdx].tasks)
      tempTasksArr.splice(source.index, 1) // remove selected column from old position
      tempTasksArr.splice(
        destination.index,
        0,
        selectedBoard.columns[columnIdx].tasks[source.index]
      ) // insert selected column in new position

      const updatedBoard = selectedBoard.columns.map((column) => {
        if (column.name === start) {
          // start & finish : droppableId - (Done / Doing / etc)
          return { ...column, tasks: tempTasksArr }
        } else {
          return column
        }
      })
      // setSelectedBoard({ ...selectedBoard, columns: updatedBoard })
      dispatch(setSelectedBoard({ ...selectedBoard, columns: updatedBoard }))
      return
    }

    // 2. start and finish columns are different (moving from one column to another):
    // Update source column
    const sourceColumnIdx = selectedBoard.columns.findIndex((object) => {
      // return object.name === source.droppableId; // start & finish : droppableId - (Done / Doing / etc)
      return object.name === start
    })

    const tempSourceTasksArr = Array.from(selectedBoard.columns[sourceColumnIdx].tasks)
    tempSourceTasksArr.splice(source.index, 1) // remove selected task? from old position

    // Update target column
    const targetColumnIdx = selectedBoard.columns.findIndex((object) => {
      // return object.name === destination.droppableId; // start & finish : droppableId - (Done / Doing / etc)
      return object.name === finish
    })

    // Grab selected task and update it status with status/name of new column e.g: from 'Doing' to 'Todo':
    const updatedTask = {
      ...selectedBoard.columns[sourceColumnIdx].tasks[source.index],
      status: destination.droppableId,
    }

    const tempTargetTasksArr = Array.from(selectedBoard.columns[targetColumnIdx].tasks)
    tempTargetTasksArr.splice(
      destination.index,
      0,
      // selectedBoard.columns[sourceColumnIdx].tasks[source.index]
      updatedTask
    ) // insert selected task in new position

    const updatedBoard = selectedBoard.columns.map((column) => {
      if (column.name === start) {
        return { ...column, tasks: tempSourceTasksArr }
      }
      if (column.name === finish) {
        return { ...column, tasks: tempTargetTasksArr }
      }
      return column
    })
    // setSelectedBoard({ ...selectedBoard, columns: updatedBoard })
    dispatch(setSelectedBoard({ ...selectedBoard, columns: updatedBoard }))
    console.log('RETURN FINISH CODE')
    return
  }

  const onDragStart = () => {
    // document.body.style.color = 'orange'
    console.log('DRAG START')
  }

  const onDragUpdate = (update: DragUpdate) => {
    console.log('DRAG UPDATE')

    const { destination } = update
    const opacity = destination
      ? destination.index / Object.keys(selectedBoard.columns[0].tasks).length
      : 0
    document.body.style.backgroundColor = `rgba(21, 81, 153, ${opacity})`
  }

  const selectedBoard = useSelector((state: RootState) => state.board.selectedBoard)

  return (
    <div className='main-wrapper relative flex min-w-full flex-grow overflow-hidden bg-[#F4F7FD]  dark:bg-[#20212C] dark:text-white'>
      <BoardSidebar />
      {/* Open sidebar desktop */}
      {/* {!isBoardMenuOpen && ( )} */}
      <button
        aria-label='show sidebar menu'
        className={[
          'fixed left-0 bottom-12 z-10 flex rounded-r-full bg-[#635FC7] p-4 pr-5 transition-opacity  hover:bg-[#736fe6]',
          isBoardMenuOpen
            ? 'invisible opacity-0 duration-300'
            : 'visible opacity-100 duration-700',
        ].join(' ')}
        onClick={() => dispatch(toggleBoardMenu(true))}
      >
        <ShowSidebarSVG />
      </button>

      {/* Main board container list */}
      <ScrollContainer
        hideScrollbars={false}
        className={[
          `board-container absolute left-0 flex h-screen  w-full overflow-auto px-6 pt-24 transition-all duration-300`,
          isBoardMenuOpen ? 'md:left-64' : 'w-full md:left-0',
        ].join(' ')}
        ignoreElements={'h2, article'}
      >
        <DragDropContext
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
          onDragEnd={onDragEnd}
        >
          {/* Container board list */}
          <Droppable droppableId='all-columns' direction='horizontal' type='column'>
            {(provided) => {
              return (
                // Main board container list
                <div
                  className='board-list flex h-full justify-center'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {/* Boards columns */}
                  {selectedBoard?.columns.map((column: BoardColumns, index: number) => {
                    // console.log(column);
                    // {name: 'Todo', tasks: Array(4)}
                    return (
                      // Column
                      <Draggable
                        draggableId={column.name}
                        index={index}
                        key={column.name}
                      >
                        {(provided) => (
                          <section
                            className={`mr-8 flex w-[17.5rem] min-w-[17.5rem] flex-col gap-6`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            {/* Title */}
                            <h2
                              className='flex items-center gap-3 text-xs uppercase tracking-[2px] text-[#828FA3]
                              hover:text-[#5e697a] active:text-[#414a59]
                              dark:hover:text-[#b0bed2] dark:active:text-[#ced9e9]'
                              {...provided.dragHandleProps}
                            >
                              {/* Color dot */}
                              <div
                                className='h-4 w-4 rounded-full'
                                style={{
                                  backgroundColor: column.color,
                                }}
                              />
                              {column.name} ({column.tasks.length})
                            </h2>
                            {/* Tasks */}
                            <Droppable droppableId={column.name} type='task'>
                              {(provided, snapshot) => (
                                <div
                                  className={`tasks-container flex flex-col ${
                                    column.tasks.length === 0
                                      ? 'h-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600'
                                      : ''
                                  }`}
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                >
                                  {/* Task */}
                                  {column.tasks.map((task: BoardTasks, index) => {
                                    return (
                                      <Task
                                        task={task}
                                        key={task.title}
                                        column={column}
                                        index={index}
                                      />
                                    )
                                  })}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </section>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                  {/* Add new column */}
                  <AddNewColumnButton />
                </div>
              )
            }}
          </Droppable>
        </DragDropContext>
      </ScrollContainer>
    </div>
  )
}

export default Boards
