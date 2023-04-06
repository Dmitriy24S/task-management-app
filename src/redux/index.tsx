// import { saveCart } from '../utils/localStorage'
import { configureStore } from '@reduxjs/toolkit'
import BoardSlice from './BoardSlice/BoardSlice'

export const store = configureStore({
  reducer: {
    board: BoardSlice,
  },
})

store.subscribe(() => {
  //   saveCart(store.getState().cart)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
