import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import GroupIcon from '@material-ui/icons/Group';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

export function SideBar(){
	return (
        <div>
            <ListItem button component={Link} to={"/admin/visit"}>
                <ListItemIcon>
                <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Visits" />
            </ListItem>
            <ListItem button component={Link} to={"/admin/hospital"}>
                <ListItemIcon>
                <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Hospitals" />
            </ListItem>
            <ListItem button component={Link} to={"/admin/doctor"}>
                <ListItemIcon>
                <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Doctors" />
            </ListItem>
            <ListItem button component={Link} to={"/admin/rep"}>
                <ListItemIcon>
                <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Reps" />
            </ListItem>
        </div>
    );
}