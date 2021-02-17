import React from 'react';
import { SidebarContainer, 
         Icon, 
         CloseIcon,
         SidebarWrapper,
         SidebarMenu,         
         SidebarRoute,
         SideBtnWrap
        } from "./SidebarElements";

const Sidebar = ({isOpen, toggle}) => {
    console.log("isOpen:"+isOpen);
    return (        
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarRoute to="/quizzes">Quizzes</SidebarRoute>
                    <SidebarRoute to="#">Create Quiz</SidebarRoute>                    
                </SidebarMenu>
                {/* <SideBtnWrap>
                    <SidebarRoute to="/signin">Sign In</SidebarRoute>
                </SideBtnWrap> */}
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar;