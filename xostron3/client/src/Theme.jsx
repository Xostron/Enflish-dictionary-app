import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import './App.css'
import subtitle from './components/UI/Subtitle/Subtitle.module.css'
import subtitle2 from './components/UI/Subtitle/Subtitle2.module.css'
import subtitle3 from './components/UI/Subtitle/Subtitle3.module.css'
import rowIconBtn from './components/UI/MyRowIconBtn/MyRowIconBtn.module.css'
import Card from './components/UI/Card/Card.module.css'
import RowCard from './components/UI/Card/RowCard/RowCard.module.css'
import ItemWord from './components/UI/Word/ItemWord.module.css'
import DropdownV0 from './components/UI/Dropdown/DropdownV0.module.css'
import { NavLink, Nav, NavLinkLogo, Horiz } from './components/Navbar/NavbarComponents'
import LinkIcon from './components/UI/Button/link-icon/LinkIconMenu.module.css'
import Menu from './components/Navbar/Menu.module.css'
import LinkIconSt from './components/UI/Button/link-icon/LinkIconSt.module.css'
import BtnIkon from './components/UI/Button/btn-icon/BtnIcon.module.css'
import MyFooter from './components/UI/Footer/MyFooter.module.css'
import BtnV1 from './components/UI/Button/btn-text/BtnV1.module.css'
import InFileAvaCard from './components/UI/InputFile/InFileAvaCard/InFileAvaCard.module.css'
import OneCardRouterPage from './pages/OneCardRouterPage.module.scss'
import BtnCard from './components/UI/Button/btn-card/BtnCard.module.css'
import TrainPageLearning from "./pages/TrainingPages/TrainPageLearning.module.scss"
import InputBtnImg from './components/UI/Button/input-file/InputBtnImg.module.css'

export const LightTheme = {
    body: '#e2e2e2',
    fontColor: "#000",
    borderColor: '#a7a7a7',
    GlobalColor: '#474747',
    LogoColor: '#5f5f5f',
    navBackground: '#c5c5c5',
    shadow: '#414141',
    col1: '#256ce1',
    spanColor: '#5e5e5e',
    test: '#e03c30',
    cardBorder: '#5e5e5e',
    cardBackground: '#d3d3d3',
    shadow1: '#f5f5f5',
    shadow2: "#000"
}

export const DarkTheme = {
    body: '#333333',
    fontColor: "#eeeeee",
    borderColor: '#525252',
    GlobalColor: '#e6e6e6',
    LogoColor: '#e6e6e6',
    navBackground: '#2b2b2b',
    shadow: '#131313',
    col1: '#15cdfc',
    spanColor: '#8f8f8f',
    test: '#37ad4b',
    cardBorder: '#a0a0a0',
    cardBackground: '#5e5e5e',
    shadow1: '#222222',
    shadow2: "#8f8f8f"
}

export const ThemeWrapper = styled.div`
    
`

