import React, { memo, useEffect, useRef, useState } from "react";
import style from './MySetInput.module.css'

const MySetInput = ({ idx, word, changeHandler }) => {
    // адаптатированный areatext 
    let arr_c = ['']
    const areaRef = useRef()
    // адаптированный areatext 
    useEffect(() => {
        // считывание строки в массив по разделителю "перевод строки"
        arr_c = String(word.example).split('\n')
        //изменение стиля для выбранного селектора
        switch (arr_c.length) {
            case 1:
                areaRef.current.style.height = `${1.6}rem`
                break;
            case 2:
            case 3:
            case 4:
                areaRef.current.style.height = `${1.19 * arr_c.length}rem`
                break;
            default:
                areaRef.current.style.height = `${5}rem`
                break;
        }
    }, [arr_c])

    return (
        <div
            className={style.wrapper}
        >
            <div
                className={style.row}
            >
                <input
                    className={style.my_input}
                    type="text"
                    autoComplete='off'
                    placeholder='Word'
                    name='word'
                    value={word.word}
                    onChange={(e) => changeHandler(e, idx)}
                />
                <input
                    className={style.my_input}
                    type="text"
                    autoComplete='off'
                    placeholder='Transcription'
                    name='transcription'
                    value={word.transcription}
                    onChange={(e) => changeHandler(e, idx)}
                />
            </div>
            <div
                className={style.row}
            >
                <textarea
                    className={style.my_textarea}
                    ref={areaRef}
                    type="text"
                    autoComplete='off'
                    placeholder='Note'
                    name='example'
                    value={word.example}
                    onChange={(e) => changeHandler(e, idx)}
                />
            </div>
        </div>
    )
}

export { MySetInput }