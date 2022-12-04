import Image from 'next/image'
import React from 'react'
import { FaChevronDown } from 'react-icons/fa'
import PlusSvg from '../../assets/icons/icon-add-task-mobile.svg'
import { Board } from '../../types'
import Button from '../Shared/Button'
import HeaderAddTaskButton from './HeaderAddTaskButton'
import HeaderMoreInfoButton from './HeaderMoreInfoButton'

interface HeaderProps {
  isBoardMenuOpen: boolean
  setIsBoardMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  darkTheme: boolean | null
  selectedBoard: Board
  handleDeleteBoard: (selectedBoardName: string) => void
  // setActiveModalName: React.Dispatch<React.SetStateAction<string>>;
  setActiveModalName: React.Dispatch<React.SetStateAction<string | null>>
}

const Header = ({
  isBoardMenuOpen,
  setIsBoardMenuOpen,
  darkTheme,
  selectedBoard,
  handleDeleteBoard,
  setActiveModalName
}: HeaderProps) => {
  return (
    <header className='fixed top-0 left-0 right-0 z-20 flex h-16 items-center bg-white dark:bg-[#2B2C37] dark:text-white'>
      <div className='flex h-full w-full items-center md:items-stretch'>
        <div className='hidden w-64 items-center border-r pl-8  md:flex md:border-gray-200 dark:md:border-gray-700'>
          <div className='hidden md:mr-4 md:mb-[1px] md:flex md:items-end'>
            <Image
              src={`/assets/icons/logo-${darkTheme ? 'light' : 'dark'}.svg`}
              height={26}
              width={161}
              layout='fixed'
              alt='logo'
              priority
            />
          </div>
        </div>
        {/* Logo */}
        <div className='flex self-center pl-4 md:hidden'>
          <Image src='/assets/icons/logo-mobile.svg' height={25} width={25} alt='logo' />
        </div>
        {/* Active board name / open/close sidebar menu */}
        <button
          className='relative ml-4 flex items-center gap-1 self-center text-base font-bold before:absolute before:-inset-1 before:top-full before:left-0 before:block before:h-0.5 before:w-0 before:bg-[#635FC7] before:opacity-100 before:transition-all before:duration-300 hover:before:w-full hover:before:opacity-100 md:text-2xl md:focus:outline-offset-2 md:focus-visible:outline-offset-2'
          onClick={() => {
            setIsBoardMenuOpen(!isBoardMenuOpen)
          }}
        >
          {selectedBoard?.name} <FaChevronDown fill='#635FC7' className='md:hidden' />
        </button>

        <div className='header-right ml-auto flex items-center pr-4 md:gap-1.5'>
          <Button
            type='button'
            style='main-thin'
            // TODO: refactor func.?
            onClick={() => {
              console.log('open task modal')
              // setIsNewTaskFormOpen(true);
              setActiveModalName('newTaskModal')
            }}
          >
            <PlusSvg />
            Add New Task
          </Button>
          {/* <HeaderAddTaskButton setActiveModalName={setActiveModalName} /> */}
          <HeaderMoreInfoButton
            selectedBoardName={selectedBoard?.name}
            handleDeleteBoard={handleDeleteBoard}
            setActiveModalName={setActiveModalName}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
