import React, {useState, useEffect} from 'react';
import { connect,useSelector,useDispatch } from "react-redux";
import PersonIcon from '@material-ui/icons/Person';
import { Link } from "react-router-dom";
import { Person } from '@material-ui/icons';

const Profile = ({user}) => {
    
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);

    return (
        <div className="menu-item">
            <span className="icon-button"><PersonIcon/></span>
            <Link to='/profile' className='main-menu-item'>{user.name}</Link>
        </div>
    )
}

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated,
//     user: state.auth.user,
//     error: state.error
// });

// export default connect(mapStateToProps, null)(Profile);
export default Profile;