import { Paper, Typography } from '@mui/material'
import React from 'react'

interface Props {
    title : string;
    children: React.ReactElement;
}

const Widget = ({title,children}: Props) => {
    return (
        <Paper sx={{p:1}}>
            <Typography sx={{textTransform : 'uppercase',color:'secondary.main'}} variant='subtitle2'>{title}</Typography>
            {children}
        </Paper>
    )
}

export default Widget
