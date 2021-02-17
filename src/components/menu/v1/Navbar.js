import React, {useState,useEffect} from 'react';
import { connect } from "react-redux";
import "./NavbarElements.css";
import { Link } from "react-router-dom";

import { CSSTransition } from 'react-transition-group';

import DashboardIcon from '@material-ui/icons/Dashboard';
import SchoolIcon from '@material-ui/icons/School';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import MenuIcon from '@material-ui/icons/Menu';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MessageIcon from '@material-ui/icons/Message';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import Logout from '../../auth/Logout';
import Profile from '../../profile';
import SelectLanguage from '../../selectlanguage';
import { useSelector } from "react-redux";
import { Button } from '@material-ui/core';

const MainMenuItem = ({children,icon,goToMenu}) => {
    const [activeMainMenu, setActiveMainMenu] = useState('home');
    
    return (
        <a href="#" 
           className="menu-item"
           onClick={() => goToMenu && setActiveMainMenu(goToMenu)}
        >
            <span className="icon-button">{icon}</span>
            {children}                
        </a>
    );
};


const NavContainer = ({toggle,children}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    return (
        <>                    
            <nav className="navbar">
                <Link to='/quizzes' className='navbar-logo'>
                    <LocalLibraryIcon/><strong>MPG</strong>
                </Link>
                <div className='main-menu'>
                    <div className='menu-bar' onClick={toggle}>
                        <MenuIcon style={{ color: 'white' }}/>
                    </div>
                    <Link to='/quizzes' className='main-menu-item'>                        
                        <DashboardIcon/><i className='menu-label'>Quizzes</i>                        
                    </Link>
                    <Link to='/createQuiz' className='main-menu-item'>
                        <LibraryBooksIcon/><i className='menu-label'>Create Quiz</i>
                    </Link>
                    {/* <Link to='/academy' className='main-menu-item'>
                        <SchoolIcon/><i className='menu-label'>Academy</i>
                    </Link> */}
                </div>
                { isAuthenticated ?
                <ul className="navbar-nav">{children}</ul>
                :
                <> 
                    <Link to='/login'>
                        <Button variant="outlined" style={{color:"#ffffff"}}>Login</Button>
                    </Link>
                    {/* <Button variant="outlined" style={{color:"#ffffff"}}>Sign-Up</Button> */}
                </>
                }
            </nav>
        </>
    )
}

const NavItem = ({icon, children}) => {
    
    const [open, setOpen] = useState(false);

    return (
        <li className="nav-item">
            <a href="#" 
               className="icon-button"
               onClick={()=>setOpen(!open)}
            >
                {icon}
            </a>

            {open && children}           
        </li>
    )
}

const DropdownMenu = ({navbarCallback,logout,clearErrors}) => {    
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);        

    const calcHeight = (el) => {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    const DropdownItem = ({children,leftIcon,rightIcon,goToMenu,action}) => {
        return (
            <a href="#" 
               className="menu-item"
               onClick={() => goToMenu && setActiveMenu(goToMenu) && action}
            >
                <span className="icon-button">{leftIcon}</span>
                {children}
                <span className="icon-right">{rightIcon}</span>
            </a>
        );
    }
    
    const hideMenu = () => {
        navbarCallback();
    };

    return (
        
        <div className="dropdown" style={{ height: menuHeight }}>
            <CSSTransition
                in={activeMenu === 'main'}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <Profile callback={hideMenu}/>                    
                    <Logout>Logout</Logout>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === 'settings'}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem goToMenu="main" leftIcon={<ArrowBackIcon />}>
                        <h2>My Tutorial</h2>
                    </DropdownItem>
                    <DropdownItem leftIcon={<OfflineBoltIcon />}>HTML</DropdownItem>
                    <DropdownItem leftIcon={<OfflineBoltIcon />}>CSS</DropdownItem>
                    <DropdownItem leftIcon={<OfflineBoltIcon />}>JavaScript</DropdownItem>
                    <DropdownItem leftIcon={<OfflineBoltIcon />}>Awesome!</DropdownItem>
                </div>
            </CSSTransition>            
        </div>
    );
}

const Navbar = ({toggle}) => {
    const [open, setOpen] = useState(false);
    const navbarCallback = () => {
       setOpen(!open); 
    }    
    return (            
        <NavContainer toggle={toggle}>
            <SelectLanguage />
            {/* <NavItem icon={<AddIcon />} /> */}
            <NavItem icon={<NotificationsIcon />} />
            <NavItem icon={<MessageIcon />} />              

            <li className="nav-item">
                <a href="#" 
                className="icon-button"
                onClick={()=>setOpen(!open)}
                >
                    <ArrowDropDownIcon />
                </a>
                    {open && <DropdownMenu navbarCallback={navbarCallback}/>}           
            </li>
        </NavContainer>        
    )
}

export default Navbar;
