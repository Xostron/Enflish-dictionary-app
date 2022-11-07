import React, { useContext, useState } from "react";
import { userContext } from "../../context/user.context";
import { ToggleTheme } from "../UI/Toggle/ToggleTheme/ToggleTheme";
import { HandySvg } from 'handy-svg'
import { LinkIcon } from "../UI/Button/link-icon/LinkIcon";
import style from './Menu.module.css'
import iUser from '../../img/bxs-user.svg'
import iMy from '../../img/bx-home-alt-2.svg'
import iEdu from '../../img/bx-joystick.svg'
import iTrend from '../../img/bx-line-chart.svg'
import iLogin from '../../img/bx-user-circle.svg'
import iAbout from '../../img/bx-info-circle.svg'


const items = [
    { name: 'Главная', to: '/', icon: iMy, type: 'menu' },
    { name: 'Мои слова', to: '/words/edit', icon: iEdu, type: 'menu' },
    { name: 'Мои наборы', to: '/card/all', icon: iTrend, type: 'menu' },
    { name: 'Авторизация', to: '/login', icon: iLogin, type: 'menu' },
    { name: 'О нас', to: '/about', icon: iAbout, type: 'menu' }
]

export const Menu = ({ active, setActive }) => {
    const { theme, toggleTheme, username } = useContext(userContext)
    const container = active ? (style.container + " " + style.active) : style.container
    const activeMenu = () => { setActive(false) }

    return (
        <div className={container} onClick={activeMenu}>
            <div className={style.content}>

                {/* User + Toggle */}
                <div className={style.title} onClick={(e) => e.stopPropagation()}>
                    <div className={style.part1} >

                        <div className={style.iconUser} >
                            <img
                                src={iUser}
                                alt="user"
                                width='32px'
                                height='32px'
                            />
                        </div>

                        <div className={style.right}>
                            <ToggleTheme handler={toggleTheme} theme={theme} size='24px' />
                        </div>

                    </div>
                    <div className={style.userName} >@{username}</div>
                </div>

                {/* Links */}
                {
                    items.map((item) => {
                        return (
                            <LinkIcon key={item.to} item={item} />
                        )
                    })
                }
            </div >
        </div >
    )
} 