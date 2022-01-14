
import { cityAction } from './citySlice';
import { takeLatest, call, put } from '@redux-saga/core/effects';
import CityApi from 'api/cityApi';
import { City, ListResponse } from 'models';

function* fetchCityList() {
    try {
        const res:ListResponse<City> = yield call(CityApi.getAll)
        yield put(cityAction.fetchCityListSuccess(res.data))
    } catch (error) {
        yield put(cityAction.fetchCityListFailed())
    }
}
export default function* citySaga() {
    yield takeLatest(cityAction.fetchCityList.type,fetchCityList)
}