import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { deleteBoard, showModal } from '../../redux/BoardSlice/BoardSlice'

interface Props {
  selectedBoardName: string
}

const HeaderMoreInfoButton = ({ selectedBoardName }: Props) => {
  const dispatch = useDispatch()

  return (
    <Menu as='div' className='relative flex items-center justify-center self-stretch'>
      <Menu.Button className='group rounded-full p-2'>
        <BsThreeDotsVertical
          fontSize={25}
          fill='#828fa3'
          className='transition-colors group-hover:fill-black group-focus-visible:fill-black ui-open:fill-black dark:group-hover:fill-white/80 dark:group-focus-visible:fill-white/80 dark:ui-open:fill-white/80'
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='menu t absolute right-0 top-full m-2 flex w-52 origin-top-right cursor-default flex-col gap-1 rounded-xl bg-white px-4 py-3 text-start shadow-md focus:outline-0 dark:bg-[#2B2C37] dark:text-white '>
          <Menu.Item>
            {({ active }) => (
              <button
                className={[
                  'rounded-lg p-4 text-left font-semibold transition-colors focus-visible:bg-indigo-500 focus-visible:text-white dark:focus-visible:text-white',
                  active
                    ? 'bg-indigo-500 text-white dark:text-white'
                    : 'text-dark-grey/70 dark:text-white/70',
                ].join(' ')}
                onClick={() => {
                  // e.currentTarget.blur(); // close dropdown on click -> otherwise only closes in background when click inside opened modal (daisyui)
                  // setActiveModalName('editBoardModal')
                  dispatch(showModal('editBoardModal'))
                }}
              >
                Edit Board
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={[
                  'rounded-lg p-4 text-left font-bold transition-colors focus-visible:bg-indigo-500 focus-visible:text-white dark:focus-visible:text-white',
                  active ? 'bg-red-600 text-white' : 'text-red-main',
                ].join(' ')}
                onClick={() => {
                  // e.currentTarget.blur(); // close dropdown on click (daisyui)
                  // handleDeleteBoard(selectedBoardName)
                  dispatch(deleteBoard({ selectedBoardName }))
                }}
              >
                Delete Board
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default HeaderMoreInfoButton
