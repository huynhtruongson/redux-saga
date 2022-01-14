
import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import { Header, Sidebar } from 'components/Common'
import Dashboard from 'features/dashboard'
import StudentFeature from 'features/student'
import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router'
const useStyle = makeStyles((theme:Theme) => ({
    root: {
        display: 'grid',
        gridTemplateColumns : '240px 1fr',
        gridTemplateAreas : '"header header" "sidebar main"',
    },
    header : {
        gridArea : 'header'
    },
    sidebar : {
        gridArea : 'sidebar',
        borderRight : '1px solid #cacaca'
    },
    main : {
        gridArea : 'main',
        padding: theme.spacing(2)
    }
}))
export const AdminLayout = () => {
    const style = useStyle()
    const math = useRouteMatch()
    return (
        <Box className={style.root}>
            <Box className={style.header}>
                <Header/>
            </Box>
            <Box className={style.sidebar}>
                <Sidebar/>
            </Box>
            <Box className={style.main}>
                <Switch>
                    <Route path={`${math.path}`} exact>
                        <Redirect to={`${math.path}/dashboard`} />
                    </Route>
                    <Route path={`${math.path}/dashboard`}>
                        <Dashboard/>
                    </Route>
                    <Route path={`${math.path}/students`}>
                        <StudentFeature/>
                    </Route>
                </Switch>
            </Box>
        </Box>
    )
}
