import React from 'react'
import style from './MyFooter.module.css'

export const MyFooter = ({ children }) => {
    return (
        <div className={style.container} >
            <div className={style.wrapper}>
                <hr />
                {children}
            </div>
        </div>
    )
}