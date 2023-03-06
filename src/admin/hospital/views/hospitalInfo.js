import React, { Component } from 'react';
import {useParams} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SearchView from './searchView';
import DialogBox from '../../views/dialog';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import DeleteHospital from './delete';
import UpdateHospital from './update';
import BubbleGraph from '../../views/bubbleChart';
import {fetchHospital} from '../services/services'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    }
  }));

  export default function HospitalInfo({ history }) {
      const [hospital, setHospital] = React.useState();
      const { id } = useParams();
      
      React.useEffect( () => {
        fetchHospital(id)
        .then(hospital => {
            if (!hospital.exists) {
                console.log('No such document!');
                history.push("/admin/hospital");
            } else {
                setHospital(hospital.data());
            }
          })
          .catch(err => {
              console.log('Error getting document', err);
              history.push("/admin/hospital");
          });
    }, [])
    
    const [open, setOpen] = React.useState(false);
    const [componentLoad, setComponentToLoad] = React.useState({componentToLoad: null, title: ""});
    const handleClose = () => {
        setOpen(false);
        setComponentToLoad({componentToLoad: null, title: ""});
    };
    const handleDeleteClickOpen = () => {
        setOpen(true);
        setComponentToLoad({componentToLoad: <DeleteHospital handleClose={handleClose} id={id} />, title: "Delete hospital"});
    };
    const handleEditClickOpen = () => {
        setOpen(true);
        setComponentToLoad({componentToLoad: <UpdateHospital handleClose={handleClose} id={id} hospital={hospital} setHospital={setHospital} />, title: "Update hospital details"});
    };

        const classes = useStyles();
        if (hospital) {
		return(
            <Grid container spacing={10}>
                <Grid container direction={"column"} item xs={6} spacing={3}>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <SearchView />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <br/>
                            <Typography variant="h4">
                                {hospital.name}
                            </Typography>
                            <IconButton color="secondary" aria-label="edit hospital" component="span" onClick={handleEditClickOpen}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="secondary" aria-label="delete hospital" component="span" onClick={handleDeleteClickOpen}>
                                <DeleteIcon />
                            </IconButton>
                            <DialogBox open={open} setOpen={setOpen} handleClose={handleClose} componentLoad={componentLoad}/>
                            <br/>
                            <Typography variant="subtitle1">
                                <b>Address:</b> {hospital.address}
                            </Typography>
                            <br/>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>City:</b> {hospital.city}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>State:</b> {hospital.state}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <br/>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>Latitude:</b> {hospital.latitude}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>Longitude:</b> {hospital.longitude}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <br/>
                            <Typography variant="subtitle1">
                                <b>Contact:</b> {hospital.contact}
                            </Typography>
                            <br/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Typography variant="h6">
                                Doctors
                            </Typography>
                            <br />
                            <TableContainer component={Paper}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Doctor Id</TableCell>
                                            <TableCell>Doctor</TableCell>
                                            <TableCell>Speciality</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {hospital.doctors.doctorsList.map((row) => (
                                        <TableRow key={row.doctorName}>
                                            <TableCell component={Link} to={"/admin/doctor/"+row.doctorId}>{row.doctorId}</TableCell>
                                            <TableCell>{row.doctorName}</TableCell>
                                            <TableCell>{row.doctorSpeciality}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid container direction={"column"} item xs={6} spacing={3}>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="subtitle1" align="center" color="secondary">
                                        Doctors
                                    </Typography>
                                    <Typography variant="h4" align="center" color="secondary">
                                        {hospital.doctors.doctorsCount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="subtitle1" align="center" color="secondary">
                                        Active Visits
                                    </Typography>
                                    <Typography variant="h4" align="center" color="secondary">
                                        {hospital.visits.active}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="subtitle1" align="center" color="secondary">
                                        Total Visits
                                    </Typography>
                                    <Typography variant="h4" align="center" color="secondary">
                                        {hospital.visits.total}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <center><BubbleGraph data={hospital.doctors.doctorsSpecialityMap} /></center>
                    </Grid>
                </Grid>
            </Grid>
        )
        } else {
            return (
                <></>
            )
        }
}