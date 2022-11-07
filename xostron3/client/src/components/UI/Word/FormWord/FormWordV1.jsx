import React, { useState, useEffect, useContext, useCallback, useRef, memo } from 'react'
import { HandySvg } from 'handy-svg'
import { MySetInput } from '../../Input/MySetInput'
import { InputMap } from '../../Input/InputMap'
import { MyCheckbox } from '../../Checkbox/MyCheckbox'
import style from './FormWordV1.module.css'
import iLogo from '../../../../img/bx-image-add.svg'
import { replaceInput } from '../../../../utils/UserFunction'


export const FormWordV1 = ({ idx, children, word, setWord, icon, onCheck = true }) => {

    const leftStyle = [style.left]
    const rightStyle = [style.right]
    if (onCheck) {
        leftStyle.push(style.onCheck)
    }
    // if (word['translate'].length > 1) {
    //     leftStyle.push(style.alignTop)
    //     rightStyle.push(style.alignTop)
    // }


    // обработка translate 
    const [trl, setTrl] = useState(word['translate'])
    // сохранение изменений
    useEffect(() => {
        setTrl(word['translate'])
    }, [word['translate']])

    const changeHandlerTrlAddDel = (mode, idx) => {
        let currentVal = trl
        if (mode === 'add') {
            currentVal.push('')
        }
        // delete
        else {
            currentVal.splice(idx, 1)
        }

        setTrl(currentVal)
        setWord({ ...word, ['translate']: currentVal })
    }

    //Считывание input
    const changeHandler = (e, i) => {
        if (e.target.name != 'translate') {
            // console.log('key = ', i, e.target.value)
            let test = replaceInput(e.target.value)
            setWord({ ...word, [e.target.name]: test })
        } else {
            let currentVal = trl.map((elem, index) =>
                index == i ? e.target.value : elem
            )
            setTrl(currentVal)
            setWord({ ...word, ['translate']: currentVal })
        }
        // console.log('key = ', i, e.target.value)
    }

    const translate = {
        trl: trl,
        handler: (e, i) => changeHandler(e, i),
        handlerAddDel: (mode, i) => changeHandlerTrlAddDel(mode, i)
    }
    // ********************DEBUG********************
    console.log('@@@ PARENT MODAL - CHILDREN 2')
    return (

        <div className={style.container} >

            <div className={leftStyle.join(" ")}>
                {/* {onCheck && <MyCheckbox handler={() => { }} />} */}
                {/* Avatar */}
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
                        word={word}
                        idx={idx}
                        changeHandler={(e) => changeHandler(e, idx)}
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
            {/* </div> */}
        </div >

    )
}
