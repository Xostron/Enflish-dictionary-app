import React from 'react'
import { NavLink } from 'react-router-dom'
import { HandySvg } from 'handy-svg'
import styleMenu from './LinkIconMenu.module.css'
import styleSt from './LinkIconSt.module.css'




const colorDisabled = '#0000003d'

export const LinkIcon = ({ item }) => {
    const {
        name,
        icon,
        to,
        type,
        disabled
    } = item

    //инициализация стиля
    let style = styleSt
    switch (type) {
        case 'menu' || 'navbar':
            style = styleMenu
            break

        case 'st' || 'standart':
            style = styleSt
            break

        default:
            style = styleSt
    }

    // подстветка активного состояния для NavLink
    function activeStyle({ isActive }) {
        return (isActive ? (style.myLink + ' ' + style.active) : style.myLink)
    }


    const eventDisabled = (e) => {
        if (disabled === 'none')
            e.preventDefault()
    }



    return (
        <NavLink
            key={to}
            className={activeStyle}
            to={to}
            onClick={eventDisabled}
            style={disabled === 'none' ? { color: colorDisabled } : {}}
        >
            <HandySvg
                src={icon}
                className={style.navIcon}
                width='24px'
                height='24px'
                style={disabled === 'none' ? { fill: colorDisabled } : {}}
            />
            <span className={style.navText}>{name}</span>
        </NavLink>
    )
}