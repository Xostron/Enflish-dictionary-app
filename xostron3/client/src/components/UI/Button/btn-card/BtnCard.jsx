import React from "react";
import style from './BtnCard.module.css'
import { HandySvg } from 'handy-svg'


export const BtnCard = ({ card }) => {
    const {
        name,
        icon,
        count,
        handler,
        color
    } = card

    return (
        <div className={style.container1}>
            <div
                className={style.wrapper}
                onClick={handler}
            >

                <span className={style.name}>{name}</span>

                <span className={style.count}>{count}</span>

                <HandySvg
                    src={icon}
                    className={style.icon}
                />

            </div>
        </div>
    )
}