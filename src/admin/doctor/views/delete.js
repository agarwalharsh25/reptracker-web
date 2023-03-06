import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {deleteDoctor} from '../services/services'

export default function DeleteDoctor({handleClose, id}) {
    const handleDeleteDoctor = (event) => {
        event.preventDefault();
        deleteDoctor(id)
        .then(function() {
            console.log('document deleted')
        })
        .catch(error => {
            console.log(error.message)
        });
        handleClose();
    }
    return (
        <form noValidate autoComplete="off" onSubmit={handleDeleteDoctor}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">
                        Are you sure you want to delete?
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={10}
                direction="column"
                alignItems="flex-end"
                justify="flex-end"
            >
                <Grid item xs>
                    <Button
                        onClick={handleClose}
                    >
                        CANCEL
                    </Button>
                    <Button
                        type="submit"
                    >
                        DELETE
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
  }