
import React, { useState, useEffect, useCallback } from 'react'
import { TableCell } from "./TableCell"
import { replaceInput } from '../../utils/UserFunction'

export const TableRow = ({ index, row, setDict, dict }) => {
    //IN - для ребенка TableCell
    const [cell, setCell] = useState(row)

    //state для дочерней ячейки, чтобы обеспечить изменяемость строки
    useEffect(() => {
        setCell(row)
        // console.log('row++++', row)
    }, [row])

    //OUT - для обновления родителя
    useEffect(() => {
        setDict({ ...dict, [index]: cell })
    }, [cell])


    //удалить строку и изменить родительский state
    const delRowHandler = (e) => {
        setDict(Object.values(dict).filter((val, i) => {
            // console.log('val', val.word)
            return i != e.target.name
        }))
    }

    //Добавить строку и изменить родительский state
    const addRowHandler = (e, UpDown) => {
        const row = {
            id: null,
            word: '',
            transcription: '',
            translate: [],
            comment: ''
        }
        // console.log('dict row pre', dict, row)

        setDict(() => {
            let dict2 = Object.values(dict)
            if (UpDown === 'up') {
                dict2.splice(Number(e.target.name), 0, row)
            } else if (UpDown === 'down') {
                dict2.splice(Number(e.target.name) + 1, 0, row)
            }
            // console.log('dict row last', Object.assign(dict2))
            return dict2
        })
    }


    return (
        <tr>
            <td><div style={{ width: '50px', background: 'white', textAlign: 'center' }}>{index + 1}</div></td>
            <td><TableCell setCell={setCell} cell={cell} name='word' /></td>
            <td><TableCell setCell={setCell} cell={cell} name='transcription' /></td>
            <td><TableCell setCell={setCell} cell={cell} name='translate' /></td>
            <td><TableCell setCell={setCell} cell={cell} name='comment' /></td>
            <td>
                <button
                    name={index}
                    onClick={(e) => { addRowHandler(e, 'up') }}
                >Добавить cверху</button>
                <button
                    name={index}
                    onClick={(e) => { addRowHandler(e, 'down') }}
                >Добавить cнизу</button>
                <button
                    name={index}
                    onClick={delRowHandler}
                >Удалить</button>
            </td>
        </tr>
    )
}

