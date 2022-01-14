import { Paper, Typography,Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

interface Props {
    icon : React.ReactElement,
    value : number,
    label : string
}
const useStyles = makeStyles((theme:Theme) => ({
    root : {
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent : 'space-between',
        alignItems : 'center',
    }
}))
const StatisticItem = ({icon,value,label}: Props) => {
    const style = useStyles()
    return (
        <Paper className={style.root}>
            <Box>{icon}</Box>
            <Box>
                <Typography variant='h4' align='right' color='secondary'>{value}</Typography>
                <Typography variant='subtitle1'>{label}</Typography>
            </Box>
        </Paper>
    )
}

export default StatisticItem
