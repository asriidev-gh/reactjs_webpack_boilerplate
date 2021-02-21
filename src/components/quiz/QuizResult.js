import React from 'react';
import "./Quiz.css";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    resultBtns: {    
        margin: theme.spacing(1),
        width: "20vw",  
    }  
}));

const QuizResult = ({quiz,quizPassed,quizResult,retakeQuiz,userQuizzes}) => {

    const classes = useStyles();

    const showUserAnswer = () => {
        console.log("User Quizzes:"+JSON.stringify(userQuizzes));   
    }

    return (
        <div className="quizResultPage">
            <div className="messageSec">
                <h1>FINAL RESULT!!!</h1>
            </div>
            <div className="quizResultSec">
                {quizPassed?
                <div>
                    <img className='quizResultimg' src='./../assets/images/quiz/passed.svg' alt='Passed' />
                    <span>Congratulations!!!</span>
                </div>
                :
                <div>
                    <img className='quizResultimg' src='./../assets/images/quiz/failed.svg' alt='Failed' />
                    <span>Sorry you didn't met passing score..</span>
                </div>
                }
            </div>
            <div className="quizScoreSec">
                You've answered: {quizResult.correctAnswers} out of {quiz.numberOfQuestions}
                <br/>
                <br/>
                Total Points: {quizResult.totalPoints}
                <br/><br/>
                Final Score: {quizResult.finalScore}%
                <br/><br/>                       
                <Button 
                    onClick={retakeQuiz}
                    variant="outlined" 
                    color="primary" 
                    className={classes.resultBtns}>
                    Retake
                </Button>
                <Link to={"/quizzes"}>
                    <Button 
                        // onClick={showUserAnswer}
                        variant="contained" color="primary" className={classes.resultBtns} disableElevation>
                        Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default QuizResult;
