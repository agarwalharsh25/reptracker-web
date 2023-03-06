import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {updateDoctor} from '../services/services'
import {searchHospital} from '../../hospital/services/services'
import AsyncSelect from 'react-select/async';

export default function UpdateDoctor({handleClose, id, doctor, setDoctor}) {
    const [hospital, setHospital] = React.useState({name: doctor.hospital.hospitalName, id: doctor.hospital.hospitalId});
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
    const handleUpdateDoctor = (event) => {
        event.preventDefault();
        const { doctorName, doctorSpeciality, doctorDepartment, doctorQualification, doctorContact } = event.target.elements;
        var doc = {
            name: doctorName.value,
            searchField: doctorName.value.toString().toLowerCase(),
            speciality: doctorSpeciality.value,
            department: doctorDepartment.value,
            qualification: doctorQualification.value,
            contact: doctorContact.value,
            hospital: {
                hospitalName: hospital.name,
                hospitalId: hospital.id
            }
        }
        updateDoctor(id, doc)
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
        <form noValidate autoComplete="off" onSubmit={handleUpdateDoctor}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                    <TextField
                    required
                    id="doctorName"
                    label="Name"
                    size="small"
                    variant="outlined"
                    defaultValue={doctor.name}
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
                    defaultValue={doctor.speciality}
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
                    defaultValue={doctor.department}
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
                    defaultValue={doctor.qualification}
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
                    defaultValue={doctor.contact}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <AsyncSelect
                        placeholder={hospital.name}
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
                        UPDATE
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
  }