import React, { useState, useEffect } from 'react'
import { replaceInput } from '../../utils/UserFunction'


export const TableCell = ({ setCell, cell, name }) => {

    const [trl, setTrl] = useState(cell[name])
    // обновление текста в ячейке
    useEffect(() => {
        setTrl((cell[name]))
    }, [cell])

    //обновление/форматирование текста в ячейке
    useEffect(() => {
        if (name === 'translate') { setTrl((trl)) }
    }, [trl])


    //событие input - изменение текста в ячейке, и state для родителя
    const changeHandler = (e) => {
        if (name !== 'translate') {
            setTrl(e.target.value)
            setCell({ ...cell, [name]: e.target.value })
        } else {
            let strTranslate = replaceInput(e.target.value)
            // console.log('Строка = ', strTranslate)
            // //выводим эту строку в input
            setTrl(strTranslate)
            //преобразуем строку в массив
            const arr = strTranslate.split(',').map((el) => { return (el.replace(/^\s+/g, '')) })
            //сеттим массив форме
            setCell({ ...cell, [name]: arr })
            console.log('Строка = ', cell[name])
            // console.log('массив = ', arr)
        }
    }


    return (
        <div>
            <input
                required
                style={{ textAlign: 'center' }}
                type="text"
                value={trl}
                onChange={changeHandler}
                placeholder={name}
            />
        </div>
    )
}

