import { fork, take, delay, put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { authAction, LoginPayload } from './pages/authSlice';

function* handleLogin(payload:LoginPayload) {
    yield delay(1000)
    localStorage.setItem('access_token','redux-saga')
    yield put(authAction.loginSuccess({
        id : 1,
        name : 'Sơn'
    }))
    yield put(push('/admin/dashboard'))
}
function* handleLogout() {
    yield delay(1000)
    localStorage.removeItem('access_token')
    yield put(push('/login'))
}
function* watchAuthFlow() {
    while(true) {
        const action:PayloadAction<LoginPayload> = yield take(authAction.login.type)
        yield fork(handleLogin,action.payload)

        yield take(authAction.logout.type)
        yield fork(handleLogout)
    }
}
export function* authSaga() {
    yield fork(watchAuthFlow)
}