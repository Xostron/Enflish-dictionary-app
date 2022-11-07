import React, { useState, useEffect, useContext, useCallback } from 'react'
import { replaceInput } from '../UserFunction'

export const FormWordV2 = ({ save, word, setWord }) => {

    const [trl, setTrl] = useState(word.translate)

    const changeHandler = (e) => {
        if (e.target.name != 'translate') {
            setWord({ ...word, [e.target.name]: e.target.value })
        } else {
            //фильтруем строку (/[^a-zа-яё0-9\,\.\@\-\+]\s+/gi, ' ')
            let strTranslate = replaceInput(e.target.value)
            //выводим эту строку в input
            setTrl(strTranslate)
            //преобразуем строку в массив
            const arr = strTranslate.split(',').map((el) => { return (el.replace(/^\s+/g, '')) })
            //сеттим массив форме
            setWord({ ...word, ['translate']: arr })
            console.log('Строка = ', strTranslate)
            console.log('массив = ', arr)
        }
    }
    return (
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
            <input
                type="text"
                placeholder='Word'
                name='word'
                onChange={changeHandler}
            />
            <input
                type="text"
                placeholder='Transcription'
                name='transcription'
                onChange={changeHandler}
            />

            <input
                type="text"
                placeholder={'Translate'}
                name='translate'
                value={trl}
                onChange={changeHandler}
            />

            <input
                type="text"
                placeholder='Comment/Context'
                name='comment'
                onChange={changeHandler}
            />
            <button
                onClick={save}
            >
                Сохранить</button>
        </div >
    )
}