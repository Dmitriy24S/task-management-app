import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import data from '../../assets/data/data.json'
import { Board, BoardColumns, BoardSubTasks, BoardTasks } from '../../types'

interface InitalStateType {
  isBoardMenuOpen: boolean
  boardsData: Board[] // boardsData: typeof data.boards
  selectedColumn: string | null
  selectedTask: BoardTasks | null
  selectedBoard: Board // selectedBoard: typeof data.boards[0]
  activeModalName: string | null
  darkTheme: boolean
}

const initialState: InitalStateType = {
  isBoardMenuOpen: false,
  boardsData: data.boards,
  selectedColumn: null,
  selectedTask: null,
  selectedBoard: data.boards[0],
  activeModalName: null,
  darkTheme: false,
  // TODO: theme color switch flash on load?
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    showSubtasks: (state, action) => {
      state.activeModalName = 'subtasksModal'
      state.selectedTask = action.payload.task // TODO: payload type any
      state.selectedColumn = action.payload.column
    },
    showModal: (state, action) => {
      state.activeModalName = action.payload // TODO: payload type + enum / type for modal names?
    },
    closeModal: (state) => {
      state.activeModalName = null
      state.selectedTask = null
      state.selectedColumn = null
    },
    // Subtask checkbox tick in modal, etc
    handleSubtaskChange: (
      state,
      action: PayloadAction<{ task: BoardTasks; subtask: BoardSubTasks }>
    ) => {
      if (state.selectedTask) {
        const updatedSubtasks = state.selectedTask.subtasks.map((subtask) => {
          if (subtask.title === action.payload.subtask.title) {
            // return { ...el, isCompleted: !el.isCompleted }
            const updatedSubtask = { ...subtask, isCompleted: !subtask.isCompleted }
            return updatedSubtask
          }
          return subtask
        })

        state.selectedTask = { ...state.selectedTask, subtasks: updatedSubtasks }

        const updatedColumns = state.selectedBoard.columns.map((column) => {
          if (column.name === state?.selectedTask?.status) {
            const updatedTasks = column.tasks.map((el) => {
              if (el.title === action.payload.task.title) {
                return { ...el, subtasks: updatedSubtasks }
              } else return el
            })
            const updatedColumn = { ...column, tasks: updatedTasks }

            return updatedColumn
          } else {
            return column
          }
        })

        state.selectedBoard = {
          ...state.selectedBoard,
          columns: updatedColumns,
        }
      }
    },
    handleTaskStatusChange: (state, action) => {
      const updatedTaskWithNewStatus = {
        ...action.payload.task,
        status: action.payload.newStatus,
      }

      state.selectedBoard = {
        ...state.selectedBoard,
        columns: state.selectedBoard.columns.map((column: BoardColumns) => {
          // Add task to selected status column
          if (column.name === updatedTaskWithNewStatus.status) {
            const updatedTasks = [...column.tasks, updatedTaskWithNewStatus]
            return { ...column, tasks: updatedTasks }
          }
          // Delete task from old status column
          if (column.name === action.payload.oldStatus) {
            const newTasksWithRemovedTask = column.tasks.filter((item) => {
              return item.title !== action.payload.task.title
            })
            return {
              ...column,
              tasks: newTasksWithRemovedTask,
            }
          }
          return column
        }),
      }
    },
    // TODO: refactor board funcs/names
    updateSelectedBoard: (state, action: PayloadAction<BoardTasks>) => {
      const { title, description, status, subtasks } = action.payload
      const newTask = { title, description, status, subtasks }

      state.selectedBoard = {
        ...state.selectedBoard,
        columns: state.selectedBoard.columns.map((column: BoardColumns) => {
          if (column.name === status) {
            const updatedTasks = [...column.tasks, newTask]
            return { ...column, tasks: updatedTasks }
          }
          return column
        }),
      }
    },
    // TODO: refactor board funcs/names
    setSelectedBoard: (state, action: PayloadAction<Board>) => {
      const selectedBoard = action.payload
      state.selectedBoard = selectedBoard
    },
    addNewColumnToBoard: (
      state,
      action: PayloadAction<{
        newColumnsName: { name: string }[]
        boardName: string
      }>
    ) => {
      const { boardName } = action.payload

      const newColumns = action.payload.newColumnsName.map((columnName) => ({
        name: columnName.name,
        color: generateColumnColor(),
        tasks: [],
      }))

      if (state.selectedBoard) {
        const updatedBoardsDataWithNewName = state.boardsData.map((board) => {
          if (board.name === state.selectedBoard.name) {
            return {
              name: boardName,
              columns: [...state.selectedBoard?.columns, ...newColumns],
            }
          } else return board
        })

        state.boardsData = updatedBoardsDataWithNewName
        state.selectedBoard = {
          ...state.selectedBoard,
          name: boardName,
          columns: [...state.selectedBoard?.columns, ...newColumns],
        }
      } else {
        state.selectedBoard = { name: boardName, columns: newColumns }
        state.boardsData = [{ name: boardName, columns: newColumns }]
      }
    },
    // Handle add new board (sidemenu button)
    addNewBoard: (
      state,
      action: PayloadAction<{
        boardName: string
        columnsNames: { name: string }[]
      }>
    ) => {
      console.log('REDUX addNewBoard')
      const { boardName, columnsNames } = action.payload

      // make columns array:
      const boardColumns = columnsNames.map((columnName) => ({
        name: columnName.name,
        color: generateColumnColor(),
        tasks: [],
      }))
      // make board object:
      const newBoard = {
        name: boardName,
        columns: boardColumns,
      }
      // add new board to array:
      state.boardsData = [...state.boardsData, newBoard]
      // close form modal:
      // setActiveModalName(null)

      // delete all boards beforehand -> selectedBoard = undefined, after adding new board to empty data list -> not auto selected on page
      if (state.selectedBoard == null) {
        state.selectedBoard = newBoard
      }
    },
    // Handle delete column (new column modal option)
    deleteColumn: (state, action: PayloadAction<{ columnName: string }>) => {
      const { columnName } = action.payload

      const updatedColumnsAfterDeletion = state.selectedBoard.columns.filter(
        (column) => column.name !== columnName
      )
      state.selectedBoard = {
        ...state.selectedBoard,
        columns: updatedColumnsAfterDeletion,
      }
    },
    // Handle delete board (header more info button option)
    deleteBoard: (state, action: PayloadAction<{ selectedBoardName: string }>) => {
      const { selectedBoardName } = action.payload

      const newBoardsDataWithRemovedBoard = state.boardsData.filter(
        (board) => board.name !== selectedBoardName
      )
      state.boardsData = newBoardsDataWithRemovedBoard
      // Update selected board after board deletion switch to first board in new board data array:
      // prevent nullish (null/undefined) - add .? optional chaining
      if (state.selectedBoard?.name === selectedBoardName) {
        state.selectedBoard = newBoardsDataWithRemovedBoard[0]
      }
    },
    switchSelectedBoard: (state, action: PayloadAction<{ boardName: string }>) => {
      const newSelectedBoard = state.boardsData.filter(
        (board) => board.name === action.payload.boardName
      )
      state.selectedBoard = newSelectedBoard[0]
    },
    toggleDarkTheme: (state, action: PayloadAction<boolean>) => {
      state.darkTheme = action.payload
    },
    toggleBoardMenu: (state, action: PayloadAction<boolean>) => {
      state.isBoardMenuOpen = action.payload
    },
  },
})

const generateColumnColor = () => {
  let rand = Math.random() // 0.5983916920571346 '1 rand'
  rand = Math.floor(rand * 360) // 215 '2 rand * 360'
  rand = rand + 1 // 216 '3 rand + 1'

  const randomColor = `hsl(${rand}, 80%, 70%)` // hsl(216, 80%, 70%)

  return randomColor // #8471F2 //  hsl(216, 80%, 70%)
}

// Action creators are generated for each case reducer function
export const {
  showSubtasks,
  showModal,
  closeModal,
  handleSubtaskChange,
  handleTaskStatusChange,
  updateSelectedBoard,
  setSelectedBoard,
  addNewColumnToBoard,
  addNewBoard,
  deleteColumn,
  deleteBoard,
  switchSelectedBoard,
  toggleDarkTheme,
  toggleBoardMenu,
} = boardSlice.actions

export default boardSlice.reducer
