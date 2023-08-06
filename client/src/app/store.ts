import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import LoginReducer from "../components/login/LoginSlice"
import TaskReducer from "../components/task/taskSlice"


export const store = configureStore({
  reducer: {
    login: LoginReducer,
    task: TaskReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
