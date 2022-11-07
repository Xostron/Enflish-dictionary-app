import React from 'react'
import { NavLink } from 'react-router-dom'
import { HandySvg } from 'handy-svg'
import style from './Subtitle.module.css'

export const Subtitle = ({ iconBtn, path, val, name }) => {
    return (
        <div className={style.title__module}>
            <strong>{name}<span className={style.text_span}> {val}</span></strong>
            <NavLink className={style.btn__option} to={path}>
                <HandySvg
                    src={iconBtn}
                    className={style.img}
                />
                {/* <img src={iconBtn} alt="show card" width='24' height='24' /> */}
            </NavLink>
        </div>
    )
}