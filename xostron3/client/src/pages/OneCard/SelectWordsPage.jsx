import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ItemFormWord } from '../../components/UI/Word/Edit/ItemFormWord'
import { useHttp } from '../../hooks/http.hook'
import iNo from '../../img/bx-x.svg'
import iYes from '../../img/bx-check.svg'





export default function SelectWordsPage() {
    const history = useNavigate()
    // хук API запросов на backend
    const { loading, error, clearError, request } = useHttp()
    // Массив слов
    let [dict, setDict] = useState([])

    const selectWords = (idx) => {
        console.log('TestHandlerCheckbox =', idx)
        let word = dict[idx]
        word.check = !word.check
        setDict({ ...dict, [idx]: word })
    }

    // API запрос - чтение всех слов
    const ReadHandler = async () => {
        try {
            const words = await request(
                '/api/dicteng/read',
                'GET', null
            )
            let arr = []
            words.message.forEach(val => {
                setDict(() => {
                    arr.push(
                        {
                            id: val.id,
                            word: val.word || '',
                            transcription: val.transcription || '',
                            translate: val.translate || '',
                            example: val.example || '',
                            img: val.img || '',
                            visible: false,
                        })
                    return arr
                })
            });
        } catch (error) { }
    }
    // Сетевой запрос - чтение слов (выполняется после обновления DOM (отрисовки))
    useEffect(() => {
        ReadHandler()
    }, [])

    return (
        <>

            {dict && Object.values(dict).map((value, idx) => {
                return (
                    <ItemFormWord
                        key={idx}
                        idx={idx}
                        value={value}
                        icon={''}
                        dict={dict}
                        setDict={setDict}
                        onCheck={true}
                        onEdit={false}
                        onDel={false}
                    />
                )
            })}
        </>
    )
}