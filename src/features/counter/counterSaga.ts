import { put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { incrementSaga, incrementSagaSuccess } from './counterSlice';
function* handleIncrementSaga(action: PayloadAction<number>) {
    console.log('handle increment')
    yield put(incrementSagaSuccess(action.payload))
}

export function* counterSaga() {
    console.log('counter saga')
    yield takeLatest(incrementSaga.toString(),handleIncrementSaga)
}