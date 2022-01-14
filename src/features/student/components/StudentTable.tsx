import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Box,Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,} from '@mui/material';
import {useAppSelector} from 'app/hooks';
import {cityMapSelector} from 'features/city/citySlice';
import {Student} from 'models';
import React, {useState} from 'react';
import {capitalizeString} from 'utils';

interface Props {
    students: Student[];
    onRemove : (id:string) => void;
    onEdit : (id:string) => void;
}
const StudentTable = ({students,onRemove,onEdit}: Props) => {
    const mapCities = useAppSelector(cityMapSelector);
    const [studentSelect, setStudentSelect] = useState<Student>({} as Student);
    const handleClose = () => {
        setStudentSelect({} as Student);
    };
    const handleRemove = () => {
        if(!studentSelect) return 
        onRemove(studentSelect.id!)
        handleClose()
    }
    return (
        <Box>
            <TableContainer component={Paper}>
                <Table size='small' aria-label='a dense table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>ID</TableCell>
                            <TableCell align='left'>Name</TableCell>
                            <TableCell align='left'>Gender</TableCell>
                            <TableCell align='left'>Mark</TableCell>
                            <TableCell align='left'>City</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((s) => (
                            <TableRow
                                key={s.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align='left'>{s.id}</TableCell>
                                <TableCell align='left'>{s.name}</TableCell>
                                <TableCell align='left'>{capitalizeString(s.gender)}</TableCell>
                                <TableCell
                                    align='left'
                                    sx={{
                                        color:
                                            s.mark >= 8
                                                ? 'success.main'
                                                : s.mark >= 5
                                                ? 'info.main'
                                                : 'error.main',
                                    }}
                                >
                                    {s.mark}
                                </TableCell>
                                <TableCell align='left'>{mapCities[s.city]?.name}</TableCell>
                                <TableCell align='center'>
                                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                        <Button size='small' variant='outlined' sx={{mr: 2}} onClick={()=>onEdit(s.id!)}>
                                            Edit
                                        </Button>
                                        <Button
                                            size='small'
                                            variant='contained'
                                            color='secondary'
                                            onClick={() => setStudentSelect(s)}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={!!studentSelect.id}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Are you sure to delete this student?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleRemove} color='error' variant='contained'>Remove</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StudentTable;
