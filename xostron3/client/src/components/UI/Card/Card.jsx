import React, { useState, useEffect, useCallback } from 'react'
import { parsePath, useNavigate } from 'react-router-dom'
import { HandySvg } from 'handy-svg'
import style from './Card.module.css'
import iCard from '../../../img/bx-library.svg';

export const Card = ({ value, icon }) => {
    const history = useNavigate()
    const detailHandler = () => {
        history(`/card/${value.id}/detail`)
    }

    return (
        <>
            <button className={style.wrapper}
                onClick={detailHandler}
            >
                {icon ?
                    <img
                        className={style.img}
                        src={icon}
                        alt="card"
                        width="96" height="96"
                    />
                    :
                    <HandySvg
                        src={iCard}
                        className={style.img}
                    />
                }

                <div className={style.text}>
                    <strong className={style.inner} >{value.name}</strong>
                    <div className={style.inner} >{value.user_id}</div>
                </div>
            </button>

        </>
    )
}