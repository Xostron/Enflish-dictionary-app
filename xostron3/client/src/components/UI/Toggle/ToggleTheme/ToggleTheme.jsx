import React from 'react'
import iSun from '../../../../img/bxs-sun.svg'
import iMoon from '../../../../img/bxs-moon.svg'
import style from './ToggleTheme.module.css'
import { HandySvg } from 'handy-svg'


export const ToggleTheme = ({ theme, handler, size }) => {

    return (

        <div
            className={style.wrapper}
            onClick={handler}

        >
            <HandySvg
                src={iMoon}
                className={theme === 'light' ? style.moon : (style.moon + ' ' + style.active)}
                width={size}
                height={size}
            />
            <HandySvg
                src={iSun}
                className={theme === 'light' ? style.sun : (style.sun + ' ' + style.active)}
                width={size}
                height={size}
            />
            {/* <img
                className={theme === 'light' ? style.moon : (style.moon + ' ' + style.active)}
                src={iMoon}
                name={name}
            />
            <img
                className={theme === 'dark' ? (style.sun + ' ' + style.active) : style.sun}
                src={iSun}
                name={name}
            /> */}


        </div>


    )
}