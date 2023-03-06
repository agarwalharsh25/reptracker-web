import React from 'react';
import { SideBar } from "./views/sidebar";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hospital from './hospital';
import HospitalInfo from './hospital/views/hospitalInfo';
import Doctor from './doctor';
import DoctorInfo from './doctor/views/doctorInfo';
import Rep from './rep';
import RepInfo from './rep/views/repInfo';
import Visit from './visit';
import VisitInfo from './visit/views/visitInfo';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from '../views/login';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(5),
  }
}));

export default function Admin() {
  const classes = useStyles();
    return (
        <Grid container spacing={10}
        className={classes.container}>
          <Grid item xs={2}>
            <SideBar/>
          </Grid>
          <Grid item xs={10}>
            <Switch>
              <Route path="/admin" exact component={Login} />
              <Route path="/admin/hospital" exact component={Hospital} />
              <Route path="/admin/hospital/:id" exact component={HospitalInfo} />
              <Route path="/admin/doctor" exact component={Doctor} />
              <Route path="/admin/doctor/:id" exact component={DoctorInfo} />
              <Route path="/admin/rep" exact component={Rep} />
              <Route path="/admin/rep/:id" exact component={RepInfo} />
              <Route path="/admin/visit" exact component={Visit} />
              <Route path="/admin/visit/:id" exact component={VisitInfo} />
            </Switch>
          </Grid>
        </Grid>
    );
  }