import {useAppDispatch, useAppSelector} from 'app/hooks';
import {Box, Button, Pagination, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {studentAction} from '../studentSlice';
import StudentTable from '../components/StudentTable';
import StudentFilter from '../components/StudentFilter';
import {ListParams} from 'models';
import StudentApi from 'api/studentApi';
import { Link,useRouteMatch,useHistory } from 'react-router-dom';

const ListPage = () => {
    const dispatch = useAppDispatch();
    const math = useRouteMatch();
    const history = useHistory()
    const studentList = useAppSelector((state) => state.student.list);
    const filter = useAppSelector((state) => state.student.filter);
    const pagination = useAppSelector((state) => state.student.pagination);
    const cityList = useAppSelector((state) => state.city.list);
    const handleChangePagination = (e: React.ChangeEvent<unknown>, page: number) => {
        dispatch(studentAction.setFilter({...filter, _page: page}));
    };
    const handleSearchChange = (filter: ListParams) => {
        dispatch(studentAction.setFilterWithDebounce(filter));
    };
    const handleFilterChange = (filter: ListParams) => {
        dispatch(studentAction.setFilter(filter));
    };
    const handleRemoveStudent = async (id:string) => {
        try {
            await StudentApi.remove(id)
            dispatch(studentAction.setFilter({...filter}))
        } catch (error) {
            console.log(error)
        }
    }
    const handleEditStudent = (id:string) => {
        history.push(`${math.path}/${id}`)
    }
    useEffect(() => {
        dispatch(studentAction.fetchStudents(filter));
    }, [dispatch, filter]);
    return (
        <Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant='h4'>Students</Typography>
                <Link to={`${math.path}/add`} style={{textDecoration:'none'}}>
                    <Button variant='contained'>Add Student</Button>    
                </Link>
            </Box>
            <Box mt={2}>
                <StudentFilter
                    filter={filter}
                    cities={cityList}
                    onSearchChange={handleSearchChange}
                    onChange={handleFilterChange}
                />
            </Box>
            <Box mt={2}>
                <StudentTable students={studentList} onRemove={handleRemoveStudent} onEdit={handleEditStudent}/>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                <Pagination
                    count={Math.ceil(pagination._totalRows / pagination._limit)}
                    defaultPage={1}
                    onChange={handleChangePagination}
                    color='primary'
                />
            </Box>
        </Box>
    );
};

export default ListPage;
