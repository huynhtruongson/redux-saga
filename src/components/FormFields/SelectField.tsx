import {FormControl, FormHelperText, InputLabel, MenuItem, RadioGroupProps, Select} from '@mui/material';
import React from 'react';
import {Control, useController} from 'react-hook-form';

interface SelectOption {
    label: string;
    value: string | number;
}
interface Props extends RadioGroupProps {
    name: string;
    control: Control<any>;
    options: SelectOption[];
    label: string;
}
export const SelectField = ({name, control, label, options}: Props) => {
    const {
        field: {onBlur, onChange,value},
        fieldState: {invalid, error},
    } = useController({name, control});
    return (
        <FormControl fullWidth error={invalid} size='small'>
            <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
            <Select
                id='demo-simple-select'
                value={value}
                label={label}
                onBlur={onBlur}
                onChange={onChange}
            >
                {
                    options.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)
                }
            </Select>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
};
