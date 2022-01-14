import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {NavLink} from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
    link : {
        textDecoration :'none',
        color : 'inherit',
        '&.active > .MuiListItem-root' : {
            background : theme.palette.action.selected
        }
    },
    sidebarRoot : {
        width:'100%',
        maxWidth:'360px',
        minHeight:'100vh',
        backgroundColor:'background.paper'
    }
}))

export function Sidebar() {
    const style = useStyles()
    return (
        <Box className={style.sidebarRoot}>
            <nav aria-label='main mailbox folders'>
                <List>
                    <NavLink to='/admin/dashboard' className={style.link}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                Dashboard
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                    <NavLink to='/admin/students'  className={style.link}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PeopleAltIcon />
                                </ListItemIcon>
                                Student
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                </List>
            </nav>
        </Box>
    );
}
