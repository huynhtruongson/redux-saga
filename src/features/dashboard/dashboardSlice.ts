import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from 'models';

export interface DashboardStatistics {
    maleCount : number;
    femaleCount : number;
    highMarkCount : number;
    lowMarkCount : number;
    [s:string] : number
}
export interface RankingByCity {
    cityId : string;
    cityName : string;
    rankingList : Student[]
}
export interface DashboardState {
    loading : boolean;
    statistics : DashboardStatistics;
    highestStudentList : Student[];
    lowestStudentList : Student[];
    rankingByCityList : RankingByCity[]
}
const initialState: DashboardState = {
    loading : false,
    statistics : {
        maleCount : 0,
        femaleCount : 0,
        highMarkCount : 0,
        lowMarkCount : 0
    },
    highestStudentList : [],
    lowestStudentList : [],
    rankingByCityList : []
}
const dashboardSlice = createSlice({
    name : 'dashboard',
    initialState : initialState,
    reducers : {
        fetchDashboard : (state) => {
            state.loading= true
        },
        fetchDashboardSuccess : (state) => {
            state.loading= false
        },
        fetchDashboardFailed : (state) => {
            state.loading= false
        },
        setStatistics : (state,action:PayloadAction<DashboardStatistics>) => {
            state.statistics = action.payload
        },
        setHighestStudentList : (state,action:PayloadAction<Student[]>) => {
            state.highestStudentList = action.payload
        },
        setLowestStudentList : (state,action:PayloadAction<Student[]>) => {
            state.lowestStudentList = action.payload
        },
        setRankingCityList : (state,action:PayloadAction<RankingByCity[]>) => {
            state.rankingByCityList = action.payload
        },
    }
})
const dashboardReducer =  dashboardSlice.reducer
export const dashboardAction = dashboardSlice.actions

export default dashboardReducer