import React from 'react'
import { Redirect,Route,RouteProps } from 'react-router-dom'


export const PrivateRoute = (props: RouteProps) => {
    const isLoggin = Boolean(localStorage.getItem('access_token'))
    if(!isLoggin)
        return <Redirect to='/login' />
    return <Route {...props}/>
}
