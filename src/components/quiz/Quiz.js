import React,{useState, useEffect,useRef} from 'react';
import { useSelector } from "react-redux";
import Helmet from "react-helmet";
import "./Quiz.css";
import isEmpty from "../../utils/isEmpty";
import axios from "axios";
import ToastServive from 'react-material-toast';

import Question from "./Question";
import QuizResult from './QuizResult';

const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
});

const Quiz = (props) => {
    const { id } = props.match.params;

    const user = useSelector(state => state.auth.user);     

    const token = useSelector(state => state.auth.token); 

    const quizzes = useSelector(state => state.quizzes.quizzes);

    const [quiz,setQuiz] = useState({
        questions: [],
        currentQuestion: {},
        nextQuestion:{},
        previousQuestion:{},
        totalPoints:0,        
        numberOfQuestions: 0,        
        currentQuestionIndex: 0,
        quizName:"",
        quizId:"",
    });

    const [quizResult,setQuizResult] = useState({        
        numberOfAnsweredQuestion: 0,        
        totalPoints: 0,
        finalScore:0,
        correctAnswers: 0,
        wrongAnswers: 0,
        hints: {},
        fiftyFifty: 2,
        usedFiftyFifty: false,
        time: {},
    });
      
    const [currentAnswer,setCurrentAnswer] = useState("");    
    const [enableSubmitBtn,setEnableSubmitBtn] = useState(false);
    const [finished,setFinished] = useState(false);
    const [quizPassed,setQuizPassed] = useState(false);
    const [userQuizzes,setUserQuizzes] = useState([]);

    const displayQuestions = (currentQuestionIndex) => {            
            if(!isEmpty(quiz.questions)){
                
                const questions = quiz.questions;
                let numberOfQuestions = questions.length;
                let currentQuestion = questions[currentQuestionIndex];                
                let nextQuestion = questions[currentQuestionIndex + 1];
                let previousQuestion = questions[currentQuestionIndex -1];                                    
                let totalPoints = questions.reduce(function(sum, item){
                    return sum = sum+item.points;
                },0);
                
                setTimeLeft(currentQuestion.timeLimit * 60 * 1000);

                setQuiz({...quiz,
                        questions,
                        currentQuestion,
                        nextQuestion,
                        previousQuestion,
                        currentQuestionIndex,
                        numberOfQuestions,
                        totalPoints
                });                
            }
    };

    const retakeQuiz = () => {
		setFinished(false);
        setQuizPassed(false);
        setEnableSubmitBtn(false);
        setCurrentAnswer("");
        setQuizResult({
            ...quizResult,            
            correctAnswers:0,
            wrongAnswers:0,
            numberOfAnsweredQuestion:0,
            totalPoints:0
        });	
        
        displayQuestions(0);
    };

    const [timeLeft, setTimeLeft] = useState(0);
    let mytimer = null;
    useEffect(() => {
        mytimer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1000), 1000);
        return () => {
                       
            clearInterval(mytimer)
            if(timeLeft === 1000){
                console.log("Time is up!"+timeLeft);
                timeIsUp();
                processQuizResult(); 
            }
        };
    }, [timeLeft]);

    const timeIsUp = () => {        
        // For User Quiz Details
        setUserQuizzes([...userQuizzes,{userAnswer:"No Answer",details:quiz.currentQuestion}]);

        setCurrentAnswer("");

        wrongAnswer();
    }

    const resetTimer = () => {
        clearInterval(mytimer);
    }

    useEffect(() => {        
        const quiz = quizzes.find((quiz) => quiz._id === id);
        
        if(!isEmpty(quiz)){
            setQuiz({
                ...quiz,
                quizName:quiz.quizName,
                questions:quiz.questions,
                quizId:id
            });
        }                       
    }, []);

    useEffect(() => {         
        if(quiz.questions && !isEmpty(quiz.questions)){            
            displayQuestions(0);
        }                
    }, [quiz.questions]);
    
    const onChooseAnswerHandler = (e) => {
        // console.log("User Answer:"+e.currentTarget.attributes.option.value);               
        setCurrentAnswer(e.currentTarget.attributes.option.value);                               
        setEnableSubmitBtn(true);        
    }

    const onConfirmAnswer = (e) => {        
        resetTimer();
        if(currentAnswer === quiz.currentQuestion.answer){
            correctAnswer();
        }else{
            wrongAnswer();
        }
        
        // For User Quiz Details
        setUserQuizzes([...userQuizzes,{userAnswer:currentAnswer,details:quiz.currentQuestion}]);

        processQuizResult();        
    }

    const processQuizResult = () => {
        setEnableSubmitBtn(false);
        setCurrentAnswer("");                
             
        if(Number(quiz.currentQuestionIndex+1) != quiz.numberOfQuestions){            
            displayQuestions(quiz.currentQuestionIndex+1);
        }else{            
            setFinished(true);

            const config = {
                headers: {
                    'Content-Type':'application/json',
                    'auth-token':token
                }
            }        
            const body = JSON.stringify({ 
                                        quizId:quiz.quizId, 
                                        userId:user.id, 
                                        score:quizResult.finalScore, 
                                        isPassed:quizPassed,
                                        details:JSON.stringify(userQuizzes)
                                    });
            
            // Save Quiz History
            axios.post(`${process.env.REACT_APP_BACKEND_API}/quiz/save`, body, config)
            .then(res => {            
                if(res.data.code){                                        
                    // setQuiz({...quiz,questions:res.data.quiz.questions});
                    console.log("Quiz has been recorded!");
                }          
            })
            .catch(err => {
                console.log("Error with Getting Quiz data!"+err);            
            });
        }
    }
    
    const correctAnswer = () => {
        // toast.success('Correct!',()=>{
        //     console.log('Correct!')
        // });
        let totalPoints = quizResult.totalPoints + quiz.currentQuestion.points;
        let finalScore = Math.round((totalPoints/quiz.totalPoints)*100);
        if(finalScore >79){
            setQuizPassed(true);
        }

        setQuizResult({...quizResult,
            totalPoints,
            finalScore,
            correctAnswers: quizResult.correctAnswers+1,
            numberOfAnsweredQuestion: quizResult.numberOfAnsweredQuestion+1
        });                    
    }

    const wrongAnswer = () => {
        // toast.error('Wrong!',()=>{
        //     console.log('Wrong!')
        // });
        
        setQuizResult({...quizResult, 
            wrongAnswers: quizResult.wrongAnswers+1,
            numberOfAnsweredQuestion: quizResult.numberOfAnsweredQuestion+1
        });
    }   

    return (
        <div className="quizSec">
            <Helmet>Quiz Page</Helmet>
            {/* <Timer initialMinute="30" initialSeconds="30" />             */}
            
            {!finished && !isEmpty(quiz.currentQuestion) ? 
                <Question quiz={quiz} 
                          currentAnswer={currentAnswer}
                          timeLeft={timeLeft}
                          enableSubmitBtn={enableSubmitBtn}
                          onConfirmAnswer={onConfirmAnswer}
                          onChooseAnswerHandler={onChooseAnswerHandler}
                />                             
            :   
                <QuizResult 
                    quiz={quiz} 
                    quizResult={quizResult} 
                    quizPassed={quizPassed} 
                    retakeQuiz={retakeQuiz}
                    userQuizzes={userQuizzes}
                />                 
            }
        </div>
    )
}

export default Quiz;
