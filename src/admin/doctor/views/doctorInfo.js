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
import DeleteDoctor from './delete';
import UpdateDoctor from './update';
import {fetchDoctor, fetchDoctorVisits} from '../services/services'
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

  export default function DoctorInfo({ history }) {
    const [doctor, setDoctor] = React.useState();
    const [doctorVisits, setDoctorVisits] = React.useState();
    const { id } = useParams();
    
    React.useEffect( () => {
        fetchDoctor(id)
        .then(doctor => {
            if (!doctor.exists) {
                console.log('No such document!');
                history.push("/admin/doctor");
            } else {
                setDoctor(doctor.data());
            }
            })
            .catch(err => {
                console.log('Error getting document', err);
                history.push("/admin/doctor");
            });
        fetchDoctorVisits(id)
        .then(doctorVisits => {
            let list = [];
            doctorVisits.docs.map(doc => list.push({id: doc.id, data:doc.data()}));
            setDoctorVisits(list);
          })
          .catch(err => {
            console.log('Error getting document', err);
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
        setComponentToLoad({componentToLoad: <DeleteDoctor handleClose={handleClose} id={id} />, title: "Delete hospital"});
    };
    const handleEditClickOpen = () => {
        setOpen(true);
        setComponentToLoad({componentToLoad: <UpdateDoctor handleClose={handleClose} id={id} doctor={doctor} setDoctor={setDoctor} />, title: "Update doctor details"});
    };
    const displayDoctorVisits = () => {
        if (!doctorVisits || doctorVisits.length <= 0) {
            return;
        }
        return  <Grid container spacing={3}>
                    <Grid item xs>
                        <Typography variant="h6">
                            Visits
                        </Typography>
                        <br />
                        <TableContainer component={Paper}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Visit Id</TableCell>
                                        <TableCell>Rep Id</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {doctorVisits.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component={Link} to={"/admin/visit/"+row.id}>{row.id}</TableCell>
                                        <TableCell component={Link} to={"/admin/rep/"+row.data.userId}>{row.data.userId}</TableCell>
                                        <TableCell>{row.data.status}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
    }

        const classes = useStyles();
        if (doctor) {
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
                            <Typography variant="h4">
                                {doctor.name}
                            </Typography>
                            <IconButton color="secondary" aria-label="edit hospital" component="span" onClick={handleEditClickOpen}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="secondary" aria-label="delete hospital" component="span" onClick={handleDeleteClickOpen}>
                                <DeleteIcon />
                            </IconButton>
                            <DialogBox open={open} setOpen={setOpen} handleClose={handleClose} componentLoad={componentLoad}/>
                            <br/>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>Speciality:</b> {doctor.speciality}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>Department:</b> {doctor.department}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <br/>
                            <Typography variant="subtitle1">
                                <b>Qualification:</b> {doctor.qualification}
                            </Typography>
                            <br/>
                            <Typography variant="subtitle1">
                                <b>Contact:</b> {doctor.contact}
                            </Typography>
                            <br/>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>Hospital Name:</b> {doctor.hospital.hospitalName}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>Hospital Id:</b> <Link to={"/admin/hospital/"+doctor.hospital.hospitalId} style={{ textDecoration: 'none' }}>{doctor.hospital.hospitalId}</Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {displayDoctorVisits()}
                </Grid>

                <Grid container direction={"column"} item xs={6} spacing={3}>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="subtitle1" align="center" color="secondary">
                                        Active visits
                                    </Typography>
                                    <Typography variant="h4" align="center" color="secondary">
                                        {doctor.visits.active}
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
                                        {doctor.visits.total}
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