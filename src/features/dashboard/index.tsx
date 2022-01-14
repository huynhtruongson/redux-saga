import {AcUnitOutlined} from '@mui/icons-material';
import {Grid, LinearProgress, Theme, Box, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import React, {useEffect} from 'react';
import StatisticItem from './components/StatisticItem';
import StudentList from './components/StudentList';
import Widget from './components/Widget';

import {dashboardAction} from './dashboardSlice';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'relative',
    },
    loadingBar: {
        top: 0,
        left: 0,
        transform: 'translateY(100%)',
        width: '100%',
    },
}));
const Dashboard = () => {
    const style = useStyles();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(dashboardAction.fetchDashboard());
    }, [dispatch]);
    const {loading, statistics, highestStudentList, lowestStudentList, rankingByCityList} =
        useAppSelector((state) => state.dashboard);

    return (
        <Box className={style.root}>
            {loading && (
                <LinearProgress classes={{root: style.loadingBar}} sx={{position: 'absolute'}} />
            )}
            <Grid container spacing={2}>
                {Object.keys(statistics).map((s) => (
                    <Grid key={s} item xs={12} sm={6} md={4} lg={3}>
                        <StatisticItem
                            icon={
                                <AcUnitOutlined
                                    // fontSize='large'
                                    color='primary'
                                    sx={{fontSize: '3rem'}}
                                    // className={style.icon}
                                />
                            }
                            value={statistics[s]}
                            label={s}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box mt={2}>
                <Typography variant='h5' color='primary'>
                    All Students
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={3}>
                        <Widget title='Students with highest mark'>
                            <StudentList students={highestStudentList} />
                        </Widget>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Widget title='Students with lowest mark'>
                            <StudentList students={lowestStudentList} />
                        </Widget>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={2}>
                <Typography variant='h5' color='primary'>
                    Ranking by City
                </Typography>
                <Grid container spacing={2}>
                    {rankingByCityList.map((c) => (
                        <Grid key={c.cityId} item xs={12} md={6} lg={3}>
                            <Widget title={c.cityName}>
                                <StudentList students={c.rankingList} />
                            </Widget>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Dashboard;
