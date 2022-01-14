
import { Box,Button, Paper, Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useAppDispatch } from 'app/hooks'
import React from 'react'
import { authAction } from './authSlice'

const useStyles = makeStyles((theme:Theme) => ({
    container : {
        minHeight:'100vh',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    loginBox : {
        padding: theme.spacing(2),
    },
}))
const LoginPage = () => {
    const style = useStyles()
    const dispatch = useAppDispatch()
    const handleLogin = () => {
        dispatch(authAction.login({
            username : 'son',
            password : '123'
        }))
    }
    return (
        <Box className={style.container}>
            <Paper classes={{root : style.loginBox}} elevation={2}>
                <Typography variant='h4' component='h1' >Start your app </Typography>
                <Button onClick={handleLogin} sx={{mt : '16px'}} variant='contained' fullWidth>Login</Button>
            </Paper>
        </Box>
    )
}

export default LoginPage
