import React, {useState, useEffect} from 'react';
import { connect,useSelector,useDispatch } from "react-redux";
import PersonIcon from '@material-ui/icons/Person';
import { Link } from "react-router-dom";

const Profile = () => {        
    const user = useSelector(state => state.auth.user);    

    return (
        <div className="menu-item">
            <span className="icon-button"><PersonIcon/></span>
            <Link to='/profile' className='main-menu-item'>{user.name}</Link>
        </div>
    )
}

export default Profile;