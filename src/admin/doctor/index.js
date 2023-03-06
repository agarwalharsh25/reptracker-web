import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SearchView from './views/searchView';
import DialogBox from '../views/dialog';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import AddDoctor from './views/add';
import BubbleGraph from '../views/bubbleChart';
import UploadCsv from '../views/uploadCsv';
import { fetchDoctorAnalytics, uploadDoctorCsv } from './services/services';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    }
  }));

export default function Doctor({ history }) {
    const [doctorAnalytics, setDoctorAnalytics] = React.useState();

    React.useEffect( () => {
        fetchDoctorAnalytics()
        .then(doctorAnalytics => {
            if (!doctorAnalytics.exists) {
                console.log('No such document!');
            } else {
                setDoctorAnalytics(doctorAnalytics.data());
            }
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
    const handleAddClickOpen = () => {
        setOpen(true);
        setComponentToLoad({componentToLoad: <AddDoctor handleClose={handleClose}/>, title: "Add new doctor"});
    };
    const handleUploadClickOpen = () => {
        setOpen(true);
        setComponentToLoad({componentToLoad: <UploadCsv handleClose={handleClose} uploadCsv={uploadDoctorCsv}/>, title: "Upload doctor CSV"});
    };

    const classes = useStyles();
    return(
        <Grid container spacing={10}>
            {/* Left panel */}
            <Grid container direction={"column"} item xs={6} spacing={3}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="subtitle1" align="center" color="secondary">
                                    Total doctors
                                </Typography>
                                <Typography variant="h4" align="center" color="secondary">
                                    { doctorAnalytics ? doctorAnalytics.totalDoctors : 0 }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs>
                    { doctorAnalytics ? <BubbleGraph data={doctorAnalytics.specialityMap}/> : <></> }
                </Grid>
            </Grid>
            {/* Right panel */}
            <Grid container direction={"column"} item xs={6} spacing={3}>
                <Grid item>
                    <SearchView />
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Button
                            variant="contained"
                            className={classes.button}
                            color="secondary"
                            startIcon={<AddIcon />}
                            fullWidth
                            onClick={handleAddClickOpen}
                        >
                            Add
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            className={classes.button}
                            color="secondary"
                            startIcon={<CloudUploadIcon />}
                            fullWidth
                            onClick={handleUploadClickOpen}
                        >
                            Upload data through CSV
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            variant="contained"
                            className={classes.button}
                            color="secondary"
                            startIcon={<CloudDownloadIcon />}
                            fullWidth
                        >
                            CSV
                        </Button>
                    </Grid>
                    <DialogBox open={open} setOpen={setOpen} handleClose={handleClose} componentLoad={componentLoad}/>
                </Grid>
            </Grid>
        </Grid>
    )
}