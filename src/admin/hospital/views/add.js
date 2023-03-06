import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {addHospital} from '../services/services'

export default function AddHospital({handleClose}) {
    const handleAddHospital = (event) => {
        event.preventDefault();
        const { hospitalName, hospitalAddress, hospitalCity, hospitalState, hospitalLat, hospitalLong, hospitalContact } = event.target.elements;
        addHospital(hospitalName.value, hospitalAddress.value, hospitalCity.value, hospitalState.value, hospitalLat.value, hospitalLong.value, hospitalContact.value);
        handleClose();
    }
    return (
        <form noValidate autoComplete="off" onSubmit={handleAddHospital}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                    required
                    name="hospitalName"
                    label="Name"
                    size="small"
                    variant="outlined"
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    name="hospitalAddress"
                    label="Address"
                    size="small"
                    variant="outlined"
                    fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    required
                    name="hospitalCity"
                    label="City"
                    size="small"
                    variant="outlined"
                    fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    required
                    name="hospitalState"
                    label="State"
                    size="small"
                    variant="outlined"
                    fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                    required
                    name="hospitalLat"
                    label="Latitude"
                    type="number"
                    size="small"
                    variant="outlined"
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                    required
                    name="hospitalLong"
                    label="Longitude"
                    type="number"
                    size="small"
                    variant="outlined"
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                    required
                    name="hospitalContact"
                    label="Contact"
                    size="small"
                    variant="outlined"
                    fullWidth
                    />
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
                        ADD
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
  }