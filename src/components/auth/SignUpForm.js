import React, {useState, useEffect, useContext} from 'react';

import { connect } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { register } from "../../redux/auth/authActions";
import useForm from './useForm';
import validate from './validateInfo';
import CustomSnackbar from '../snackbar';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signinparag: {
    alignContent: 'center',
    padding: theme.spacing(1),
  },
  copyrightsec: {
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  errors: {
    color: 'red'
  }
}));


function SignUpForm({submitForm, error, isAuthenticated, register}) {  

  const classes = useStyles();

  const [snackbarProps, setSnackbarProps] = useState({
    status: false,
    severity: "success",
    message: "",
    date: new Date()
  });  

  const { handleChange, handleSubmit, handleReset, values, errors, isSubmitting } = useForm(
    submitForm,
    validate,
    register
  );

  useEffect(() => {    
    if(error.id === "REGISTER_FAIL"){                  
      handleReset();
      setSnackbarProps({...snackbarProps,open:true,severity:"warning",message:error.msg.msg,date:new Date()});      
    }
    else if(error.id === "REGISTER_SUCCESS"){
      setSnackbarProps({...snackbarProps,open:false,date:new Date()});
      history.push("/");
    }
    else{
      setSnackbarProps({...snackbarProps,open:false,date:new Date()});
    }
  }, [error]);

  return (
    <>
    <Container component="main" maxWidth="xs">
      
      <CssBaseline />
            
      <CustomSnackbar {...snackbarProps}/>

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={values.name}
                onChange={handleChange}                                
              />
              {errors.name && <p className={classes.errors}>{errors.name}</p>}
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <p className={classes.errors}>{errors.email}</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && <p className={classes.errors}>{errors.password}</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={values.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className={classes.errors}>{errors.confirmPassword}</p>}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={values.allowExtraEmails?true:false} name="allowExtraEmails" onChange={handleChange} color="primary"/>}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end" className={classes.signinparag}>
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
            <Box justify="flex-end" className={classes.copyrightsec}>
              <Copyright />
            </Box>
          </Grid>
        </form>        
      </div>      
    </Container>
    </>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, {register})(SignUpForm);