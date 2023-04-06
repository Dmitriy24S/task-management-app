import FocusTrap from 'focus-trap-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../redux/BoardSlice/BoardSlice'

interface Props {
  children: React.ReactNode
  isOpen: string | null
}

const Modal = ({ children, isOpen }: Props) => {
  const dispatch = useDispatch()

  return (
    <FocusTrap
      focusTrapOptions={{
        onDeactivate: () => dispatch(closeModal()),
        clickOutsideDeactivates: true,
        initialFocus: false,
      }}
    >
      <div className={`modal-wrapper ${isOpen ? 'block max-h-screen' : 'hidden'} `}>
        <div
          className={`modal-backdrop fixed inset-0 z-40 bg-black opacity-60`}
          onClick={() => dispatch(closeModal())}
        />
        <section className='modal-content-container fixed left-0 right-0 z-50 mx-auto mt-20  max-h-[80vh] w-11/12 min-w-[20rem] max-w-md overflow-y-auto rounded-lg bg-white p-6 text-black dark:bg-[#2B2C37] dark:text-white sm:max-w-md'>
          <aside className='flex flex-col gap-6'>{children}</aside>
        </section>
      </div>
    </FocusTrap>
  )
}

export default Modal
