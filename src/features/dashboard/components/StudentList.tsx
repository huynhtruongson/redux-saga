import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {Student} from 'models';
import React from 'react';

interface Props {
    students: Student[];
}

const StudentList = ({students}: Props) => {
    return (
        <TableContainer>
            <Table aria-label='simple table' size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>#</TableCell>
                        <TableCell align='left'>Name</TableCell>
                        <TableCell align='left'>Mark</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((s, i) => (
                        <TableRow
                            key={s.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component='th' scope='row' align='center'>{i + 1}</TableCell>
                            <TableCell align='left'>{s.name}</TableCell>
                            <TableCell align='left'>{s.mark}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StudentList;
