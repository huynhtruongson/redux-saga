import React, {useState, useEffect} from 'react';
import {Box, Theme, Typography} from '@mui/material';
import {Link, useParams} from 'react-router-dom';
import {ChevronLeft} from '@mui/icons-material';
import {makeStyles} from '@mui/styles';
import StudentForm from '../components/StudentForm';
import {Student} from 'models';
import StudentApi from 'api/studentApi';

const useStyles = makeStyles((theme: Theme) => ({
    backLink: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: theme.palette.grey[700],
    },
}));
const AddEditPage = () => {
    const style = useStyles();
    const {id} = useParams<{id: string}>();
    const [student, setStudent] = useState<Student>();
    const isEdit = !!id
    useEffect(() => {
        (async () => {
            try {
                if(id) {
                    const res = await StudentApi.getById(id);
                    setStudent(res);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

    const initialValue: Student = {
        name: '',
        age: '',
        city: '',
        gender: 'male',
        mark: '',
        ...student,
    } as Student;
    const handleSubmit = async (formValues:Student) => {
        if(isEdit)
            await StudentApi.update(formValues)
        else
            await StudentApi.add(formValues)
    }
    return (
        <Box>
            <Link to='/admin/students' className={style.backLink}>
                <ChevronLeft />
                <Typography>Back to student list</Typography>
            </Link>
            {(!id || !!student) && (
                <Box mt={2}>
                    <StudentForm initialValue={initialValue} onSubmit={handleSubmit}/>
                </Box>
            )}
        </Box>
    );
};

export default AddEditPage;
