// store.js
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import employeeReducer from './Employee/employeeSlice'
import holidayReducer from './Holiday/holidaySlice'
import timeEntriesReducer from './TimeEntries/timeEntriesSlice'

export const store = configureStore({
    reducer: {
        employee: employeeReducer,
        holiday: holidayReducer,
        timeEntries: timeEntriesReducer,
    },
    middleware: [thunk],
})
