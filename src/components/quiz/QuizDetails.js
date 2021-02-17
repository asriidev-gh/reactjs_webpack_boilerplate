import React, {useEffect,useState} from 'react';
import { useSelector,useDispatch } from "react-redux";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import isEmpty from '../../utils/isEmpty';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    buttons: {
        margin: theme.spacing(1),
    },
    root: {
        margin: "50px",
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 800,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

const QuizDetails = (props) => {
    const classes = useStyles();
    const quizzes = useSelector(state => state.quizzes.quizzes);
    const [quizDetails,setQuizDetails] = useState([]);
    useEffect(() => {        
        const { id } = props.match.params;
        if(!isEmpty(quizzes)){
            const quiz = quizzes && quizzes.find((quiz) => quiz._id === id);
            console.log("QuizDetails: "+JSON.stringify(quiz));
            setQuizDetails(quiz);
        }else{
            history.push("/quizzes");
        }        
       
        return () => setQuizDetails(null);
    }, [])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="complex" src={"/assets/images/quiz/"+quizDetails.imageUrl} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h4">
                            {quizDetails.quizName}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                            Category: {quizDetails.category}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                            Decription: {quizDetails.description}
                            </Typography>
                        </Grid>
                        <Grid item> 
                            <Link to={"/quizzes"}>                        
                                <Button variant="outlined" style={{margin:'10px'}}>
                                    Back
                                </Button>
                            </Link>
                            <Link to={`/quiz/`+quizDetails._id}>
                                <Button variant="outlined" color="primary">
                                    Take Quiz
                                </Button>
                            </Link>                        
                        </Grid>
                    </Grid>
                    <Grid item>
                    <Typography variant="subtitle1">Complexity: {quizDetails.complexity}</Typography>
                    <Typography variant="subtitle1">Time Limit: {quizDetails.timeLimit}</Typography>
                    </Grid>
                </Grid>
                </Grid>
            </Paper>
        </div>
        
        
    )
}

export default QuizDetails
