import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import data from "../assets/data/data.json";
import Boards from "../components/Board/Boards";
import Header from "../components/Header/Header";
import NewTaskForm from "../components/NewTaskForm";
import SubtasksModal from "../components/SubtasksModal";
import styles from "../styles/Home.module.css";
import { Board, BoardColumns, BoardSubTasks, BoardTasks } from "../types";

const Home: NextPage = () => {
  const [isNewTaskFormOpen, setIsNewTaskFormOpen] = useState(false);
  const [isSubtasksOpen, setIsSubtasksOpen] = useState(false);
  const [isBoardMenuOpen, setIsBoardMenuOpen] = useState(false);

  const [boardsData, setBoardsData] = useState<Board[]>(data.boards);
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

  const [selectedColumn, setSelectedColumn] = useState<BoardColumns | null>(null);
  const [selectedTask, setSelectedTask] = useState<BoardTasks | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<Board>(data.boards[0]);
  console.log({ selectedBoard });
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
    setIsSubtasksOpen(true);
    console.log("show subtasks selected task:", { task });
    setSelectedTask(task);
    console.log("show subtasks selected column", { column });
    setSelectedColumn(column);
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
  };

  // Subtask checkbox tick in modal
  const handleSubtaskChange = (task: BoardTasks, subtask: BoardSubTasks) => {
    console.log("handle subtask change:", { task });
    // {task: {…}}
    // title: "Design settings and search pages"
    // description: ""
    // status: "Doing"
    // subtasks: Array(3)
    // 0: {title: 'Settings - Account page', isCompleted: true}
    // 1: {title: 'Settings - Billing page', isCompleted: true}
    // 2: {title: 'Search page', isCompleted: false}

    console.log({ subtask });
    // subtask: {…}}
    /// subtask: isCompleted: true title: "Settings - Billing page"
    const updatedSubtask = { ...subtask, isCompleted: !subtask.isCompleted }; // ???????
    // console.log({ updatedSubtask });

    // ? prevent undefined ?
    if (selectedTask) {
      const updatedSubtasks = selectedTask.subtasks.map((el: BoardSubTasks) => {
        // console.log({ el });
        if (el.title === subtask.title) {
          console.log("got one:", el);
          return { ...el, isCompleted: !el.isCompleted };
        }
        return el;
      });
      // console.log({ updatedSubtasks });
      // updatedSubtasks: Array(3)
      // 0: {title: 'Settings - Account page', isCompleted: true}
      // 1: {title: 'Settings - Billing page', isCompleted: true}
      // 2: {title: 'Search page', isCompleted: true}
      console.log({ selectedColumn });

      setSelectedTask({ ...selectedTask, subtasks: updatedSubtasks });

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
                return { ...el, subtasks: updatedSubtasks };
              } else return el;
            });

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

            let updatedColumn = { ...column, tasks: updatedTasks };
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

            return updatedColumn;
          } else {
            // console.log({ column });
            // column:
            // name: "Doing"
            // tasks: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
            return column;
          }
        }),
      });
    } // end prevent undefined
  };

  // Task status change
  const handleStatusChange = (newStatus: string, oldStatus: string, task: BoardTasks) => {
    console.log("handle status change");
    // console.log({ newStatus }); // 'Todo'
    // console.log({ oldStatus }); // 'Doing'
    // console.log({ task }); // task: {title: 'Design settings and search pages', description: '', status:'Doing'...
    const updatedTaskWithNewStatus = { ...task, status: newStatus };
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
        if (column.name === updatedTaskWithNewStatus.status) {
          const updatedTasks = [...column.tasks, updatedTaskWithNewStatus];
          // console.log({ updatedTasks });
          // updatedTasks: Array(5)
          // 0: {title: 'Build UI for onboarding flow', description: '', status: 'Todo', subtasks: Array(3)}
          // 1: {title: 'Build UI for search', desc...
          return { ...column, tasks: updatedTasks };
        }
        if (column.name === oldStatus) {
          // console.log(column, "found"); // {name: 'Doing', tasks: Array(6)} 'found'
          // splice(start: number, deleteCount?: number): T[];
          // column.tasks.splice;
          const newTasksWithRemovedTask = column.tasks.filter((item) => {
            return item.title !== task.title;
          });
          return {
            ...column,
            tasks: newTasksWithRemovedTask,
          };
        }
        return column;
      }),
    });
    // end handle status change
  };

  // Dark / Light Theme
  const [darkTheme, setDarkTheme] = useState(false);

  // Toggle browser scrollbar color (+.css):
  // document.documentElement.setAttribute( "data-color-scheme", darkTheme ? "light" : "dark")

  // Save theme to local storage
  useEffect(() => {
    console.log("dark theme state on load:", darkTheme);
    console.log("get local storage theme:", localStorage.getItem("theme"));
    if (
      // if saved dark theme in local storage or device prefers dark mode - set dark theme
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme:dark)").matches)
    ) {
      console.log("dark mode load, set dark");
      setDarkTheme(true);
      // localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-color-scheme", "dark");
    } else {
      // else set light theme
      console.log("light mode load, set light");
      setDarkTheme(false);
      // localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-color-scheme", "light");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Home App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className={`${darkTheme ? "dark" : ""} flex max-h-screen min-h-screen flex-col`}>
        {/*  max-h-screen - prevents scroll on open pos:fixed modals (menu, new task form) */}
        <Header
          isBoardMenuOpen={isBoardMenuOpen}
          setIsBoardMenuOpen={setIsBoardMenuOpen}
          darkTheme={darkTheme}
          selectedBoard={selectedBoard}
          setIsNewTaskFormOpen={setIsNewTaskFormOpen}
        />
        {/* New task form */}
        <NewTaskForm
          isNewTaskFormOpen={isNewTaskFormOpen}
          setIsNewTaskFormOpen={setIsNewTaskFormOpen}
        />
        <SubtasksModal
          isSubtasksOpen={isSubtasksOpen}
          setIsSubtasksOpen={setIsSubtasksOpen}
          selectedTask={selectedTask}
          handleSubtaskChange={handleSubtaskChange}
          handleStatusChange={handleStatusChange}
        />
        <Boards
          isBoardMenuOpen={isBoardMenuOpen}
          setIsBoardMenuOpen={setIsBoardMenuOpen}
          darkTheme={darkTheme}
          setDarkTheme={setDarkTheme}
          boardsData={boardsData}
          selectedBoard={selectedBoard}
          isNewTaskFormOpen={isNewTaskFormOpen}
          setIsNewTaskFormOpen={setIsNewTaskFormOpen}
          setIsSubtasksOpen={setIsSubtasksOpen}
          showSubtasks={showSubtasks}
        />
      </main>
    </>
  );
};

export default Home;
