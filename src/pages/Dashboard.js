import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Dashboard = () => {
    const classes = useStyles();
    return (
        <div>
            <h1>Dashboards</h1>
            
        </div>
    )
}

export default Dashboard
