import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {addRep} from '../services/services'

export default function AddRep({handleClose}) {
    const handleAddRep = (event) => {
        event.preventDefault();
        const { repFirstName, repLastName, repCity, repState, repEmail, repPassword, repContact } = event.target.elements;
        addRep(repFirstName.value, repLastName.value, repCity.value, repState.value, repEmail.value, repPassword.value, repContact.value);
        handleClose();
    }
    return (
        <form noValidate autoComplete="off" onSubmit={handleAddRep}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                    required
                    name="repFirstName"
                    label="First Name"
                    size="small"
                    variant="outlined"
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
                    fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    required
                    name="repEmail"
                    label="Email"
                    type="email"
                    size="small"
                    variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    required
                    name="repPassword"
                    label="Password"
                    size="small"
                    variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    name="repContact"
                    label="Contact"
                    size="small"
                    variant="outlined"
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