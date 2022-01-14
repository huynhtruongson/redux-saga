import { Search } from '@mui/icons-material';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from '@mui/material';
import { ChangeEvent } from 'hoist-non-react-statics/node_modules/@types/react';
import { City, ListParams } from 'models';
import React, { useRef } from 'react';

interface Props {
    filter: ListParams;
    cities: City[];
    onSearchChange?: (filter: ListParams) => void;
    onChange?: (filter: ListParams) => void;
}

const StudentFilter = ({filter, onSearchChange, onChange, cities}: Props) => {
    const searchRef = useRef<HTMLSelectElement>();
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;
        const newFilter: ListParams = {...filter, name_like: e.target.value, _page: 1};
        onSearchChange(newFilter);
    };
    const handleChange = (e: SelectChangeEvent) => {
        if (!onChange) return;
        const newFilter: ListParams = {
            ...filter,
            city: e.target.value || undefined,
            _page: 1,
        };
        onChange(newFilter);
    };
    const handleSortChange = (e: SelectChangeEvent) => {
        if (!onChange) return;
        const [_sort, _order] = e.target.value.split('.');
        const newFilter: ListParams = {
            ...filter,
            _sort: _sort || undefined,
            _order: (_order as 'asc' | 'desc') || undefined,
        };
        onChange(newFilter);
    };
    const handleClearFilter = () => {
        if (!onChange) return;
        const newFilter: ListParams = {
            ...filter,
            name_like: undefined,
            city: undefined,
            _sort: undefined,
            _order: undefined,
            _page: 1,
        };
        if(searchRef.current)
            searchRef.current.value=''
        onChange(newFilter);
    };
    return (
        <Grid container columnGap={2}>
            <Grid item sm={4} xs={12}>
                <TextField
                    inputRef={searchRef}
                    variant='outlined'
                    label='Search by name'
                    size='small'
                    InputProps={{
                        endAdornment: <Search />,
                    }}
                    fullWidth
                    onChange={handleSearchChange}
                />
            </Grid>
            <Grid item sm={2} xs={12}>
                <FormControl fullWidth size='small'>
                    <InputLabel>City</InputLabel>
                    <Select value={filter.city || ''} label='City' onChange={handleChange}>
                        <MenuItem value=''>All</MenuItem>
                        {cities.map((c) => (
                            <MenuItem key={c.code} value={c.code}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item sm={2} xs={12}>
                <FormControl fullWidth size='small'>
                    <InputLabel>Sort</InputLabel>
                    <Select
                        value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
                        label='Sort'
                        onChange={handleSortChange}
                    >
                        <MenuItem value=''>No sort</MenuItem>
                        <MenuItem value='name.asc'>Name Asc</MenuItem>
                        <MenuItem value='name.desc'>Name Desc</MenuItem>
                        <MenuItem value='mark.asc'>Mark Asc</MenuItem>
                        <MenuItem value='mark.desc'>Mark Desc</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item sm={1} xs={12}>
                <Button onClick={handleClearFilter}>Clear</Button>
            </Grid>
        </Grid>
    );
};

export default StudentFilter;
