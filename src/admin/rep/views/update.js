import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {updateRep} from '../services/services'

export default function UpdateRep({handleClose, id, rep, setRep}) {
    const handleUpdateRep = (event) => {
        event.preventDefault();
        const { repFirstName, repLastName, repCity, repState, repContact } = event.target.elements;
        var r = {
            firstName: repFirstName.value,
            lastName: repLastName.value,
            searchField: repFirstName.value.toString().toLowerCase(),
            city: repCity.value,
            state: repState.value,
            contact: repContact.value
        }
        updateRep(id, r)
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
        <form noValidate autoComplete="off" onSubmit={handleUpdateRep}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                    required
                    name="repFirstName"
                    label="First Name"
                    size="small"
                    variant="outlined"
                    defaultValue={rep.firstName}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    required
                    name="repLastName"
                    label="Last Name"
                    size="small"
                    variant="outlined"
                    defaultValue={rep.lastName}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    required
                    name="repCity"
                    label="City"
                    size="small"
                    variant="outlined"
                    defaultValue={rep.city}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    required
                    name="repState"
                    label="State"
                    size="small"
                    variant="outlined"
                    defaultValue={rep.state}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    name="repContact"
                    label="Contact"
                    size="small"
                    variant="outlined"
                    defaultValue={rep.contact}
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