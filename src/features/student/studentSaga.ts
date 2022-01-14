import { ListParams } from './../../models/common';
import { PayloadAction } from '@reduxjs/toolkit';
import { studentAction } from './studentSlice';
import { takeLatest, call, put, debounce } from '@redux-saga/core/effects';
import { ListResponse, Student } from 'models';
import StudentApi from 'api/studentApi';
function* fetchStudentList(action:PayloadAction<ListParams>) {
    try {
        const res:ListResponse<Student> = yield call(StudentApi.getAll,action.payload)
        yield put(studentAction.fetchStudentSuccess(res))
    } catch (error) {
        yield put(studentAction.fetchStudentFailed())
    }
}
function* handleSearchChange(action:PayloadAction<ListParams>) {
    yield put(studentAction.setFilter(action.payload))
}   
export default function* studentSaga() {
    yield takeLatest(studentAction.fetchStudents.type,fetchStudentList)
    yield debounce(500,studentAction.setFilterWithDebounce,handleSearchChange)
}