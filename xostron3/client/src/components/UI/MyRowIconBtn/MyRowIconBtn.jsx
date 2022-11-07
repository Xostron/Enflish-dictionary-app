import React from 'react'
import { HandySvg } from 'handy-svg'
import style from './MyRowIconBtn.module.css'

export const MyRowIconBtn = ({ icon, children, ...props }) => {
    return (
        <div {...props} className={style.wrapper__btn}>

            <HandySvg
                src={icon}
                className={style.icon}
            />
            <span>{children}</span>
        </div>
    )
}