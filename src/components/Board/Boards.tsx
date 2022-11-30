import { Transition } from "@headlessui/react";
import React from "react";
// import { DragDropContext, DragUpdate, Droppable, DropResult } from 'react-beautiful-dnd';
import { DragUpdate, DropResult } from 'react-beautiful-dnd';
import ScrollContainer from 'react-indiana-drag-scroll';
import ShowSidebarSVG from "../../assets/icons/sidebar-show.svg";
import { Board, BoardColumns, BoardTasks } from "../../types";
import BoardSidebar from "../Sidemenu/BoardSidebar";
import AddNewColumnButton from "./AddNewColumnButton";
import Task from "./Task";


import dynamic from 'next/dynamic';

const DragDropContext = dynamic(
  async () => {
    const mod = await import('react-beautiful-dnd');
    return mod.DragDropContext;
  },
  { ssr: false },
);

const Droppable = dynamic(
  async () => {
    const mod = await import('react-beautiful-dnd');
    return mod.Droppable;
  },
  { ssr: false },
);

const Draggable = dynamic(
  async () => {
    const mod = await import('react-beautiful-dnd');
    return mod.Draggable;
  },
  { ssr: false },
);

interface HeaderProps {
  isBoardMenuOpen: boolean;
  setIsBoardMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  boardsData: Board[];
  selectedBoard: Board;
  showSubtasks: (task: BoardTasks, column: BoardColumns) => void;
  handleSwitchSelectBoard: (boardName: string) => void;
  setActiveModalName: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedBoard: React.Dispatch<React.SetStateAction<Board>>
}

