import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Boards from "../components/Boards";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [isBoardMenuOpen, setIsBoardMenuOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  // Save theme to local storage
  useEffect(() => {
    console.log(darkTheme, ": dark theme on load");
    console.log(localStorage.getItem("theme"), "zzz");
    if (
      // if saved dark theme in local storage or device prefers dark mode - set dark theme
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme:dark)").matches)
    ) {
      console.log("dark mode load, set dark");
      setDarkTheme(true);
      // localStorage.setItem("theme", "dark");
    } else {
      // else set light theme
      console.log("light mode load, set light");
      setDarkTheme(false);
      // localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <main className={`${darkTheme ? "dark" : ""} flex min-h-screen flex-col`}>
      <Header
        isBoardMenuOpen={isBoardMenuOpen}
        setIsBoardMenuOpen={setIsBoardMenuOpen}
        darkTheme={darkTheme}
      />
      <Boards
        isBoardMenuOpen={isBoardMenuOpen}
        setIsBoardMenuOpen={setIsBoardMenuOpen}
        darkTheme={darkTheme}
        setDarkTheme={setDarkTheme}
      />
    </main>
  );
};

export default Home;
