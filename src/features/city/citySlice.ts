import { RootState } from './../../app/store';
import { createSlice, PayloadAction,createSelector } from '@reduxjs/toolkit';
import { City } from 'models';
export interface CityState {
    loading:boolean;
    list:City[]
}
const initialState:CityState = {
    loading:false,
    list:[]
}
const citySlice = createSlice({
    name:'city',
    initialState,
    reducers:{
        fetchCityList : (state) => {
            state.loading = true
        },
        fetchCityListSuccess : (state,action:PayloadAction<Array<City>>) => {
            state.loading = true
            state.list = action.payload
        },
        fetchCityListFailed : (state) => {
            state.loading = false
        },
    }
})
const cityReducer = citySlice.reducer
export const citySelector = (state:RootState) => state.city.list
export const cityMapSelector = createSelector(citySelector,(cities) => {
    const mapCity = cities.reduce((obj:{[index:string]:City},c) => {
        obj[c.code] = c
        return obj
    },{})
    return mapCity
})
export const cityOptionSelector = createSelector(citySelector,(cities) => {
    return cities.map(c => ({label:c.name,value:c.code}))
})
export default cityReducer
export const cityAction = citySlice.actions