import React from 'react'
import { Board } from '../../types'

interface Props {
  children: React.ReactNode
  index: number
  selectedBoard: Board
  ref?: any
  provided?: any
}

const BoardColumn = ({ children }: Props) => {
  return (
    <section
      className={`mr-4 flex w-[22rem] flex-col gap-4`}
      // spacing to right of main board for view with x-overflow scroll
      // ${ index === selectedBoard.columns.length - 1 ? "pr-4" : "" }
    >
      {children}
    </section>
  )
}

export default BoardColumn
