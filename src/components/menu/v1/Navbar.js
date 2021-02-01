import React, {useState} from 'react';
import { connect } from "react-redux";
import "./NavbarElements.css";
import { Link } from "react-router-dom";

import { CSSTransition } from 'react-transition-group';

import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SchoolIcon from '@material-ui/icons/School';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import MenuIcon from '@material-ui/icons/Menu';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MessageIcon from '@material-ui/icons/Message';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';

import Logout from '../../auth/Logout';

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
    return (
        <>                    
            <nav className="navbar">
                <Link to='/' className='navbar-logo'>
                    <LocalLibraryIcon/><strong>K.A.E.L</strong>
                </Link>
                <div className='main-menu'>
                    <div className='menu-bar' onClick={toggle}>
                        <MenuIcon style={{ color: 'white' }}/>
                    </div>
                    <Link to='/dashboard' className='main-menu-item'>                        
                        <DashboardIcon/><i className='menu-label'>Dashboard</i>                        
                    </Link>
                    <Link to='/elibrary' className='main-menu-item'>
                        <LibraryBooksIcon/><i className='menu-label'>E-Library</i>
                    </Link>
                    <Link to='/academy' className='main-menu-item'>
                        <SchoolIcon/><i className='menu-label'>Academy</i>
                    </Link>
                </div>
                <ul className="navbar-nav">{children}</ul>
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

const DropdownMenu = ({logout,clearErrors}) => {

    const [activeMenu, setActiveMenu] = useState('main'); //settings, animals
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

    return (
        <div className="dropdown" style={{ height: menuHeight }}>
            <CSSTransition
                in={activeMenu === 'main'}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem leftIcon={<PersonIcon />}>My-Profile</DropdownItem>
                    <DropdownItem
                        leftIcon={<SettingsIcon />}
                        rightIcon={<ChevronRightIcon />}
                        goToMenu="settings">
                        Settings
                    </DropdownItem>                    
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
    return (            
        <NavContainer toggle={toggle}>
            <NavItem icon={<AddIcon />} />
            <NavItem icon={<NotificationsIcon />} />
            <NavItem icon={<MessageIcon />} />
            
            <NavItem icon={<ArrowDropDownIcon />}>
                {/* Drop down goes here */}
                <DropdownMenu />
            </NavItem>
        </NavContainer>        
    )
}

export default Navbar;
