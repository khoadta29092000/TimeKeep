import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetWorkedSlotByIdEmployeeApi } from '../../Api/WorkSlotEmployeeApi'


const initialState = {
   
    WorkSlotByEmployee: [],
   
}

const authSlice = createSlice({
    name: 'WorkSlotEmployeeed',
    initialState,
    reducers: {
        clearWorkSlotEmployeeed: (state, action) => {
            state.WorkSlotByEmployee = []
           
        },
        ChangeTab: (state, action) => {
            console.log('action', action)
            state.valueTabs = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWorkSlotEmployeeedAsyncApi.pending, (state) => {
                state.loading = true
            })
            .addCase(getWorkSlotEmployeeedAsyncApi.fulfilled, (state, action) => {
                state.WorkSlotByEmployee = action.payload
                state.loading = false
            })
            .addCase(getWorkSlotEmployeeedAsyncApi.rejected, (state, action) => {
                state.loading = false
            })
       
    },
})

export default authSlice.reducer
export const WorkSlotEmployeeedAction = authSlice.actions

export const getWorkSlotEmployeeedAsyncApi = createAsyncThunk('WorkSlotEmployeeedReducer/getAsyncApi', async (id) => {
    try {
        const response = await GetWorkedSlotByIdEmployeeApi(id)
        return response
    } catch (error) {
        const json = error.response.data
        const errors = json[''].errors
        throw errors[0].errorMessage
    }
})

