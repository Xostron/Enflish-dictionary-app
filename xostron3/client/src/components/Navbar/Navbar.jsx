import React, { useState, useContext } from 'react'
import { userContext } from '../../context/user.context'
import {
    Nav, NavLink, Bars, NavMenu, NavBtn, Horiz,
    Switch, NavLinkLogo, RightNav, HandySvgStyled
} from './NavbarComponents'
import { ToggleTheme } from '../UI/Toggle/ToggleTheme/ToggleTheme'
import iLogin from '../../img/bx-log-in.svg'
import iMain from '../../img/bx-home-alt-2.svg'
import iInfo from '../../img/bx-help-circle.svg'
import { SetLinkOrBtn } from '../SetLinkOrBtn/SetLinkOrBtn'

export const Navbar = ({ active, setActive }) => {
    const { theme, toggleTheme } = useContext(userContext)
    const btnItems = [
        { name: 'Главная', to: ``, icon: iMain, type: 'link', disabled: 0 },
        { name: 'О приложении', to: `about`, icon: iInfo, type: 'link', disabled: 0 },
        { name: 'Test', to: `test`, icon: iInfo, type: 'link', disabled: 0 },
    ]
    return (
        <>
            {/* <Menu items={items} active={active} setActive={setActive} /> */}
            <Nav>
                <Bars onClick={() => { setActive(!active) }} />
                <NavLinkLogo to='/'>
                    <h2>XosTron</h2>
                </NavLinkLogo>



                <RightNav>
                    <NavMenu>
                        {/* <NavLink to='/' >Моя страница</NavLink> */}
                        {/* <NavLink to='/training' >Тренировка</NavLink> */}
                        {/* <NavLink to='/admin' >Статистика</NavLink> */}
                        {/* <NavLink to='/about' >О нас</NavLink> */}
                        {/* <NavLink to='/login' >Авторизация</NavLink> */}
                        {/* <NavLink to='/dictionary' >Резерв</NavLink> */}
                        <SetLinkOrBtn items={btnItems} />
                    </NavMenu>
                    <Switch>
                        <ToggleTheme handler={toggleTheme} theme={theme} size='32px' />
                    </Switch>

                    <NavBtn to='/login'>
                        <HandySvgStyled
                            src={iLogin}
                            width='32px'
                            height='32px'
                        />
                    </NavBtn>
                </RightNav>



            </Nav>
            {/* <hr /> */}
            {/* <Horiz /> */}
        </>
    )
}
