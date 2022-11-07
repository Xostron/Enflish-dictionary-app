import React, { useState, useEffect, useCallback } from 'react'
import { HandySvg } from 'handy-svg'
import style from './ItemWord.module.css'
import iIcon from '../../../img/bx-leaf.svg'

export const ItemWord = ({ word, icon }) => {

    return (
        <div className={style.left_part}>

            {icon ?
                <img
                    className={style.icon}
                    src={icon}
                    alt="word"
                />
                :
                <HandySvg
                    src={iIcon}
                    className={style.svg}
                />
            }

            <div className={style.text__wrapper}>
                <div className={style.inner1}>
                    {word.word} {' '}
                    <span className={style.inner2}>[{word.transcription}]</span>
                </div>

                <div className={style.inner2}>{word.translate[0]}</div>
            </div>
        </div>
    )
}