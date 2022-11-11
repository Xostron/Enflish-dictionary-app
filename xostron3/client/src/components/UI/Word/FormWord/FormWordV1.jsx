import React, { useState, useEffect, useContext, useCallback, useRef, memo } from 'react'
import { HandySvg } from 'handy-svg'
import { MySetInput } from '../../Input/MySetInput'
import { InputMap } from '../../Input/InputMap'
import { MyCheckbox } from '../../Checkbox/MyCheckbox'
import style from './FormWordV1.module.css'
import iLogo from '../../../../img/bx-image-add.svg'
import { replaceInput } from '../../../../utils/UserFunction'


export const FormWordV1 = ({ obj, children }) => {
    // ***********************************Деструктуризация props******************************
    const {
        icon,
        value,
        changeHandler,
        changeHandlerTrl,
        handlerAddDel,
        idx,
        onCheck
    } = obj
    // **********************************Структуризация для компонента InputMap***************
    const translate = {
        trl: value.translate,
        changeHandlerTrl,
        handlerAddDel,
        idList: idx
    }
    // ***********************************STYLE******************************
    const leftStyle = [style.left]
    const rightStyle = [style.right]
    if (onCheck) {
        leftStyle.push(style.onCheck)
    }



    // ********************DEBUG********************
    console.log('@@@ PARENT MODAL - CHILDREN 2')

    return (
        <div className={style.container} >
            <div className={leftStyle.join(" ")}>

                {icon ?
                    <img className={style.logo} src={icon} alt="word" />
                    :
                    <HandySvg
                        src={iLogo}
                        className={style.logo}
                    />
                }

                <div className={style.mid}>
                    <MySetInput
                        word={value}
                        idx={idx}
                        changeHandler={changeHandler}
                    />

                    {/* input Translate */}
                    <InputMap
                        obj={translate}
                    />
                </div>
            </div>

            <div className={rightStyle.join(" ")}>
                {children}
            </div>
        </div >

    )
}
