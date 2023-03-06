import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {login} from '../firebase';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    textfield: {
        margin: theme.spacing(1),
    }
  }));

export default function Login({ history }) {
    const classes = useStyles();

    const handleLogin = (event) => {
    
        event.preventDefault();
        const { email, password } = event.target.elements;

        login(email, password, history);
        
    }
    

    return (
        <form noValidate autoComplete="off" onSubmit={handleLogin}>
            <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    <TextField
                    required
                    name="email"
                    label="Email"
                    size="small"
                    variant="outlined"
                    className={classes.textfield}
                    fullWidth
                    />
                    <TextField
                    required
                    name="password"
                    label="Password"
                    type="password"
                    size="small"
                    variant="outlined"
                    className={classes.textfield}
                    fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        className={classes.button}
                        fullWidth
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
  }