import React, { useState } from 'react'
import { ItemWord } from '../ItemWord'
import { MyCheckbox } from '../../Checkbox/MyCheckbox'
import style from './FormWordV0.module.css'

export const FormWordV0 = ({ word, icon, children, onCheck }) => {

    const styleLeft = onCheck ? `${style.left_part} ${style.onCheck}` : `${style.left_part}`

    return (
        <div className={style.wrapper__btn}>

            {/* левая часть - основной контент */}
            <div className={styleLeft}>
                {onCheck && <MyCheckbox handler={() => { }} />}

                <ItemWord word={word} icon={icon} />
            </div>

            {/* в правой части элемента распологаем кнопки, индикаторы и т.д. */}
            <div className={style.right_part}>
                {children}
            </div>

        </div>
    )
}