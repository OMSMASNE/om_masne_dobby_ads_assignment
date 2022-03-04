import { configureStore } from '@reduxjs/toolkit'

import historyReducers from './features/historySlice'

export default configureStore({
  reducer: {
      history: historyReducers,
  },
})
