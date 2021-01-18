import React, {useEffect,useState} from 'react';
import Axios from 'axios';

const useFetchEbooks = (page, searchTerm) => {

    const [ebooks, setEbooks] = useState(false);
    const [errors, setErrors] = useState([]);
    
    const [isLoading, setIsLoading] = useState(false);

    const api = process.env.REACT_APP_EBOOKS_API;
    const secret = process.env.REACT_APP_UNSPLASH_KEY;

    const fetch = () => {
        const url = searchTerm === null ? "ebooks?" : `search/ebooks?query=${searchTerm}&`;
        Axios.get(`${api}/${url}page=${page}`)
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
        ? setEbooks([...ebooks,...res.data.results])
        : setEbooks([...res.data.results]);
    };

    const fetchRandom = (res) => {
        if(images){
            setImages(images? [...images,...res.data] : setImages(res.data));
        }else{
            setImages(res.data);
        }
    }

    // this triggers when the page scrolls down 
    // which increase page count or when input search has been filled out
    useEffect(() => {
        setIsLoading(true);
        fetch();
    },[page,searchTerm]);

    return [images, setImages, errors, isLoading];
}

export default useFetchEbooks;
