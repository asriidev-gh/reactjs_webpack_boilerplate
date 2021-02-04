import React from 'react';
// import Ebooks from "../components/infinitescroll";
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t, i18n } = useTranslation();
    
    return (
        <div>
            <h1>Home</h1>
            {t("Introduction")}
        </div>
    )
}

export default Home
