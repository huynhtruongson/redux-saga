import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup
} from '@mui/material';
import React from 'react';
import { Control, useController } from 'react-hook-form';

interface RadioOption {
    label: string;
    value: string | number;
}
interface Props {
    name: string;
    control: Control<any>;
    options: RadioOption[];
    label: string;
    row?:boolean
}
export const RadioGroupField = ({name, control, label, options,row}: Props) => {
    const {field:{onBlur,onChange},fieldState:{invalid,error}} = useController({name,control})
    return (
        <FormControl margin='normal' component='fieldset' error={invalid} color='secondary'>
            <FormLabel component='legend'>{label}</FormLabel>
            <RadioGroup defaultValue={options[0].value} row={row} aria-label={label} name={name} onChange={onChange} onBlur={onBlur}>
                {options.map((o) => (
                    <FormControlLabel key={o.value} value={o.value} control={<Radio />} label={o.label} />
                ))}
            </RadioGroup>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
};

