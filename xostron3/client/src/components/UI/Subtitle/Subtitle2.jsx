import React from 'react'
import { HandySvg } from 'handy-svg'
import style from './Subtitle2.module.css'


export const Subtitle2 = ({ children, icon1, icon2, handler1, handler2, title, text }) => {
    return (
        <div className={style.title}>
            <div className={style.left}>
                <div className={style.btn} onClick={handler1}>
                    <HandySvg
                        src={icon1}
                        className={style.icon}
                    />
                </div>

                <strong>
                    {title}
                    <span className={style.text_span}>{text}</span>
                </strong>

            </div>
            <div className={style.middle}>
                {children}
            </div>


            <div className={style.right}>
                <div className={style.btn} onClick={handler2}>
                    <HandySvg
                        src={icon2}
                        className={style.icon}
                    />
                </div>
            </div>
        </div>
    )
}