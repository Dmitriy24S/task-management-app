import FocusTrap from 'focus-trap-react'
import React from 'react'

interface Props {
  children: React.ReactNode
  // isOpen: boolean;
  isOpen: string | null
  // setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<string | null>>
}

const Modal = ({ children, isOpen, setIsOpen }: Props) => {
  return (
    <div className={`modal-wrapper ${isOpen ? 'block max-h-screen' : 'hidden'} `}>
      <div
        // set backdrop z-index 40 and content z-index 50 (to be on top of mobile sidebar menu window - otherwise overlap 2x backdrops -> messes with click on backdrop closes sidemenu first while new board modal is open)
        className={`modal-backdrop fixed inset-0 z-40 bg-black opacity-60`}
        // onClick={() => setIsOpen(false)}
        onClick={() => setIsOpen(null)} // ! not work with focustrap? instead use FocusTrap options?
      />
      <section className='modal-content-container fixed left-0 right-0 z-50 mx-auto mt-20  max-h-[80vh] w-11/12 min-w-[20rem] max-w-md overflow-y-auto rounded-lg bg-white p-6 text-black dark:bg-[#2B2C37] dark:text-white sm:max-w-md'>
        <FocusTrap
          focusTrapOptions={{
            onDeactivate: () => setIsOpen(null),
            clickOutsideDeactivates: true,
            initialFocus: false
          }}
        >
          <aside className='flex flex-col gap-6'>{children}</aside>
        </FocusTrap>
      </section>
    </div>
  )
}

export default Modal
