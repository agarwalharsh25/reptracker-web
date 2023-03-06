import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {updateVisit} from '../services/services'

export default function UpdateVisit({handleClose, id, visit, setVisit}) {
    const handleUpdateVisit = (event) => {
        event.preventDefault();
        const { doctorId, doctorName, doctorSpeciality, hospitalId, hospitalName, hospitalAddress, userId, status } = event.target.elements;
        var v = {
            doctor: {
                id: doctorId.value,
                name: doctorName.value,
                speciality: doctorSpeciality.value
            },
            hospital: {
                id: hospitalId.value,
                name: hospitalName.value,
                address: hospitalAddress.value
            },
            userId: userId.value,
            status: status.value,
        }
        updateVisit(id, v)
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
        <form noValidate autoComplete="off" onSubmit={handleUpdateVisit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                    required
                    name="doctorId"
                    label="Doctor Id"
                    size="small"
                    variant="outlined"
                    defaultValue={visit.doctor.doctorId}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    name="doctorName"
                    label="Doctor Name"
                    size="small"
                    variant="outlined"
                    defaultValue={visit.doctor.doctorName}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    required
                    name="doctorSpeciality"
                    label="Doctor Speciality"
                    size="small"
                    variant="outlined"
                    defaultValue={visit.doctor.doctorSpeciality}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    required
                    name="hospitalId"
                    label="Hospital Id"
                    size="small"
                    variant="outlined"
                    defaultValue={visit.hospital.hospitalId}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                    required
                    name="hospitalName"
                    label="Hospital Name"
                    size="small"
                    variant="outlined"
                    defaultValue={visit.hospital.hospitalName}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                    required
                    name="hospitalAddress"
                    label="Hospital Address"
                    size="small"
                    variant="outlined"
                    defaultValue={visit.hospital.hospitalAddress}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                    required
                    name="userId"
                    label="User Id"
                    size="small"
                    variant="outlined"
                    defaultValue={visit.userId}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                    required
                    name="status"
                    label="Status"
                    size="small"
                    variant="outlined"
                    defaultValue={visit.status}
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