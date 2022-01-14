import {dashboardAction, RankingByCity} from './dashboardSlice';
import {all, call, put, takeLatest} from '@redux-saga/core/effects';
import StudentApi from 'api/studentApi';
import {ListResponse, Student, City} from 'models';
import CityApi from 'api/cityApi';

function* fetchHighestStudentList() {
    const res: ListResponse<Student> = yield call(StudentApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'desc',
    });
    yield put(dashboardAction.setHighestStudentList(res.data));
}
function* fetchLowestStudentList() {
    const res: ListResponse<Student> = yield call(StudentApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'asc',
    });
    yield put(dashboardAction.setLowestStudentList(res.data));
}
function* fetchStatistics() {
    const res: Array<ListResponse<Student>> = yield all([
        call(StudentApi.getAll, {_page: 1, _limit: 1, gender: 'male'}),
        call(StudentApi.getAll, {_page: 1, _limit: 1, gender: 'female'}),
        call(StudentApi.getAll, {_page: 1, _limit: 1, mark_gte: 8}),
        call(StudentApi.getAll, {_page: 1, _limit: 1, mark_lte: 5}),
    ]);
    const [maleCount, femaleCount, highMarkCount, lowMarkCount] = res.map(
        (x) => x.pagination!._totalRows
    );
    yield put(dashboardAction.setStatistics({maleCount, femaleCount, highMarkCount, lowMarkCount}));
}
function* fetchRankingCityList() {
    const cityList: ListResponse<City> = yield call(CityApi.getAll);
    console.log(cityList);
    const callingList = cityList.data.map((c) =>
        call(StudentApi.getAll, {_page: 1, _limit: 5, _sort: 'mark', _order: 'desc', city: c.code})
    );
    const res: Array<ListResponse<Student>> = yield all(callingList);
    const rankingList: Array<RankingByCity> = res.map((x, i) => ({
        cityId: cityList.data[i].code,
        cityName: cityList.data[i].name,
        rankingList: x.data,
    }));
    yield put(dashboardAction.setRankingCityList(rankingList));
}
function* fetchDashboard() {
    try {
        yield all([
            call(fetchHighestStudentList),
            call(fetchLowestStudentList),
            call(fetchStatistics),
            call(fetchRankingCityList),
        ]);
        yield put(dashboardAction.fetchDashboardSuccess());
    } catch (error) {
        console.log('Failed to fetch data', error);
        yield put(dashboardAction.fetchDashboardFailed());
    }
}
export default function* dashboardSaga() {
    yield takeLatest(dashboardAction.fetchDashboard.type, fetchDashboard);
}
