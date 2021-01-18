import React, {useState,useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
        marginTop: theme.spacing(2),
        },
    },
}));

const CustomSnackbar = ({date, message, severity}) => {
  const classes = useStyles();  

  const [openState, setOpenState] = useState(false);  

  const handleClose = (event) => {
    setOpenState(false);
  };
  
  useEffect(() => {
      if(message){
        setOpenState(true);
      }
    
  }, [date]);

    return (
        <div className={classes.root}>      
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={openState} 
                autoHideDuration={6000} 
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={severity}>
                {message}
                </Alert>
            </Snackbar>      
        </div>
    )
}

export default CustomSnackbar
