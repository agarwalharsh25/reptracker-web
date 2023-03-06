import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {addDoctor, searchDoctor} from '../services/services'
import {searchHospital} from '../../hospital/services/services'
import AsyncSelect from 'react-select/async';

export default function AddDoctor({handleClose}) {
    const [hospital, setHospital] = React.useState();
    const loadHospitals = async (inputValue) => {
        return new Promise((resolve => {
            if (inputValue.length >= 3) {
                searchHospital(inputValue)
                .then(hospitalList => {
                  let list = [];
                  hospitalList.docs.map(doc => list.push({value: doc.id, label:doc.data().name}));
                  return resolve(list)
                })
                .catch(err => {
                  console.log('Error getting document', err);
                });
            } else {
                return resolve([])
            }
        }))
    }
    const setHospitalOnChange = (hospital) => {
        setHospital({name: hospital.label, id: hospital.value})
    }
    const handleAddDoctor = (event) => {
        event.preventDefault();
        const { doctorName, doctorSpeciality, doctorDepartment, doctorQualification, doctorContact } = event.target.elements;
        addDoctor(doctorName.value, doctorSpeciality.value, doctorDepartment.value, doctorQualification.value, doctorContact.value, hospital.name, hospital.id);
        handleClose();
    }
    return (
        <form noValidate autoComplete="off" onSubmit={handleAddDoctor}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                    required
                    id="doctorName"
                    label="Name"
                    size="small"
                    variant="outlined"
                    fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    required
                    id="doctorSpeciality"
                    label="Speciality"
                    size="small"
                    variant="outlined"
                    fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    required
                    id="doctorDepartment"
                    label="Department"
                    size="small"
                    variant="outlined"
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    id="doctorQualification"
                    label="Qualification"
                    size="small"
                    variant="outlined"
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    id="doctorContact"
                    label="Contact"
                    size="small"
                    variant="outlined"
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <AsyncSelect
                        placeholder="Hospital"
                        loadOptions={loadHospitals}
                        onChange={setHospitalOnChange}
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