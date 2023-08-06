import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
const authtoken = localStorage.getItem('authtoken');
const authid = localStorage.getItem('authid');

export interface CounterState {
  id: String,
  Authtoken: String
}

const initialState: CounterState = {
  id: authid,
  Authtoken : authtoken
}

export const counterSlice = createSlice({
  name: "data",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    
    // Use the PayloadAction type to declare the contents of `action.payload`
    update: (state, action: PayloadAction) => {
      
      if(action.payload.id) {
         state.id = action.payload.id
      }

      if(action.payload.Authtoken) {
        state.Authtoken = action.payload.Authtoken
      }

      if(action.payload.login) {
          window.location.replace('/');
      }
      if(action.payload.logout) {
        localStorage.removeItem('authid');
        localStorage.removeItem('authtoken');
     }

    },
  },
  
})

export const { update } = counterSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const dataLogin = (state: RootState) => state.login

export default counterSlice.reducer
