import React, {useEffect,useState} from 'react';
import { useSelector,useDispatch } from "react-redux";
import Axios from 'axios';
import { getQuizzes, quizzesLoaded } from '../../redux/quiz/quizActions';

const useFetchQuiz = (page, searchTerm) => {

    const token = useSelector(state => state.auth.token);
    
    const dispatch = useDispatch();

    const [quizzes, setQuizzes] = useState(false);
    const [errors, setErrors] = useState([]);
    
    const [isLoading, setIsLoading] = useState(false);

    const api = process.env.REACT_APP_BACKEND_API;

    const fetch = () => {
        dispatch(getQuizzes());
        const config = {
            headers: {
                'Content-Type':'application/json',
                'auth-token':token
            }
        }
    
        const url = searchTerm === null ? `quiz/getQuizzes/${page}` : `quiz/getQuizzes/${page}/${searchTerm}`;
        Axios.get(`${api}/${url}`, config)
        .then((res)=>{
            searchTerm === null ? fetchRandom(res) : fetchSearch(res);                            
            setIsLoading(false);            
        })
        .catch((e) => {
            setErrors(["Unable to fetch data"]);
            setIsLoading(false);
        });
    }

    const fetchSearch = (res) => {       
       page > 1
        ? setQuizzes([...quizzes,...res.data.quizzes])
        : setQuizzes([...res.data.quizzes]);        
    };

    const fetchRandom = (res) => {
        if(quizzes){
            setQuizzes(quizzes? [...quizzes,...res.data.quizzes] : setQuizzes(res.data.quizzes));
        }else{
            setQuizzes(res.data.quizzes);
        }        
    }

    useEffect(() => {
        dispatch(quizzesLoaded(quizzes));
    }, [quizzes])

    // this triggers when the page scrolls down 
    // which increase page count or when input search has been filled out
    useEffect(() => {
        setIsLoading(true);
        fetch();
    },[page,searchTerm]);

    return [quizzes, setQuizzes, errors, isLoading];
}

export default useFetchQuiz;
