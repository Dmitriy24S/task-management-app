import { useDispatch, useSelector } from 'react-redux'
import PlusSvg from '../../assets/icons/icon-add-task-mobile.svg'
import HideSidebarSVG from '../../assets/icons/sidebar-hide.svg'
import { RootState } from '../../redux'
import { showModal, toggleBoardMenu } from '../../redux/BoardSlice/BoardSlice'
import { Board } from '../../types'
import SidebarMenuListItem from './SidebarMenuListItem'
import ThemeToggle from './ThemeToggle'

const BoardSidebar = () => {
  const dispatch = useDispatch()
  const { selectedBoard, boardsData, isBoardMenuOpen } = useSelector(
    (state: RootState) => state.board
  )

  return (
    <>
      <div
        className={`${
          isBoardMenuOpen ? 'block' : 'hidden'
        } backdrop fixed inset-0 z-20 bg-black opacity-30 sm:hidden`}
        onClick={() => dispatch(toggleBoardMenu(false))}
      ></div>
      <div
        className={[
          'menu-container fixed right-0 left-0 z-20 mx-auto mt-20 w-80 overflow-x-hidden rounded-md bg-white fill-[#828FA3] text-[#828FA3] transition-transform duration-300 ease-in-out dark:bg-[#2B2C37] sm:relative sm:z-10 sm:mx-0 sm:mt-0 sm:max-w-[16rem] sm:rounded-none sm:pt-20',
          isBoardMenuOpen
            ? 'flex sm:w-full sm:translate-x-0 sm:border-r sm:border-gray-200 dark:sm:border-gray-700'
            : ' hidden sm:flex sm:-translate-x-full',
        ].join(' ')}
      >
        <div
          className={[
            'menu-content w-full flex-col gap-4 font-semibold sm:w-[320px] sm:max-w-[16rem] sm:pb-10',
            isBoardMenuOpen ? 'flex' : 'hidden',
          ].join(' ')}
        >
          <h2 className='min-w-max pl-8 pt-4 pb-0 text-xs uppercase tracking-[2px]'>
            All boards ({boardsData.length})
          </h2>
          <ul className='flex flex-col gap-2 sm:mr-4'>
            {boardsData.map((board: Board) => {
              // 2: {name: 'Roadmap', columns: Array(3)}
              //   return <SidebarMenuListItem name={board.name} />;
              // console.log(board.name);
              return (
                <SidebarMenuListItem key={board.name} selectedBoard={selectedBoard}>
                  {board.name}
                </SidebarMenuListItem>
              )
            })}
            {/* Create new board button */}
            <li className='w-full'>
              <button
                className='group flex w-full min-w-max items-center px-4 py-3 pl-8 text-[#6f6de0] hover:bg-[#6766ad22] sm:mr-8 sm:rounded-r-full'
                onClick={() => dispatch(showModal('newBoardFormModal'))}
              >
                {/* Plus svg */}
                <span className='mr-2.5'>
                  <svg
                    width='16'
                    height='16'
                    xmlns='http://www.w3.org/2000/svg'
                    className='mr-2 fill-[#6f6de0]'
                  >
                    <path d='M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z' />
                  </svg>
                </span>
                Create New Board
              </button>
            </li>
          </ul>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Hide sidebar button */}
          <button
            className='hover:fill-[hover:text-[#635fc7] group mt-4 hidden items-center gap-4 rounded-r-full p-4 pl-8 hover:bg-violet-100 hover:text-[#635fc7] dark:hover:bg-[#20212C] sm:mr-4 sm:flex'
            onClick={() => dispatch(toggleBoardMenu(false))}
          >
            {/* <Image
              src={`/assets/icons/sidebar-hide.svg`}
              height={16}
              width={18}
              layout="fixed"
              alt="logo"
              priority
              // color="#e5e7eb"
              // className="fill-red-500"
            /> */}
            <HideSidebarSVG className='group-hover:fill-[#635fc7] group-hover:text-[#635fc7]' />
            Hide sidebar
          </button>
        </div>
      </div>
    </>
  )
}

export default BoardSidebar
