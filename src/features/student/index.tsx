import { cityAction } from 'features/city/citySlice'
import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch, useRouteMatch } from 'react-router'
import AddEditPage from './pages/AddEditPage'
import ListPage from './pages/ListPage'


const StudentFeature = () => {
    const match = useRouteMatch()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(cityAction.fetchCityList())
    }, [dispatch])
    return (
        <Switch>
            <Route path={`${match.path}`} exact>
                <ListPage/>
            </Route>
            <Route path={`${match.path}/add`}>
                <AddEditPage/>
            </Route>
            <Route path={`${match.path}/:id`}>
                <AddEditPage/>
            </Route>
        </Switch>
    )
}

export default StudentFeature
