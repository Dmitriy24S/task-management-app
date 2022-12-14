import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import data from '../assets/data/data.json'
import Boards from '../components/Board/Boards'
import Header from '../components/Header/Header'
import EditBoardFormModal from '../components/ModalForms/EditBoardFormModal'
import NewBoardFormModal from '../components/ModalForms/NewBoardFormModal'
import NewTaskFormModal from '../components/ModalForms/NewTaskFormModal'
import SubtasksModal from '../components/ModalForms/SubtasksModal'
import styles from '../styles/Home.module.css'
import { Board, BoardColumns, BoardSubTasks, BoardTasks } from '../types'

const generateColumnColor = () => {
  console.log('color generate')
  // const colors = ["#49C4E5", "#8471F2", "#67E2AE", "#e5a449"];

  // if (colors[index]) {
  // return colors[index];
  // } else {
  // index % arr.length - will loop colors?
  // console.log(generateColumnColor(5)); // #8471F2 //  hsl(216, 80%, 70%)

  let rand = Math.random()
  // console.log(rand, "1 rand"); // 0.5983916920571346 '1 rand'
  rand = Math.floor(rand * 360)
  // console.log(rand, "2 rand * 360"); // 215 '2 rand * 360'
  rand = rand + 1
  // console.log(rand, "3 rand + 1"); // 216 '3 rand + 1'

  const randomColor = `hsl(${rand}, 80%, 70%)` // hsl(216, 80%, 70%)

  return randomColor // #8471F2 //  hsl(216, 80%, 70%)
}

