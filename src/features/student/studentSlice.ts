import { Student } from './../../models/student';
import { ListParams, PaginationParams, ListResponse } from './../../models/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface StudentState {
    loading:boolean;
    list: Student[];
    filter:ListParams;
    pagination:PaginationParams
}
const initialState:StudentState = {
    loading:false,
    list:[],
    filter: {
        _page:1,
        _limit:15,
        name_like:''
    },
    pagination:{
        _page:1,
        _limit:15,
        _totalRows:15
    }
}
const studentSlice = createSlice({
    name:'student',
    initialState,
    reducers:{
        fetchStudents(state,action:PayloadAction<ListParams>) {
            state.loading=true
        },
        fetchStudentSuccess(state,action:PayloadAction<ListResponse<Student>>) {
            state.loading=false
            state.list=action.payload.data
            state.pagination=action.payload.pagination
        },
        fetchStudentFailed(state) {
            state.loading=false
        },
        setFilter(state,action:PayloadAction<ListParams>) {
            state.filter = action.payload
        },
        setFilterWithDebounce(state,action:PayloadAction<ListParams>) {}
    }
})
const studentReducer = studentSlice.reducer
export const studentAction = studentSlice.actions
export default studentReducer