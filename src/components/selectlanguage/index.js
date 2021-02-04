import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import "./SelectLanguage.css";


const index = () => {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState("en");

    const handleLangChange = (e) => {
        const lang = e.target.value;        
        setLanguage(lang);       
        i18n.changeLanguage(e.target.value);
    }

    return (
        <select onChange={handleLangChange} value={language} className="changeLangSelect">
            <option value="ger">GER</option>
            <option value="jap">JAP</option>
            <option value="en">EN</option>
        </select>
    )
}

export default index;
