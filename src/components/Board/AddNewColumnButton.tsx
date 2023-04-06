import React from 'react'
import { useDispatch } from 'react-redux'
import PlusSvg from '../../assets/icons/icon-add-task-mobile.svg'
import { showModal } from '../../redux/BoardSlice/BoardSlice'

const AddNewColumnButton = () => {
  const dispatch = useDispatch()

  return (
    <section className='mb-4 pt-8'>
      {/* // <section className='h-screen pt-8'> */}
      {/* pt-10 to offset top for missing title compared to columns? */}
      {/* mb-16 to match left column botom spacing? */}
      <button
        onClick={() => {
          console.log('open new column modal')
          dispatch(showModal('newColumnModal'))
        }}
        aria-label='add new column'
        className='text-grey group flex h-full w-72 items-center justify-center gap-1 rounded-lg  border border-gray-200 bg-gradient-to-b from-[#bab2eb33] via-[#908db11a] to-[rgba(130,143,163,0)] py-2.5 px-4.5  text-center font-bold text-black shadow-task hover:fill-[#805fc7] hover:text-[#635FC7] focus:outline-offset-2 focus-visible:outline-offset-2 dark:border-[#86868619] dark:from-[rgba(121,132,147,.2)] dark:via-[rgba(130,143,163,.1)] dark:text-[#828fa3] dark:shadow'
      >
        <PlusSvg className='group-hover:text-[#635FC7]' />
        <span className='text-2xl group-hover:text-[#635FC7]'>New column</span>
      </button>
    </section>
  )
}

export default AddNewColumnButton
