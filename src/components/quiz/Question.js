import React from 'react';
import "./Quiz.css";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: "50px",
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
      margin: theme.spacing(1),  
    },  
    paper: {
        padding: theme.spacing(1),
        margin: 'auto',
        maxWidth: 1000,
    },
    quizName: {
        margin: '10px',
        alignItems: 'center',
        justifyContent: 'center',
    }  
}));

const Question = ({quiz,timeLeft,enableSubmitBtn,currentAnswer,onConfirmAnswer,onChooseAnswerHandler }) => {
    const classes = useStyles();

    const padNum = (num, size) => {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }
    
    return (
        <div className={classes.root}>
            <Box className={classes.quizName}>
                <h1>{quiz.quizName}</h1>
            </Box>
            <Paper className={classes.paper}>
                
                <div className="questions">
                    <div className="quizPointsSec">
                        <span>Points: ({quiz.currentQuestion.points})</span>
                    </div>
                    <div className="quizTimerSec">                                      
                        { padNum(parseInt((timeLeft/1000) / 60 / 60),2) }:
                        { padNum(parseInt((timeLeft/1000) / 60 % 60),2) }:
                        { padNum(parseInt((timeLeft/1000) % 60 ),2) }                
                    </div>
                    <div className="quizCounterSec">
                        <span>{quiz.currentQuestionIndex+1} of {quiz.numberOfQuestions}</span>
                    </div>
                    <div className="quizQuestionSec">
                        <h3>Question: {quiz.currentQuestion.question}</h3>
                    </div>

                    <div className="options-container">
                        <div className={currentAnswer === quiz.currentQuestion.optionA ? "option currentAnswerActive": "option"} onClick={onChooseAnswerHandler}>{quiz.currentQuestion.optionA}</div>
                        <div className={currentAnswer === quiz.currentQuestion.optionB ? "option currentAnswerActive": "option ${currentAnswer}"} onClick={onChooseAnswerHandler}>{quiz.currentQuestion.optionB}</div>
                    </div>
                    <div className="options-container">
                        <div className={currentAnswer === quiz.currentQuestion.optionC ? "option currentAnswerActive": "option ${currentAnswer}"} onClick={onChooseAnswerHandler}>{quiz.currentQuestion.optionC}</div>
                        <div className={currentAnswer === quiz.currentQuestion.optionD ? "option currentAnswerActive": "option ${currentAnswer}"} onClick={onChooseAnswerHandler}>{quiz.currentQuestion.optionD}</div>
                    </div>

                    <div className="quizDifficultySec">
                        Difficulty: {quiz.currentQuestion.difficulty}
                    </div>                
                    <div className="quizSubmitBtn">                                        
                        <Button
                            disabled={!enableSubmitBtn?true:false}
                            onClick={onConfirmAnswer}
                            variant="contained"
                            color="primary"
                            className={classes.button}                        
                        >
                            Submit
                        </Button>                    
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default Question;
