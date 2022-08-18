import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [isBoardMenuOpen, setIsBoardMenuOpen] = useState(true);

  return (
    <>
      <Header isBoardMenuOpen={isBoardMenuOpen} setIsBoardMenuOpen={setIsBoardMenuOpen} />
    </>
  );
};

export default Home;
