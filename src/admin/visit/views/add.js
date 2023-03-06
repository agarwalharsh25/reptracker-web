import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {addVisit} from '../services/services'
import {searchDoctor} from '../../doctor/services/services'
import {searchHospital} from '../../hospital/services/services'
import {searchRep} from '../../rep/services/services'
import AsyncSelect from 'react-select/async';

export default function AddVisit({handleClose}) {
    const [doctor, setDoctor] = React.useState();
    const [hospital, setHospital] = React.useState();
    const [rep, setRep] = React.useState();
    const loadDoctors = async (inputValue) => {
        return new Promise((resolve => {
            if (inputValue.length >= 3) {
                searchDoctor(inputValue)
                .then(doctorList => {
                  let list = [];
                  doctorList.docs.map(doc => list.push({value: doc.id, label:doc.data().name}));
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
    const loadReps = async (inputValue) => {
        return new Promise((resolve => {
            if (inputValue.length >= 3) {
                searchRep(inputValue)
                .then(repList => {
                  let list = [];
                  repList.docs.map(doc => list.push({value: doc.id, label:doc.data().firstName}));
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
    const setDoctorOnChange = (doctor) => {
        setDoctor({name: doctor.label, id: doctor.value})
    }
    const setHospitalOnChange = (hospital) => {
        setHospital({name: hospital.label, id: hospital.value})
    }
    const setRepOnChange = (rep) => {
        setRep({name: rep.label, id: rep.value})
    }

    const handleAddVisit = (event) => {
        event.preventDefault();
        addVisit(doctor.id, hospital.id, rep.id);
        handleClose();
    }
    return (
        <form noValidate autoComplete="off" onSubmit={handleAddVisit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <AsyncSelect
                        placeholder="Doctor"
                        loadOptions={loadDoctors}
                        onChange={setDoctorOnChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <AsyncSelect
                        placeholder="Hospital"
                        loadOptions={loadHospitals}
                        onChange={setHospitalOnChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <AsyncSelect
                        placeholder="Rep"
                        loadOptions={loadReps}
                        onChange={setRepOnChange}
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