const Boards = ({
  isBoardMenuOpen,
  setIsBoardMenuOpen,
  darkTheme,
  setDarkTheme,
  boardsData,
  selectedBoard,
  showSubtasks,
  handleSwitchSelectBoard,
  setActiveModalName,
  setSelectedBoard
}: HeaderProps) => {

  // Reorder items inside column / Reoder/move column
  const onDragEnd = (result: DropResult) => {
    console.log('DRAG END');
    const { destination, source, draggableId, type } = result
    console.log('type', type);

    // check if dragging column or a task

    // outside
    if (!destination) {
      return
    }
    // same place
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    console.log('onDragEnd source', source);
    // onDragEnd source { index: 0, droppableId: 'column-1' }
    // onDragEnd column { id: 'column-1', title: 'Todo', taskIds: Array(4) }
    // onDragEnd newTaskIds(4)['task-1', 'task-2', 'task-3', 'task-4']

    console.log('source.droppableId:', source.droppableId, 'source:', source);
    console.log('destination.droppableId:', destination.droppableId, 'destination:', destination);

    const start = source.droppableId
    const finish = destination.droppableId
    // console.log('onDragEnd column/start', start);
    // {index: 1, droppableId: 'column-1'}
    // console.log('onDragEnd destination', destination);
    // {droppableId: 'column-1', index: 0}

    console.log('start (source.droppableId)', start);
    console.log('finish (destination.droppableId)', finish);

    console.log('draggableId', draggableId); // draggableId Doing

    console.log('source.index', source.index);
    console.log('destination.index', destination.index);

    // DRAG START
    // DRAG UPDATE
    // Object.keys(data.tasks) (4) ['0', '1', '2', '3']0: "0"1: "1"2: "2"3: "3"length: 4[[Prototype]]: Array(0)
    // destination {droppableId: 'all-columns', index: 0}
    // opacity 0
    // DRAG END
    // type column
    // onDragEnd source {index: 1, droppableId: 'all-columns'}
    // onDragEnd column/start undefined
    // onDragEnd destination {droppableId: 'all-columns', index: 0}
    // draggableId Doing
    // COLUMN 111123123123131230
    // source.index 1
    // destination.index 0

    // Reordering of Columns:
    if (type === 'column') {
      console.log('COLUMN', 111123123123131232);

      let tempColumnsArr = Array.from(selectedBoard.columns)
      tempColumnsArr.splice(source.index, 1) // remove selected column from old position
      // console.log('tempArr', tempArr, 1111111);
      tempColumnsArr.splice(destination.index, 0, selectedBoard.columns[source.index]) // insert selected column in new position
      // console.log('tempArr', tempArr, 2222222);
      setSelectedBoard({ ...selectedBoard, columns: tempColumnsArr })
      return
    }

    // Reordering of Tasks inside Column:
    // 1. keep original logic move inside 1 column
    if (start === finish) {
      // droppableId : column name (Done / Doing / etc)
      // console.log('start === finish', 1111111, start, finish, 'start finish');
      // source.droppableId        Done source        { index: 0, droppableId: 'Done' }
      // destination.droppableId   Done destination   { index: 1, droppableId: 'Done' }
      const columnIdx = selectedBoard.columns.findIndex(object => {
        return object.name === start;
        // start & finish : droppableId - (Done / Doing / etc)
      });

      let tempTasksArr = Array.from(selectedBoard.columns[columnIdx].tasks)
      tempTasksArr.splice(source.index, 1) // remove selected column from old position
      // console.log('tempTasksArr', tempTasksArr, 1111111);
      tempTasksArr.splice(destination.index, 0, selectedBoard.columns[columnIdx].tasks[source.index]) // insert selected column in new position
      // console.log('tempTasksArr', tempTasksArr, 2222222);

      const updatedBoard = selectedBoard.columns.map((column) => {
        if (column.name === start) {
          // start & finish : droppableId - (Done / Doing / etc)
          return { ...column, tasks: tempTasksArr }
        } else {
          return column
        }
      })
      setSelectedBoard({ ...selectedBoard, columns: updatedBoard })
      return
    }

    console.log('start and finish columns are different', 123123123123123132312);


    // 2. start and finish columns are different (moving from one column to another):

    // From middle colum 1st iteam (0idx) to 1st column 2nd item(1idx):
    // source.droppableId:      Doing source:      {index: 0, droppableId: 'Doing'}
    // destination.droppableId: Todo  destination: {index: 1, droppableId: 'Todo'}

    // Update source column
    const sourceColumnIdx = selectedBoard.columns.findIndex(object => {
      // return object.name === source.droppableId; // start & finish : droppableId - (Done / Doing / etc)
      return object.name === start;
    });
    let tempSourceTasksArr = Array.from(selectedBoard.columns[sourceColumnIdx].tasks)
    tempSourceTasksArr.splice(source.index, 1) // remove selected column from old position

    // Update target column
    const targetColumnIdx = selectedBoard.columns.findIndex(object => {
      // return object.name === destination.droppableId; // start & finish : droppableId - (Done / Doing / etc)
      return object.name === finish;
    });
    let tempTargetTasksArr = Array.from(selectedBoard.columns[targetColumnIdx].tasks)
    tempTargetTasksArr.splice(destination.index, 0, selectedBoard.columns[sourceColumnIdx].tasks[source.index]) // insert selected column in new position


    const updatedBoard = selectedBoard.columns.map((column) => {
      if (column.name === start) {
        return { ...column, tasks: tempSourceTasksArr }
      }
      if (column.name === finish) {
        return { ...column, tasks: tempTargetTasksArr }
      }
      return column
    })
    setSelectedBoard({ ...selectedBoard, columns: updatedBoard })
    console.log('RETURN FINISH CODE');
    return
  }

  const onDragStart = () => {
    // document.body.style.color = 'orange'
    console.log('DRAG START');

  }

  const onDragUpdate = (update: DragUpdate) => {
    console.log('DRAG UPDATE');

    const { destination } = update
    const opacity = destination ? destination.index / Object.keys(selectedBoard.columns[0].tasks).length : 0
    console.log('Object.keys(data.tasks)', Object.keys(selectedBoard.columns[0].tasks));
    // const opacity = destination ? destination.index / Object.keys(data.tasks).length : 0
    // console.log('Object.keys(data.tasks)', Object.keys(data.tasks));
    // Object.keys(data.tasks)
    // (4) ['task-1', 'task-2', 'task-3', 'task-4']
    // 0: "task-1"
    // 1: "task-2"
    // 2: "task-3"
    // 3: "task-4"
    console.log('destination', destination);
    console.log('opacity', opacity);
    // destination {droppableId: 'column-1', index: 1}
    // opacity 0.25
    // destination {droppableId: 'column-1', index: 2}
    // opacity 0.5
    // destination {droppableId: 'column-1', index: 3}
    // opacity 0.75
    document.body.style.backgroundColor = `rgba(21, 81, 153, ${opacity})`
  }


  return (
    <div className="main-wrapper relative flex min-w-full flex-grow bg-[#F4F7FD] dark:bg-[#20212C] dark:text-white">
      <BoardSidebar
        isBoardMenuOpen={isBoardMenuOpen}
        setIsBoardMenuOpen={setIsBoardMenuOpen}
        setDarkTheme={setDarkTheme}
        darkTheme={darkTheme}
        boardsData={boardsData}
        selectedBoard={selectedBoard}
        handleSwitchSelectBoard={handleSwitchSelectBoard}
        setActiveModalName={setActiveModalName}
      />
      {/* Open sidebar desktop */}
      {/* {!isBoardMenuOpen && ( )} */}
      <button
        aria-label="show sidebar menu"
        className={`${isBoardMenuOpen ? "invisible opacity-0 duration-300" : "visible opacity-100 duration-700"
          } fixed left-0 bottom-12 z-10 flex rounded-r-full bg-[#635FC7] p-4 pr-5 transition-opacity  hover:bg-[#736fe6]`}
        onClick={() => setIsBoardMenuOpen(true)}
      // onClick={() => setActiveModalName("boardModal")}
      >
        <ShowSidebarSVG />
      </button>

      {/* Main board container list */}
      <ScrollContainer hideScrollbars={false}
        // className={`${
        //   isBoardMenuOpen ? "translate-x-[320px]" : "translate-x-0"
        // } relative min-h-full w-full bg-[#F4F7FD] p-4 transition-transform duration-300 dark:bg-[#20212C] dark:text-white`}
        className={`board-container relative flex mx-auto h-screen overflow-x-auto px-6 pt-24 transition-transform duration-300`}
        ignoreElements={'h2, article'}
      >
        {/* <ScrollContainer > */}
        <DragDropContext
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
          onDragEnd={onDragEnd}
        >
          {/* container board list? */}
          <Droppable droppableId='all-columns' direction='horizontal' type='column' >
            {(provided) => {
              return (
                <div className="board-list grid h-full w-11/12 min-w-fit grid-flow-col justify-center"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {/* Boards columns */}
                  {selectedBoard?.columns.map((column: BoardColumns, index: number) => {
                    // console.log(column);
                    // {name: 'Todo', tasks: Array(4)}
                    return (
                      // Column?
                      <Draggable draggableId={column.name} index={index} key={column.name}>
                        {(provided) =>
                          <section className={`flex w-[22rem] flex-col gap-4 mr-4`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            {/* Title */}
                            <h2 className="flex items-center gap-3" {...provided.dragHandleProps}>
                              {/* title color dot: */}
                              <div
                                className="h-4 w-4 rounded-full"
                                style={{
                                  // backgroundColor: colors[index] ? colors[index] : generateColumnColor(index),
                                  backgroundColor: column.color
                                }} />
                              {column.name}
                            </h2>
                            {/* Tasks */}
                            <Droppable droppableId={column.name} type='task'>
                              {(provided, snapshot) =>
                                <div
                                  className={`tasks-container flex flex-col ${column.tasks.length === 0
                                    ? "h-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600"
                                    : ""
                                    }`}
                                  ref={provided.innerRef}
                                  // isDraggingOver={snapshot.isDraggingOver}
                                  {...provided.droppableProps}
                                >
                                  {/* Task */}
                                  {column.tasks.map((task: BoardTasks, index) => {
                                    return (
                                      <Task
                                        task={task}
                                        key={task.title}
                                        setActiveModalName={setActiveModalName}
                                        showSubtasks={showSubtasks}
                                        column={column}
                                        index={index}
                                      // isDraggingOver={snapshot.isDraggingOver}
                                      />
                                    )
                                  })}
                                  {provided.placeholder}
                                </div>
                              }
                            </Droppable>
                          </section>
                        }
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )
            }}
          </Droppable>
        </DragDropContext>
        {/* Add new column */}
        <AddNewColumnButton setActiveModalName={setActiveModalName} />
        {/* </ScrollContainer> */}
      </ScrollContainer>

    </div>
  );
};

export default Boards;
