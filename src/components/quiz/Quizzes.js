import React,{useEffect,useState} from 'react';
import { useSelector } from "react-redux";
import axios from "axios";
import useFetchQuiz from './useFetchQuiz';
import useDebounce from './useDebounce';
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";
import "./Quiz.css";
import QuizCard from './QuizCard';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,        
    },
    quizzesHolder:{
        marginTop: 50,        
    },
    searchSec: {
      marginTop: 70,  
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    loader: {
        display: 'flex',
        alignItems: 'center',      
    }
  }));

const Quizzes = () => {

    const classes = useStyles();

    const [page, setPage] = useState(1);

    const [searchTerm, setSearchTerm] = useState(null);
    const [quizzes, setQuizzes, errors, isLoading] = useFetchQuiz(page,searchTerm);
    const [quizLength, setQuizLength] = useState(0);

    useEffect(() => {
        if(quizzes && quizzes.length > 0){
            setQuizLength(quizzes.length);
        }
    }, [quizzes]);

    const debounce = useDebounce();

    const handleInput = (e) => {
        const text = e.target.value;
        setPage(1);
        debounce(()=>setSearchTerm(text));
    };

    return (
        <>
        <div className={classes.root}>     
            <Grid container justify="center" className={classes.quizzesHolder}>
                <Paper className={classes.searchSec}>                    
                    <InputBase
                        className={classes.input}
                        placeholder="Search Here"
                        inputProps={{ 'aria-label': 'search here' }}
                        onChange={handleInput}
                    />
                    <IconButton className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Grid>

            <InfiniteScroll dataLength={quizLength} next={() => setPage(page + 1)} hasMore={true}>
                <div className="quizzesSec">                
                    {quizzes && quizzes.map((item,index) => {
                        return <div style={{'margin':'10px'}} key={index} quizid={item._id}> 
                                <QuizCard
                                    quizId={item._id}  
                                    quizName={item.quizName}
                                    category={item.category}
                                    description={item.description}
                                    imageUrl={item.imageUrl}                                    
                                 />
                            </div>;                
                    })}            
                </div>
            </InfiniteScroll>
            <Grid container justify = "center">
                {isLoading && <ClipLoader loading={isLoading} size={35} />}
            </Grid>
        </div>
        </>
    )
}

export default Quizzes;
