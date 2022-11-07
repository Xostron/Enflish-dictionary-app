import React, { useState, useEffect, useCallback } from 'react'
import style from './RowWord.module.css'
import iDots from '../../../../img/bxs-down-arrow.svg'
import { Indicator } from '../../Indicator/Indicator'
import { ItemWord } from '../ItemWord'

// import '../Indicator/Indicator.css'

export const RowWord = ({ idx, value, icon, ratio }) => {

    return (
        <button className={style.wrapper__btn}>

            <ItemWord word={value} icon={icon} />

            <div className={style.right_part}>
                <Indicator key={idx} value={ratio} idx={idx} />
                <input className={style.btn__option} type='image' src={iDots} alt='' width='32' height='32' />
            </div>

        </button >
    )
}
