import React from 'react';
// import Ebooks from "../components/infinitescroll";
import { useTranslation } from 'react-i18next';
import Quizzes from '../components/quiz/Quizzes';

const Home = () => {
    const { t, i18n } = useTranslation();
    
    return (
        <div>
            <Quizzes/>
        </div>
    )
}

export default Home
