import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Boards from '../components/Board/Boards'
import Header from '../components/Header/Header'
import EditBoardFormModal from '../components/ModalForms/EditBoardFormModal'
import NewBoardFormModal from '../components/ModalForms/NewBoardFormModal'
import NewTaskFormModal from '../components/ModalForms/NewTaskFormModal'
import SubtasksModal from '../components/ModalForms/SubtasksModal'
import { RootState } from '../redux'
import { toggleDarkTheme } from '../redux/BoardSlice/BoardSlice'

const Home: NextPage = () => {
  const dispatch = useDispatch()
  const { activeModalName, darkTheme } = useSelector((state: RootState) => state.board)

  // Save theme to local storage
  useEffect(() => {
    if (
      // if saved dark theme in local storage or device prefers dark mode - set dark theme
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme:dark)').matches)
    ) {
      dispatch(toggleDarkTheme(true))
      document.documentElement.setAttribute('data-color-scheme', 'dark')
    } else {
      // else set light theme
      dispatch(toggleDarkTheme(false))
      document.documentElement.setAttribute('data-color-scheme', 'light')
    }
  }, [])

  // Show active modal:
  const modalManager = (activeModalName: string | null) => {
    switch (activeModalName) {
      case 'newTaskModal':
        return <NewTaskFormModal isNewTaskFormOpen={activeModalName} />
      case 'subtasksModal':
        return <SubtasksModal isSubtasksOpen={activeModalName} />
      case 'newColumnModal':
        return (
          <EditBoardFormModal isNewColumnFormOpen={activeModalName} kind={'newColumn'} />
        )
      case 'editBoardModal':
        return (
          <EditBoardFormModal isNewColumnFormOpen={activeModalName} kind={'editBoard'} />
        )
      case 'newBoardFormModal':
        return <NewBoardFormModal isNewBoardFormOpen={activeModalName} />
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
        <Header />
        {modalManager(activeModalName)}
        <Boards />
      </main>
    </>
  )
}

export default Home
