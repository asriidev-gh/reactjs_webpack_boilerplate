import React, {useState,useEffect} from 'react';
import useFetchEbooks from './useFetchEbooks';


const Ebooks = () => {

    const [page, setPage] = useState(1);

    const [searchTerm, setSearchTerm] = useState(null);

    const [ebooks, setEbooks, errors, isLoading] = useFetchEbooks(page,searchTerm);
    const [ebooksLength, setEbooksLength] = useState(0);
    
    useEffect(() => {
        if(images && images.length > 0){
            setEbooksLength(images.length);
        }
    }, [images]);

    return (
        <div>
            
        </div>
    )
}

export default Ebooks
