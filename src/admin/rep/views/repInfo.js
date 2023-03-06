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
import DeleteRep from './delete';
import UpdateRep from './update';
import BubbleGraph from '../../views/bubbleChart';
import {fetchRep} from '../services/services'
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

  export default function RepInfo({ history }) {
      const [rep, setRep] = React.useState();
      const { id } = useParams();
      
      React.useEffect( () => {
        fetchRep(id)
        .then(rep => {
            if (!rep.exists) {
                console.log('No such document!');
                history.push("/admin/rep");
            } else {
                setRep(rep.data());
            }
          })
          .catch(err => {
              console.log('Error getting document', err);
              history.push("/admin/rep");
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
        setComponentToLoad({componentToLoad: <DeleteRep handleClose={handleClose} id={id} />, title: "Delete rep"});
    };
    const handleEditClickOpen = () => {
        setOpen(true);
        setComponentToLoad({componentToLoad: <UpdateRep handleClose={handleClose} id={id} rep={rep} setRep={setRep} />, title: "Update rep details"});
    };

        const classes = useStyles();
        if (rep) {
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
                                {rep.firstName} {rep.lastName}
                            </Typography>
                            <IconButton color="secondary" aria-label="edit rep" component="span" onClick={handleEditClickOpen}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="secondary" aria-label="delete rep" component="span" onClick={handleDeleteClickOpen}>
                                <DeleteIcon />
                            </IconButton>
                            <DialogBox open={open} setOpen={setOpen} handleClose={handleClose} componentLoad={componentLoad}/>
                            <br/>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>City:</b> {rep.city}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>State:</b> {rep.state}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <br/>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>Email:</b> {rep.email}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>Contact:</b> {rep.contact}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <br/>
                        </Grid>
                    </Grid>
                    {/* <Grid container spacing={3}>
                        <Grid item xs>
                            <Typography variant="h6">
                                Last 5 Visits
                            </Typography>
                            <br />
                            <TableContainer component={Paper}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>DoctorId</TableCell>
                                            <TableCell>Doctor</TableCell>
                                            <TableCell>Speciality</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {hospital.doctors.doctorsList.map((row) => (
                                        <TableRow key={row.doctorName}>
                                            <TableCell><Link to={"/admin/doctor/"+row.doctorId}>{row.doctorId}</Link></TableCell>
                                            <TableCell>{row.doctorName}</TableCell>
                                            <TableCell>{row.doctorSpeciality}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid> */}
                </Grid>
                
                <Grid container direction={"column"} item xs={6} spacing={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="subtitle1" align="center" color="secondary">
                                        Avg. Presentation Time
                                    </Typography>
                                    <Typography variant="h4" align="center" color="secondary">
                                        {Number(rep.visits.avgPptTime)/(Number(rep.visits.total)-Number(rep.visits.active))}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="subtitle1" align="center" color="secondary">
                                        Avg. Visit Duration
                                    </Typography>
                                    <Typography variant="h4" align="center" color="secondary">
                                        {Number(rep.visits.avgVisitDur)/(Number(rep.visits.total)-Number(rep.visits.active))}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="subtitle1" align="center" color="secondary">
                                        Active Visits
                                    </Typography>
                                    <Typography variant="h4" align="center" color="secondary">
                                        {rep.visits.active}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="subtitle1" align="center" color="secondary">
                                        Total Visits
                                    </Typography>
                                    <Typography variant="h4" align="center" color="secondary">
                                        {rep.visits.total}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
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