const Home: NextPage = () => {
  const [isBoardMenuOpen, setIsBoardMenuOpen] = useState(false)
  // const [isNewTaskFormOpen, setIsNewTaskFormOpen] = useState(false);
  // const [isNewBoardFormOpen, setIsNewBoardFormOpen] = useState(false);
  // const [isSubtasksOpen, setIsSubtasksOpen] = useState(false);
  // const [isNewColumnFormOpen, setIsNewColumnFormOpen] = useState(false);

  const [boardsData, setBoardsData] = useState<Board[]>(data.boards)
  // State: [{…}, {…}, {…}]
  // console.log({ boardsData });
  // boards: Array(3)
  //.. 0:{columns: Array(3), name: "Platform Launch"}
  //.... 0: {name: 'Todo', tasks: Array(4)}
  //.... tasks: Array(4)
  //.... .... 0: {title: 'Build UI for onboarding flow', description: '', status: 'Todo', subtasks: Array(3)}
  //.... .... description: ""
  //.... .... status: "Todo"
  //.... .... title: "Build UI for onboarding flow"
  //.... .... subtasks: Array(3)
  //.... .... .... 0:
  //.... .... .... isCompleted: true
  //.... .... .... title: "Sign up page"
  //.... .... .... [[Prototype]]: Object
  //.... .... .... 1: {title: 'Sign in page', isCompleted: false}
  //.... .... .... 2: {title: 'Welcome page', isCompleted: false}
  //.... .... 1: {title: 'Build UI for search', description: '', status: 'Todo', subtasks: Array(1)}
  //.... .... 2: {title: 'Build settings UI', description: '', status: 'Todo', subtasks: Array(2)}
  //.... .... 3: {title: 'QA and test all major user journeys', description: 'Once we feel version one is ready, we need to rigo…rnally and externally to identify any major gaps.', status: 'Todo', subtasks: Array(2)}
  //.... 1: {name: 'Doing', tasks: Array(6)}
  //.... 2: {name: 'Done', tasks: Array(7)}
  // 1: {name: 'Marketing Plan', columns: Array(3)}
  // 2: {name: 'Roadmap', columns: Array(3)}

  const [selectedColumn, setSelectedColumn] = useState<BoardColumns | null>(null)
  const [selectedTask, setSelectedTask] = useState<BoardTasks | null>(null)
  const [selectedBoard, setSelectedBoard] = useState<Board>(boardsData[0])
  // console.log({ selectedBoard });
  // {name: 'Platform Launch', columns: Array(3)}
  // name: "Platform Launch"
  // columns: Array(3)
  /// 0: name: "Todo"
  /// tasks: Array(4)
  /// .. 0: title: "Build UI for onboarding flow"
  /// .. description: ""
  /// .. status: "Todo"
  /// .. subtasks: (3) [{…}, {…}, {…}]
  /// .. 1: {title: 'Build UI for search', description: '', status: 'Todo', subtasks: Array(1)}
  /// .. 2: {title: 'Build settings UI', description: '', status: 'Todo', subtasks: Array(2)}
  /// .. 3: {title: 'QA and test all major user journeys', description: 'Once we feel version one is ready, we need to rigo…rnally and externally to identify any major gaps.', status: 'Todo', subtasks: Array(2)}
  // 1: {name: 'Doing', tasks: Array(6)}
  // 2: {name: 'Done', tasks: Array(7)}

  const showSubtasks = (task: BoardTasks, column: BoardColumns) => {
    // setIsSubtasksOpen(true);
    setActiveModalName('subtasksModal')

    console.log('show subtasks selected task:', { task })
    setSelectedTask(task)
    console.log('show subtasks selected column', { column })
    setSelectedColumn(column)
    // column:
    // name: "Doing"
    // tasks: Array(6)
    // ... 0: {title: 'Design settings and search pages', description: '', status: 'Doing', subtasks: Array(3)}
    // ... ... 0:
    // ... ... description: ""
    // ... ... status: "Doing"
    // ... ... subtasks: (3) [{…}, {…}, {…}]
    // ... ... title: "Design settings and search pages"
    // ...
    // ... 1: {title: 'Add account management endpoints', description: '', status: 'Doing', subtasks: Array(3)}
    // ... 2: {title: 'Design onboarding flow', description: '', status: 'Doing', subtasks: Array(3)}
    // ... 3: {title: 'Add search endpoints', description: '', status: 'Doing', subtasks: Array(2)}
    // ... 4: {title: 'Add authentication endpoints', description: '', status: 'Doing', subtasks: Array(2)}
    // ... 5: {title: 'Research pricing points of various competitors and trial different business models', description: "We know what we're planning to build for version o…he subtasks until we have a coherent proposition.", status: 'Doing', subtasks: Array(3)}
    // length: 6
  }

  // Handle switch / select board
  const handleSwitchSelectBoard = (boardName: string) => {
    const newSelectedBoard = boardsData.filter((board) => board.name === boardName)
    console.log({ newSelectedBoard }, 'new selected board')
    // newSelectedBoard: Array(1)
    // 0:
    // columns: (3) [{…}, {…}, {…}]
    // name: "Marketing Plan"
    setSelectedBoard(newSelectedBoard[0])
  }

  // Subtask checkbox tick in modal
  const handleSubtaskChange = (task: BoardTasks, subtask: BoardSubTasks) => {
    console.log('handle subtask change:', { task })
    // {task: {…}}
    // title: "Design settings and search pages"
    // description: ""
    // status: "Doing"
    // subtasks: Array(3)
    // 0: {title: 'Settings - Account page', isCompleted: true}
    // 1: {title: 'Settings - Billing page', isCompleted: true}
    // 2: {title: 'Search page', isCompleted: false}

    console.log({ subtask })
    // subtask: {…}}
    /// subtask: isCompleted: true title: "Settings - Billing page"
    const updatedSubtask = { ...subtask, isCompleted: !subtask.isCompleted } // ???????
    // console.log({ updatedSubtask });

    // ? prevent undefined ?
    if (selectedTask) {
      const updatedSubtasks = selectedTask.subtasks.map((el: BoardSubTasks) => {
        // console.log({ el });
        if (el.title === subtask.title) {
          console.log('got one:', el)
          return { ...el, isCompleted: !el.isCompleted }
        }
        return el
      })
      // console.log({ updatedSubtasks });
      // updatedSubtasks: Array(3)
      // 0: {title: 'Settings - Account page', isCompleted: true}
      // 1: {title: 'Settings - Billing page', isCompleted: true}
      // 2: {title: 'Search page', isCompleted: true}
      console.log({ selectedColumn })

      setSelectedTask({ ...selectedTask, subtasks: updatedSubtasks })

      // console.log({ selectedBoard });
      // {selectedBoard: {…}}
      // selectedBoard:
      // columns: (3) [{…}, {…}, {…}]
      // name: "Platform Launch"
      setSelectedBoard({
        ...selectedBoard,
        columns: selectedBoard.columns.map((column: BoardColumns) => {
          if (column.name === selectedTask.status) {
            const updatedTasks = column.tasks.map((el) => {
              if (el.title === task.title) {
                return { ...el, subtasks: updatedSubtasks }
              } else return el
            })

            // console.log({ updatedSubtasks });
            // updatedSubtasks: Array(3)
            // 0: {title: 'Settings - Account page', isCompleted: true}
            // 1: {title: 'Settings - Billing page', isCompleted: true}
            // 2: {title: 'Search page', isCompleted: false}

            // console.log({ updatedTasks });
            // updatedTasks: Array(6)
            // 0: Array(3)
            // ...  0: {title: 'Settings - Account page', isCompleted: true}
            // ... 1: {title: 'Settings - Billing page', isCompleted: true}
            // ... 2: {title: 'Search page', isCompleted: true}
            //
            // 1: {title: 'Add account management endpoints', description: '', status: 'Doing', subtasks: Array(3)}
            // 2: {title: 'Design onboarding flow', description: '', status: 'Doing', subtasks: Array(3)}
            // 3: {title: 'Add search endpoints', description: '', status: 'Doing', subtasks: Array(2)}
            // 4: {title: 'Add authentication endpoints', description: '', status: 'Doing', subtasks: Array(2)}
            // 5: {title: 'Research pricing points of various competitors and trial different business models', description: "We know what we're planning to build for version o…he subtasks until we have a coherent proposition.", status: 'Doing', subtasks: Array(3)}

            let updatedColumn = { ...column, tasks: updatedTasks }
            // console.log({ updatedColumn });
            // updatedColumn:
            // name: "Doing"
            // tasks: Array(6)
            // ... 0: Array(3)
            // ... 0: {title: 'Settings - Account page', isCompleted: true}
            // ... 1: {title: 'Settings - Billing page', isCompleted: true}
            // ... 2: {title: 'Search page', isCompleted: true}
            //
            // 1: {title: 'Add account management endpoints', description: '', status: 'Doing', subtasks: Array(3)}
            // 2: {title: 'Design onboarding flow', description: '', status: 'Doing', subtasks: Array(3)}
            // 3: {title: 'Add search endpoints', description: '', status: 'Doing', subtasks: Array(2)}
            // 4: {title: 'Add authentication endpoints', description: '', status: 'Doing', subtasks: Array(2)}
            // 5: {title: 'Research pricing points of various competitors and trial different business models', description: "We know what we're planning to build for version o…he subtasks until we have a coherent proposition.", status: 'Doing', subtasks: Array(3)}

            return updatedColumn
          } else {
            // console.log({ column });
            // column:
            // name: "Doing"
            // tasks: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
            return column
          }
        })
      })
    } // end prevent undefined
  }

  // Task status change
  const handleStatusChange = (newStatus: string, oldStatus: string, task: BoardTasks) => {
    console.log(
      'handle status change',
      'newStatus:',
      newStatus,
      'oldStatus:',
      oldStatus,
      task
    )
    // console.log({ newStatus }); // 'Todo'
    // console.log({ oldStatus }); // 'Doing'
    // console.log({ task }); // task: {title: 'Design settings and search pages', description: '', status:'Doing'...
    const updatedTaskWithNewStatus = { ...task, status: newStatus }
    // console.log({ updatedTaskWithNewStatus });
    // updatedTaskWithNewStatus:
    // description: ""
    // status: "Done"
    // subtasks: (3) [{…}, {…}, {…}]
    // title: "Design settings and search pages

    // console.log({ selectedBoard });
    // selectedBoard:
    // columns: Array(3)
    // ... 0: {name: 'Todo', tasks: Array(4)}
    // ... ... 0:
    // ... ... name: "Todo"
    // ... ... tasks: Array(4)
    // ... ... 0: {title: 'Build UI for onboarding flow', description: '', status: 'Todo', subtasks: Array(3)}
    // ... ... 1: {title: 'Build UI for search', description: '', status: 'Todo', subtasks: Array(1)}
    // ... ... 2: {title: 'Build settings UI', description: '', status: 'Todo', subtasks: Array(2)}
    // ... ... 3: {title: 'QA and test all major user journeys', descrip...
    // ... 1: {name: 'Doing', tasks: Array(6)}
    // ... 2: {name: 'Done', tasks: Array(7)}
    // name: "Platform Launch"

    setSelectedBoard({
      ...selectedBoard,
      columns: selectedBoard.columns.map((column: BoardColumns) => {
        // Add task to selected status column
        if (column.name === updatedTaskWithNewStatus.status) {
          const updatedTasks = [...column.tasks, updatedTaskWithNewStatus]
          // console.log({ updatedTasks });
          // updatedTasks: Array(5)
          // 0: {title: 'Build UI for onboarding flow', description: '', status: 'Todo', subtasks: Array(3)}
          // 1: {title: 'Build UI for search', desc...
          return { ...column, tasks: updatedTasks }
        }
        // Delete task from old status column
        if (column.name === oldStatus) {
          // console.log(column, "found"); // {name: 'Doing', tasks: Array(6)} 'found'
          // splice(start: number, deleteCount?: number): T[];
          // column.tasks.splice;
          const newTasksWithRemovedTask = column.tasks.filter((item) => {
            return item.title !== task.title
          })
          return {
            ...column,
            tasks: newTasksWithRemovedTask
          }
        }
        return column
      })
    })
    // end handle status change

    // Close subtask modal - //TODO: this temp. fixes bug: if change status more than once in open modal -> causes duplicate task in columns (not updating current/old status)
    // setIsSubtasksOpen(false);
    setActiveModalName(null) // TODO: refactor modals more?
  }

  // Add new column to board
  const addNewColumnToBoard = (newColumnsName: { name: string }[], boardName: string) => {
    // console.log({ newColumnsName });
    // {newColumnsName: Array(1)}
    // newColumnsName: Array(1)
    // 0: {name: '1111'}
    const newColumns = newColumnsName.map((columnName) => ({
      name: columnName.name,
      color: generateColumnColor(),
      tasks: []
    }))

    console.log(selectedBoard) // undefined if removed all boards

    if (selectedBoard) {
      // TODO: refactor?
      const updatedBoardsDataWithNewName = boardsData.map((board) => {
        if (board.name === selectedBoard.name) {
          return { name: boardName, columns: [...selectedBoard?.columns, ...newColumns] }
        } else return board
      })
      setBoardsData(updatedBoardsDataWithNewName) // ? refactor?
      setSelectedBoard({
        ...selectedBoard,
        name: boardName,
        columns: [...selectedBoard?.columns, ...newColumns]
      })
    } else {
      // TODO: refactor?
      setSelectedBoard({ name: boardName, columns: newColumns })
      setBoardsData([{ name: boardName, columns: newColumns }])
    }

    // setIsNewColumnFormOpen(false);
    setActiveModalName(null) // TODO: refactor modals more?
  }

  // Update board when add new column to board -> to save changes before switch to another board in sidebar menu
  useEffect(() => {
    setBoardsData(
      boardsData.map((board) => {
        if (board.name === selectedBoard.name) {
          // console.log("match select board", selectedBoard);
          return selectedBoard
        } else return board
      })
    )
  }, [selectedBoard])

  // Handle delete board (header more info button option)
  const handleDeleteBoard = (selectedBoardName: string) => {
    console.log('handle delete board')
    const newBoardsDataWithRemovedBoard = boardsData.filter(
      (board) => board.name !== selectedBoardName
    )

    console.log(newBoardsDataWithRemovedBoard)
    setBoardsData(newBoardsDataWithRemovedBoard)

    // Update selected board after board deletion switch to first board in new board data array:
    // prevent nullish (null/undefined) - add .? optional chaining
    // Unhandled Runtime Error // TypeError: Cannot read properties of undefined (reading 'name')
    if (selectedBoard?.name === selectedBoardName) {
      console.log('update selected board after deletion')
      setSelectedBoard(newBoardsDataWithRemovedBoard[0])
      console.log({ selectedBoard }, 'selected board')
    }
  }

  // Handle delete column (new column modal option)
  const handleDeleteColumn = (columnName: string) => {
    const updatedColumnsAfterDeletion = selectedBoard.columns.filter(
      (column) => column.name !== columnName
    )

    console.log('deleting column:', columnName)
    console.log(updatedColumnsAfterDeletion, 'updated columns')

    setSelectedBoard({ ...selectedBoard, columns: updatedColumnsAfterDeletion })
  }

  // Handle add new board (sidemenu button)
  const handleAddNewBoard = (boardName: string, columnsNames: { name: string }[]) => {
    console.log('handle add new board')
    // TODO: refactor?
    // make columns array:
    const boardColumns = columnsNames.map((columnName) => ({
      name: columnName.name,
      color: generateColumnColor(),
      tasks: []
    }))
    // make board object:
    const newBoard = {
      name: boardName,
      columns: boardColumns
    }
    // add new board to array:
    setBoardsData([...boardsData, newBoard])
    // close form modal:
    // setIsNewBoardFormOpen(false);
    setActiveModalName(null) // TODO: refactor modals more?

    // console.log(selectedBoard, "check current selected board while adding new board"); // undefined (when all boards deleted beforehand)
    // delete all boards beforehand -> selectedBoard = undefined, after adding new board to empty data list -> not auto selected on page
    if (selectedBoard == null) {
      console.log('null/undefined selectedBoard, set to boardsData[0] manually')
      // console.log(boardsData[0], "0000"); // undefined '0000'
      // setSelectedBoard(boardsData[0]); // ! no -> undefined
      setSelectedBoard(newBoard) // works
    }
  }

  // Dark / Light Theme
  const [darkTheme, setDarkTheme] = useState(false)

  // Toggle browser scrollbar color (+.css):
  // document.documentElement.setAttribute( "data-color-scheme", darkTheme ? "light" : "dark")

  // Save theme to local storage
  useEffect(() => {
    console.log('dark theme state on load:', darkTheme)
    console.log('get local storage theme:', localStorage.getItem('theme'))
    if (
      // if saved dark theme in local storage or device prefers dark mode - set dark theme
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme:dark)').matches)
    ) {
      console.log('dark mode load, set dark')
      setDarkTheme(true)
      // localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute('data-color-scheme', 'dark')
    } else {
      // else set light theme
      console.log('light mode load, set light')
      setDarkTheme(false)
      // localStorage.setItem("theme", "light");
      document.documentElement.setAttribute('data-color-scheme', 'light')
    }
  }, [])

  // Modals
  const [activeModalName, setActiveModalName] = useState<string | null>(null)
  // Show active modal:
  const modalManager = (activeModalName: string | null) => {
    // TODO: refactor names? */
    switch (activeModalName) {
      case 'newTaskModal':
        return (
          <NewTaskFormModal
            isNewTaskFormOpen={activeModalName}
            setIsNewTaskFormOpen={setActiveModalName}
            setSelectedBoard={setSelectedBoard}
            selectedBoard={selectedBoard}
          />
        )
      case 'subtasksModal':
        return (
          <SubtasksModal
            selectedBoard={selectedBoard}
            isSubtasksOpen={activeModalName}
            setIsSubtasksOpen={setActiveModalName}
            selectedTask={selectedTask}
            handleSubtaskChange={handleSubtaskChange}
            handleStatusChange={handleStatusChange}
          />
        )
      case 'newColumnModal':
        return (
          <EditBoardFormModal
            isNewColumnFormOpen={activeModalName}
            setIsNewColumnFormOpen={setActiveModalName}
            selectedBoard={selectedBoard}
            addNewColumnToBoard={addNewColumnToBoard}
            handleDeleteColumn={handleDeleteColumn}
            kind={'newColumn'}
          />
        )
      case 'editBoardModal':
        return (
          <EditBoardFormModal
            isNewColumnFormOpen={activeModalName}
            setIsNewColumnFormOpen={setActiveModalName}
            selectedBoard={selectedBoard}
            addNewColumnToBoard={addNewColumnToBoard}
            handleDeleteColumn={handleDeleteColumn}
            kind={'editBoard'}
          />
        )
      case 'newBoardFormModal':
        return (
          <NewBoardFormModal
            isNewBoardFormOpen={activeModalName}
            setIsNewBoardFormOpen={setActiveModalName}
            handleAddNewBoard={handleAddNewBoard}
          />
        )
    }
  }

  return (
    <>
      <Head>
        <title>Task Management App - NextJS</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
      </Head>

      <main
        className={`${darkTheme ? 'dark' : ''} flex max-h-screen min-h-screen flex-col`}
      >
        {/* max-h-screen - prevents scroll on open pos:fixed modals (menu, new task form) */}
        <Header
          isBoardMenuOpen={isBoardMenuOpen}
          setIsBoardMenuOpen={setIsBoardMenuOpen}
          darkTheme={darkTheme}
          selectedBoard={selectedBoard}
          handleDeleteBoard={handleDeleteBoard}
          setActiveModalName={setActiveModalName}
        />

        {modalManager(activeModalName)}

        <Boards
          isBoardMenuOpen={isBoardMenuOpen}
          setIsBoardMenuOpen={setIsBoardMenuOpen}
          darkTheme={darkTheme}
          setDarkTheme={setDarkTheme}
          boardsData={boardsData}
          selectedBoard={selectedBoard}
          showSubtasks={showSubtasks}
          handleSwitchSelectBoard={handleSwitchSelectBoard}
          setActiveModalName={setActiveModalName}
          setSelectedBoard={setSelectedBoard}
        />
      </main>
    </>
  )
}

export default Home
