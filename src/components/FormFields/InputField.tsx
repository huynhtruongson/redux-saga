import { BaseTextFieldProps, TextField, } from '@mui/material'
import React from 'react'
import { Control, useController } from 'react-hook-form'

interface Props extends BaseTextFieldProps {
    name:string;
    control:Control<any>;    
}

export const InputField = ({name,control,...rest}: Props) => {
    const {field:{onBlur,onChange,value,ref},fieldState:{invalid,error}} =  useController({name,control})
    console.log(error)
    return (
        <TextField
            variant='outlined'
            size='small'
            inputRef={ref}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={invalid}
            helperText={error?.message}
            {...rest}
        />
    )
}
