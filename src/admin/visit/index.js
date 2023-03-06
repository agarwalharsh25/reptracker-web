import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CountryMap from './views/countryMap';
import DialogBox from '../views/dialog';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import AddVisit from './views/add';
import UploadCsv from '../views/uploadCsv';
import { fetchVisitAnalytics, uploadVisitCsv } from './services/services';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    }
  }));

export default function Visit({ history }) {
    const [visitAnalytics, setVisitAnalytics] = React.useState();

    React.useEffect( () => {
        fetchVisitAnalytics()
        .then(visitAnalytics => {
            if (!visitAnalytics.exists) {
                console.log('No such document!');
            } else {
                setVisitAnalytics(visitAnalytics.data());
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
        setComponentToLoad({componentToLoad: <AddVisit handleClose={handleClose}/>, title: "Add new visit"});
    };
    const handleUploadClickOpen = () => {
        setOpen(true);
        setComponentToLoad({componentToLoad: <UploadCsv handleClose={handleClose} uploadCsv={uploadVisitCsv}/>, title: "Upload visit CSV"});
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
                                    Total visits
                                </Typography>
                                <Typography variant="h4" align="center" color="secondary">
                                    { visitAnalytics ? visitAnalytics.total : 0 }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="subtitle1" align="center" color="secondary">
                                    Active visits
                                </Typography>
                                <Typography variant="h4" align="center" color="secondary">
                                    { visitAnalytics ? visitAnalytics.active : 0 }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs>
                    <CountryMap/>
                </Grid>
            </Grid>
            {/* Right panel */}
            <Grid container direction={"column"} item xs={6} spacing={3}>
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