import React from 'react';
import QuizzesList from '../components/quiz/Quizzes';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    quizzesPageSec: {
      marginTop:-50,
      flexGrow: 1,
      backgroundColor: "#e4FFFF",
    },
}));

const Quizzes = () => {
    const classes = useStyles();
    
    return (
        <div className={classes.quizzesPageSec}>
            <QuizzesList />
        </div>
    )
}

export default Quizzes;
