import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {InputAdornment} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { RemoveRedEye } from '@material-ui/icons';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { forgotPassword,resetPasswordForm,resetPasswordWithSecretCode } from "../../redux/auth/authActions";
import { clearErrors } from "../../redux/auth/errorActions";
import useForgotPasswordForm from './useForgotPasswordForm';
import useResetPasswordForm from './useResetPasswordForm';
import validateForgotPasswordInfo from './validateForgotPasswordForm';
import validateResetPasswordInfo from './validateResetPasswordForm';
import CustomSnackbar from '../snackbar';
import SimpleBackdrop from '../backdrop';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">        
        {process.env.APP_NAME}
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
  },
  notes: {
    color: '#333333',
    fontSize: '10px'
  },
  eye: {
    cursor: 'pointer',
  },
}));


function ForgotPasswordForm({error, 
                             isForgetPasswordCodeSent, 
                             forgetPasswordEmail, 
                             forgotPassword,
                             resetPasswordWithSecretCode,
                             errorMessage,
                             clearErrors,
                             isResetPasswordSuccess}) {

  const history = useHistory();
  const classes = useStyles();

  const [snackbarProps, setSnackbarProps] = useState({
    status: false,
    severity: "success",
    message: "",
    date: new Date()
  });
  
  const [simpleBackdropProps, setSimpleBackdropProps] = useState({date:new Date(),isOpenFlag:false});

  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(true);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [newPasswordIsMasked, setNewPasswordIsMasked] = useState(true);
  const [confirmPasswordIsMasked, setConfirmPasswordIsMasked] = useState(true);
  
  const { handleChange, 
          handleSubmit, 
          handleReset, 
          values, 
          errors } = useForgotPasswordForm(    
                                            validateForgotPasswordInfo,
                                            validateResetPasswordInfo,
                                            forgotPassword
                                          );

  const { resetPasswordHandleChange, 
          resetPasswordHandleSubmit,
          resetPasswordHandleReset, 
          resetPasswordValues, 
          resetPasswordErrors } = useResetPasswordForm(validateResetPasswordInfo,
                                                       resetPasswordWithSecretCode,
                                                       forgetPasswordEmail);

  useEffect(() => {    
    if(error && (error.id === "LOGIN_FAIL" || error.id === "RESETPASSWORD_FAIL")){                  
      handleReset();
      setSnackbarProps({...snackbarProps,open:true,severity:"warning",message:error.msg.msg,date:new Date()});
    }    
  }, [error]);

  useEffect(() => {
    console.log("isForgetPasswordCodeSent:"+isForgetPasswordCodeSent);
    if(isForgetPasswordCodeSent){
      setSimpleBackdropProps({...simpleBackdropProps,date:new Date(),isOpenFlag:true})
      setShowResetPasswordForm(true);
      setShowForgotPasswordForm(false);          
    }
  }, [isForgetPasswordCodeSent]);

  useEffect(() => {
    // clearErrors, when reset password success
    if(isResetPasswordSuccess){
      clearErrors();
      resetPasswordForm();
      history.push("/login");
      // setTimeout(()=>{resetPasswordForm()},2000);
    }
  }, [isResetPasswordSuccess])

  // TODO: Create Button to call action here to reset is ForgetPasswordCodeSent
  const resendTheCode = (e) => {
    setSimpleBackdropProps({...simpleBackdropProps,date:new Date(),isOpenFlag:true})
    setShowResetPasswordForm(false);
    setShowForgotPasswordForm(true);
    resetPasswordForm();
    console.log("Invoke reset forgot password");    
  }

  const toggleNewPasswordMask = (e) => { setNewPasswordIsMasked(!newPasswordIsMasked); };
  const toggleConfirmPasswordMask = (e) => { setConfirmPasswordIsMasked(!confirmPasswordIsMasked); };

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
        
        { showForgotPasswordForm ?
        <div>
          <Typography component="h1" variant="h5">
            Forgot Password?
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset Password
          </Button>

          
          <Grid container justify="flex-end" className={classes.signinparag}>            
            <Box justify="flex-end" className={classes.copyrightsec}>
              <Copyright />
            </Box>
          </Grid>
        </form>

        </div>: ""}
        {  showResetPasswordForm ?
        <div>
        <Typography component="h3" variant="h6">
          Secret Code has been sent to your email!
        </Typography>
        <br/>
        <form className={classes.form} noValidate onSubmit={resetPasswordHandleSubmit}>          
          <Grid container spacing={2}> 
          <Grid item xs={12}>                
              <TextField
                  variant="outlined"                  
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  onChange={resetPasswordHandleChange}                  
                  value={forgetPasswordEmail}
                  id="standard-read-only-input"
                  InputProps={{
                    readOnly: true,
                  }}
                />                
              </Grid>                                     
              <Grid item xs={12}>                
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="secretCode"
                  label="Secret Code"
                  name="secretCode"
                  autoComplete="secretCode"
                  value={resetPasswordValues.secretCode}
                  onChange={resetPasswordHandleChange}                  
                />
                {resetPasswordErrors.secretCode && <p className={classes.errors}>{resetPasswordErrors.secretCode}</p>}
              </Grid>
              <Grid item xs={12}>              
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="newPassword"
                  label="New Password"
                  type="password"
                  id="newPassword"
                  autoComplete="new-password"
                  value={resetPasswordValues.password}
                  onChange={resetPasswordHandleChange}
                  type={newPasswordIsMasked ? "password" : "text"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        { 
                          newPasswordIsMasked ?
                          <RemoveRedEye                            
                            className={classes.eye}
                            onClick={toggleNewPasswordMask}
                          /> : 
                          <VisibilityOffIcon                            
                            className={classes.eye}
                            onClick={toggleNewPasswordMask}
                          />
                        }                        
                      </InputAdornment>
                    ),
                  }}
                />
                {resetPasswordErrors.newPassword && <p className={classes.errors}>{resetPasswordErrors.newPassword}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"                                    
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  value={resetPasswordValues.password}
                  onChange={resetPasswordHandleChange}
                  type={confirmPasswordIsMasked ? "password" : "text"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        { 
                          confirmPasswordIsMasked ?
                          <RemoveRedEye                            
                            className={classes.eye}
                            onClick={toggleConfirmPasswordMask}
                          /> : 
                          <VisibilityOffIcon                            
                            className={classes.eye}
                            onClick={toggleConfirmPasswordMask}
                          />
                        } 
                      </InputAdornment>
                    ),
                  }}
                />
                {resetPasswordErrors.confirmPassword && <p className={classes.errors}>{resetPasswordErrors.confirmPassword}</p>}
                
                {errorMessage ?
                  <div>
                    <p className={classes.notes}>* At least 6 characters long</p>
                    <p className={classes.notes}>* Contain a lowercase letter, an uppercase letter</p>
                    <p className={classes.notes}>* A numeric digit and a special character.</p>
                  </div>
                :""}
              </Grid>                                  
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset Password
          </Button>

          <Grid container>
            <Grid item xs>
              <Link onClick={resendTheCode}>
                Resend the Code?
              </Link>
            </Grid>
          </Grid>
         
          <Grid container justify="flex-end" className={classes.signinparag}>            
            <Box justify="flex-end" className={classes.copyrightsec}>
              <Copyright />
            </Box>
          </Grid>
        </form>
        </div>: ""}
      </div>      
    </Container>
    </>
  );
}

const mapStateToProps = state => ({
  isForgetPasswordCodeSent: state.auth.isForgetPassword,
  forgetPasswordEmail: state.auth.isForgetPasswordEmail,
  errorMessage: state.auth.msg,
  isResetPasswordSuccess: state.auth.isResetPasswordSuccess,
  error: state.error,
  payload: state.action,
});

export default connect(mapStateToProps, {forgotPassword,resetPasswordWithSecretCode,clearErrors})(ForgotPasswordForm);