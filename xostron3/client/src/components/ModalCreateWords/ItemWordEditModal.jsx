import React, { memo, useEffect, useState } from 'react'
import style from './ItemWordEditModal.module.css'
import { FormWordV1 } from '../UI/Word/FormWord/FormWordV1'



export const ItemWordEditModal = ({ value, icon, idx,
    dict, setDict }) => {

    const [word, setWord] = useState(value)

    useEffect(() => {
        setWord(value)
        console.log('11111111111111111')
    }, [value])

    useEffect(() => {
        setDict({ ...dict, [idx]: word })


    }, [word])

    // ********************DEBUG********************
    console.log('@@@ PARENT MODAL - CHILDREN 1')


    return (

        <td >
            <FormWordV1
                icon={icon}
                word={word}
                setWord={setWord}
                idx={idx}
            />
        </td>
    )
}