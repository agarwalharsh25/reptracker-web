import React, { Component } from 'react';
import {useParams} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DialogBox from '../../views/dialog';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import DeleteVisit from './delete';
import {fetchVisit, fetchVisitPicture, fetchVisitSignature, fetchVisitAudio} from '../services/services';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    imageView: {
        height: 280,
        width: 420,
    }
  }));

  export default function VisitInfo({ history }) {
    const [visit, setVisit] = React.useState();
    const [picture, setPicture] = React.useState();
    const [signature, setSignature] = React.useState();
    const [audio, setAudio] = React.useState();
    const { id } = useParams();
      
    React.useEffect( () => {
    fetchVisit(id)
    .then(visit => {
        if (!visit.exists) {
            console.log('No such document!');
            history.push("/admin/visit");
        } else {
            let v = visit.data();
            if (visit.data().timestamps.visitStarted != "") {
                let d = new Date(Number(visit.data().timestamps.visitStarted));
                v.timestamps.visitStarted = d.toString();
            }
            if (visit.data().timestamps.visitFinished != "") {
                let d = new Date(Number(visit.data().timestamps.visitFinished));
                v.timestamps.visitFinished = d.toString();
            }
            if (visit.data().timestamps.reachedVisit != "") {
                let d = new Date(Number(visit.data().timestamps.reachedVisit));
                v.timestamps.reachedVisit = d.toString();
            }
            if (visit.data().timestamps.presentationStarted != "") {
                let d = new Date(Number(visit.data().timestamps.presentationStarted));
                v.timestamps.presentationStarted = d.toString();
            }
            if (visit.data().timestamps.presentationFinished != "") {
                let d = new Date(Number(visit.data().timestamps.presentationFinished));
                v.timestamps.presentationFinished = d.toString();
            }
            setVisit(v);
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
        history.push("/admin/visit");
    });
    
    fetchVisitPicture(id)
    .then(url => {
        setPicture(url);
    })
    .catch(err => {
        console.log('Error getting picture', err);
    });
    
    fetchVisitSignature(id)
    .then(url => {
        setSignature(url);
    })
    .catch(err => {
        console.log('Error getting signature', err);
    });
    
    fetchVisitAudio(id)
    .then(url => {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            var blob = xhr.response;
            setAudio(blob);
        };
        xhr.open('GET', url);
        xhr.send();
    })
    .catch(err => {
        console.log('Error getting audio', err);
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
        setComponentToLoad({componentToLoad: <DeleteVisit handleClose={handleClose} id={id} />, title: "Delete visit"});
    };

        const classes = useStyles();
        if (visit) {
		return(
            <Grid container spacing={10}>
                <Grid container direction={"column"} item xs={6} spacing={3}>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <br/>
                            <IconButton color="secondary" aria-label="delete visit" component="span" onClick={handleDeleteClickOpen}>
                                <DeleteIcon />
                            </IconButton>
                            <DialogBox open={open} setOpen={setOpen} handleClose={handleClose} componentLoad={componentLoad}/>
                            <br/>
                            <Typography variant="subtitle1">
                                <b>Doctor Id:</b> <Typography component={Link} to={"/admin/doctor/"+visit.doctor.id}>{visit.doctor.id}</Typography>
                            </Typography>
                            <br/>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>Doctor Name:</b> {visit.doctor.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>Doctor Speciality:</b> {visit.doctor.speciality}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <br/> <br/>
                            <Typography variant="subtitle1">
                                <b>Hospital Id:</b> <Typography component={Link} to={"/admin/hospital/"+visit.hospital.id}>{visit.hospital.id}</Typography>
                            </Typography>
                            <br/>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>Hospital Name:</b> {visit.hospital.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>Hospital Address:</b> {visit.hospital.address}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <br/> <br/>
                            <Typography variant="subtitle1">
                                <b>User Id:</b> <Typography component={Link} to={"/admin/rep/"+visit.userId}>{visit.userId}</Typography>
                            </Typography>
                            <br/> <br/>
                            <Typography variant="subtitle1">
                                <b>Status:</b> {visit.status}
                            </Typography>
                            <br/> <br/>
                            <Typography variant="subtitle1">
                                <b>Timestamps</b>
                            </Typography>
                            <br/>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>Visit Started:</b> {visit.timestamps.visitStarted}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>Visit Finished:</b> {visit.timestamps.visitFinished}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <br/>
                            <Typography variant="subtitle1">
                                <b>Reached Visit:</b> {visit.timestamps.reachedVisit}
                            </Typography>
                            <br/>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>Presentation Started:</b> {visit.timestamps.presentationStarted}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>Presentation Finished:</b> {visit.timestamps.presentationFinished}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <br/> <br/>
                            <Typography variant="subtitle1">
                                <b>Notes:</b> <br/>{visit.notes}
                            </Typography>
                            <br/>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid container direction={"column"} item xs={6} spacing={3}>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Typography variant="subtitle1">
                                <b>Picture</b>
                            </Typography>
                            <img src={picture} id="picture" className={classes.imageView}></img>
                            <br></br>

                            <Typography variant="subtitle1">
                                <b>Signature</b>
                            </Typography>
                            <img src={signature} id="signature" className={classes.imageView}></img>
                            <br></br>

                            <Typography variant="subtitle1">
                                <b>Audio</b>
                            </Typography>
                            <audio src={audio} id="audio" controls autoPlay></audio>
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