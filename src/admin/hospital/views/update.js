import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {updateHospital} from '../services/services'

export default function UpdateHospital({handleClose, id, hospital, setHospital}) {
    const handleUpdateHospital = (event) => {
        event.preventDefault();
        const { hospitalName, hospitalAddress, hospitalCity, hospitalState, hospitalLat, hospitalLong, hospitalContact } = event.target.elements;
        var hosp = {
            name: hospitalName.value,
            searchField: hospitalName.value.toString().toLowerCase(),
            address: hospitalAddress.value,
            city: hospitalCity.value,
            state: hospitalState.value,
            latitude: hospitalLat.value,
            longitude: hospitalLong.value,
            contact: hospitalContact.value
        }
        updateHospital(id, hosp)
        .then(function() {
            console.log('document updated')
            window.location.reload();
        })
        .catch(error => {
            console.log(error.message)
        });
        handleClose();
    }
    return (
        <form noValidate autoComplete="off" onSubmit={handleUpdateHospital}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                    required
                    name="hospitalName"
                    label="Name"
                    size="small"
                    variant="outlined"
                    defaultValue={hospital.name}
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
                    defaultValue={hospital.address}
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
                    defaultValue={hospital.city}
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
                    defaultValue={hospital.state}
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
                    defaultValue={hospital.latitude}
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
                    defaultValue={hospital.longitude}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                    required
                    name="hospitalContact"
                    label="Contact"
                    size="small"
                    variant="outlined"
                    defaultValue={hospital.contact}
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
                        UPDATE
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
  }