import React from 'react'
import style from './CardInfo.module.css'
import { HandySvg } from 'handy-svg'
import iIcon from '../../../../img/bx-library.svg'

export const CardInfo = ({ value }) => {
    return (

        <div className={style.container}>

            {value.icon ?
                <img
                    className={style.image}
                    src={value.icon}
                    alt="card" />
                :
                <HandySvg
                    src={iIcon}
                    className={style.icon}
                />
            }

            <div className={style.right}>

                <div className={style.secondaryText}>{value.lastUpdate} </div >
                <div className={style.titleText}>{value.name}</div >
                <div className={style.usualText}> {value.description}</div >


            </div>


        </div>
    )
}