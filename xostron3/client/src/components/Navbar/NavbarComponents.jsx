import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { HandySvg } from 'handy-svg'

export const Nav = styled.nav`
    top: 0;
    left: 0;
    /* background: #740808; */
    width: 100vw;
    height: 48px;
    display: flex;
    justify-content:space-between;
    z-index:100;
    position: fixed;
    align-items:center;
    min-width: 343px;
`

export const NavLinkLogo = styled(Link)`
    display: flex;
    color:#8f8f8f;
    align-items:center;
    text-decoration:none;
    /* padding: 0 1rem; */
    cursor:pointer;
    padding:10px 22px;
    border-radius: 4px;

&:hover { 
    /* background: #256ce1; */
    color: #256ce1;
    transition: all .2s ease-in-out;
}

@media screen and (max-width: 580px){
    margin-left: 1.5rem;
}
`


export const NavLink = styled(Link)`
    display: flex;
    color:#8f8f8f;
    align-items:center;
    justify-content: center;
    text-decoration:none;
    /* padding: 0 1rem; */
    height: 100vh;
    cursor:pointer;
    padding:10px 4px;
    white-space: nowrap;

&.active{
    /* color:#15cdfc; */
    /* border: 1px solid #256ce1; */
}
&:hover { 
    /* background: #256ce1; */
    color: #15cdfc;
    transition: color .2s ease-in-out;
}
`

export const Bars = styled(FaBars)`
    display: none;
    color:#fff;

@media screen and (max-width:580px){
    display: flex;
    position: fixed;
    font-size: 1.8rem;
    margin-left: 8px;
    cursor: pointer;
    z-index: 100;
}
`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 8px;

@media screen and (max-width:580px){
    display:none;
}
`

export const RightNav = styled.div`
    display: flex;
    align-items:center;
    gap:8px;

    @media screen and (max-width:580px){
    display:none;
}
`

export const Switch = styled.div`
    margin-right:8px;
`

export const NavBtn = styled(Link)`
    display: flex;
    margin-right: 24px;
    & :hover{
    fill:#256ce1;
    transition: fill .2s ease-in-out;
    
}    
`
export const HandySvgStyled = styled(HandySvg)`
    fill: #5f5f5f;
`

export const Horiz = styled.div`
    left: 0;
    top:48px;
    width: 100vw;
    position: fixed;
    border: solid 1px;
    z-index: 100;
`
