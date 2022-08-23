import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import data from "../assets/data/data.json";
import Boards from "../components/Board/Boards";
import Header from "../components/Header/Header";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  // const [selectedBoard, setSelectedBoard] = useState(null)
  const [selectedBoard, setSelectedBoard] = useState(data.boards[0]);
  // console.log(selectedBoard);
  // {name: 'Platform Launch', columns: Array(3)}
  // columns: Array(3)
  // 0:
  // name: "Todo"
  // tasks: Array(4)
  // 0:
  // description: ""
  // status: "Todo"
  // subtasks: (3) [{…}, {…}, {…}]
  // title: "Build UI for onboarding flow"
  // [[Prototype]]: Object
  // 1: {title: 'Build UI for search', description: '', status: 'Todo', subtasks: Array(1)}
  // 2: {title: 'Build settings UI', description: '', status: 'Todo', subtasks: Array(2)}
  // 3: {title: 'QA and test all major user journeys', description: 'Once we feel version one is ready, we need to rigo…rnally and externally to identify any major gaps.', status: 'Todo', subtasks: Array(2)}
  // length: 4
  // [[Prototype]]: Array(0)
  // [[Prototype]]: Object
  // 1: {name: 'Doing', tasks: Array(6)}
  // 2: {name: 'Done', tasks: Array(7)}
  // length: 3
  // [[Prototype]]: Array(0)
  // name: "Platform Launch"

  const [isBoardMenuOpen, setIsBoardMenuOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [boardsData, setBoardsData] = useState(data.boards);

  // console.log(boardsData);
  // console.log(data);
  // boards: Array(3)
  //.. 0: columns: Array(3)
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

  // Dark / Light Theme

  // Toggle browser scrollbar color (+.css):
  // document.documentElement.setAttribute( "data-color-scheme", darkTheme ? "light" : "dark")

  // Save theme to local storage
  useEffect(() => {
    console.log(darkTheme, ": dark theme state on load");
    console.log(localStorage.getItem("theme"), "get local storage theme");
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
    <main className={`${darkTheme ? "dark" : ""} flex min-h-screen flex-col`}>
      <Header
        isBoardMenuOpen={isBoardMenuOpen}
        setIsBoardMenuOpen={setIsBoardMenuOpen}
        darkTheme={darkTheme}
        selectedBoard={selectedBoard}
      />
      <Boards
        isBoardMenuOpen={isBoardMenuOpen}
        setIsBoardMenuOpen={setIsBoardMenuOpen}
        darkTheme={darkTheme}
        setDarkTheme={setDarkTheme}
        boardsData={boardsData}
        selectedBoard={selectedBoard}
      />
    </main>
  );
};

export default Home;