export const GlobalStyles = createGlobalStyle`
    a.${LinkIcon.myLink}{
        color: ${(props) => props.theme.LogoColor};
    }
    a.${LinkIconSt.myLink}{
        color: ${(props) => props.theme.LogoColor};
    }

    body{
        background-color: ${(props) => props.theme.body};
        color:  ${(props) => props.theme.GlobalColor};
        transition: all .2s ease;
    }

    button.${rowIconBtn.wrapper__btn}{
        background-color: ${(props) => props.theme.body};
        color: ${(props) => props.theme.GlobalColor};
    }
    button.${BtnV1.container}{
        border-color: ${(props) => props.theme.borderColor};
        background-color: ${(props) => props.theme.body};
        color: ${(props) => props.theme.GlobalColor};
    }
    button:hover.${BtnV1.container} {
        border-color: ${(props) => props.theme.LogoColor};
    }

    div.horizLine, div.horizLineFooter{
        border-color: ${(props) => props.theme.borderColor};
    }
    div.title__module{
        color: ${(props) => props.theme.GlobalColor};
    }
    div.${Menu.content}{
        background-color: ${(props) => props.theme.navBackground};
    }
    div.${subtitle.title__module}{
        color: ${(props) => props.theme.GlobalColor};
    }
    div.${subtitle3.title}{
        color: ${(props) => props.theme.GlobalColor};
        background-color: ${(props) => props.theme.body};
    }
    div.${Card.text}{
        color: ${(props) => props.theme.GlobalColor};
    }

    div.${ItemWord.inner}{
        color: ${(props) => props.theme.GlobalColor};
    }
    div.${RowCard.wrapper__btn}{
        background-color: ${(props) => props.theme.body};
        color: ${(props) => props.theme.GlobalColor};
    }
    div.${DropdownV0.content}{
        background-color: ${(props) => props.theme.body};
        color: ${(props) => props.theme.GlobalColor};
    }
    div.${MyFooter.container}{
        border-color: ${(props) => props.theme.borderColor};
        background-color: ${(props) => props.theme.body};
    }
    div.${TrainPageLearning.myFooter}{
        border-color: ${(props) => props.theme.borderColor};
        background-color: ${(props) => props.theme.body};
    }
    div.${InFileAvaCard.container}{
        outline-color: ${(props) => props.theme.borderColor};
    }
    div.${OneCardRouterPage.header}{
        background-color: ${(props) => props.theme.body};
    }
    div.${BtnCard.container1}{
        border-color: ${(props) => props.theme.cardBorder};
        background-color: ${(props) => props.theme.cardBorder};
    }
    div.${BtnCard.wrapper}{
        background-color: ${(props) => props.theme.cardBackground};
        --box-shadow-color1: ${(props) => props.theme.shadow1};
        --box-shadow-color2: ${(props) => props.theme.shadow2};
        box-shadow: -2px -2px 15px var(--box-shadow-color1),
                    -2px -2px 15px var(--box-shadow-color1),
                    -2px -2px 15px var(--box-shadow-color1),
                    -2px -2px 15px var(--box-shadow-color1),
                    2px 2px 15px var(--box-shadow-color2);
    }
    hr{
        border-color: ${(props) => props.theme.borderColor};
    }
    html::-webkit-scrollbar-track{
        background-color: ${(props) => props.theme.body};
    }

    input{
        color:  ${(props) => props.theme.GlobalColor};
    }

    textarea{
        color:  ${(props) => props.theme.GlobalColor};
    }

    
    svg{
        fill: ${(props) => props.theme.LogoColor};
    }
    svg.${LinkIcon.navIcon}{
        fill: ${(props) => props.theme.LogoColor};
    }
    svg.${LinkIconSt.navIcon}{
        fill: ${(props) => props.theme.LogoColor};
    }
    svg.${DropdownV0.btnIcon}{
        fill: ${(props) => props.theme.LogoColor};
    }

    span{
    color: ${(props) => props.theme.spanColor};
    }
    span.text_span{
    color: ${(props) => props.theme.spanColor};
    }
    span.${BtnIkon.text}{
        color: ${(props) => props.theme.LogoColor};
    }
    span.${InputBtnImg.text}{
        color: ${(props) => props.theme.LogoColor};
    }
    span.${subtitle.text_span}{
    color: ${(props) => props.theme.spanColor};
    }
    span.${subtitle2.text_span}{
    color: ${(props) => props.theme.spanColor};
    }
    span.${BtnCard.name}{
        color: ${(props) => props.theme.LogoColor};
    }

    ${NavLink}{
        color: ${(props) => props.theme.GlobalColor};
    }
    ${NavLink}:hover{
        color: ${(props) => props.theme.col1};
    }    
    ${NavLink}.active{
        color: ${(props) => props.theme.col1};
    }
    ${Nav}{
        background-color: ${(props) => props.theme.navBackground};
    }
    ${NavLinkLogo}{
        color: ${(props) => props.theme.LogoColor};
    }
    ${Horiz}{
        border-color: ${(props) => props.theme.borderColor};
        --box-shadow-color: ${(props) => props.theme.shadow};
        box-shadow: 0px 0px 10px var(--box-shadow-color);
    }
    
`
