import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
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

import { login } from "../../redux/auth/authActions";
import { clearErrors } from "../../redux/auth/errorActions";
import useLoginForm from './useLoginForm';
import validateLoginInfo from './validateLoginForm';
import CustomSnackbar from '../snackbar';
import SimpleBackdrop from '../backdrop';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        KAEL
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


function LoginForm({submitForm, error, isAuthenticated, login}) {  
  const history = useHistory();
  const classes = useStyles();

  const [snackbarProps, setSnackbarProps] = useState({
    status: false,
    severity: "success",
    message: "",
    date: new Date()
  });  

  const [simpleBackdropProps, setSimpleBackdropProps] = useState({date:new Date(),isOpenFlag:false});

  const { handleChange, handleSubmit, handleReset, values, errors, isSubmitting } = useLoginForm(
    submitForm,
    validateLoginInfo,
    login
  );

  useEffect(() => {    
    if(error && error.id === "LOGIN_FAIL"){                  
      handleReset();
      setSnackbarProps({...snackbarProps,open:true,severity:"warning",message:error.msg.msg,date:new Date()});      
    }    
  }, [error]);

  useEffect(() => {
    if(isAuthenticated){
      setSimpleBackdropProps({...simpleBackdropProps,date:new Date(),isOpenFlag:true})
      history.push("/dashboard");
    }
  }, [isAuthenticated]);
  return (
    <>
    <SimpleBackdrop {...simpleBackdropProps}/>
    <Container component="main" maxWidth="xs">
      
      <CssBaseline />
            
      <CustomSnackbar {...snackbarProps}/>

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>                                      
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
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container justify="flex-end" className={classes.signinparag}>            
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

export default connect(mapStateToProps, {login,clearErrors})(LoginForm);
// export default LoginForm;