import { configureStore } from '@reduxjs/toolkit'
import reducer, { pgSlice } from './slice'

const store = configureStore({
  reducer: reducer
})

export const actions = pgSlice.actions

export type IAppState = ReturnType<typeof store.getState>;

export default store
