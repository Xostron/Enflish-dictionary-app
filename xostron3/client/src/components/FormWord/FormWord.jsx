import React, { useState, useEffect, useContext, useCallback } from 'react'

export const FormWord = ({ save, word, setWord, trl, setTrl }) => {
    //счетчик для поля translate (кол-во добавляемых input)
    const [countTrl, setCountTrl] = useState([1])

    const changeHandler = (e, i) => {
        if (e.target.name != 'translate') {
            setWord({ ...word, [e.target.name]: e.target.value })
        } else {
            console.log('key = ', i)
            setTrl(trl.map((elem, index) =>
                index == i ? e.target.value : elem
            ))
        }
    }
    return (
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
            <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0]
                }}
            />
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
            <div>
                <button
                    onClick={() => {
                        setCountTrl([...countTrl, ++countTrl[countTrl.length - 1]])
                        setTrl([...trl, ''])
                    }}
                >
                    +Add</button>
                <button
                    onClick={() => {
                        if (countTrl.length > 1) {
                            setCountTrl(countTrl.slice(0, countTrl.length - 1))
                            setTrl(trl.slice(0, countTrl.length - 1))
                        }
                    }}
                >
                    -sub</button>
            </div>

            {countTrl.map((i) => {
                return (
                    <input
                        key={i}
                        type="text"
                        placeholder={'Translate ' + i}
                        name='translate'
                        onChange={(e) => changeHandler(e, i - 1)}
                    />
                )
            })
            }

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