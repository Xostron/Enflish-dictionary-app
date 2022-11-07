import React, { useEffect, useState, useContext } from 'react'
import style from './ItemFormWord.module.css'
import { FormWordV1 } from '../FormWord/FormWordV1'
import { FormWordV0 } from '../FormWord/FormWordV0'
import { useHttp } from '../../../../hooks/http.hook'
import { userContext } from '../../../../context/user.context'
import { SetLinkOrBtn } from '../../../SetLinkOrBtn/SetLinkOrBtn'
import iDel from '../../../../img/bx-trash-alt.svg'
import iEdit from '../../../../img/bx-edit-alt.svg'
import iSave from '../../../../img/bxs-save.svg'
import iBack from '../../../../img/bx-undo.svg'

export const ItemFormWord = ({ idx, value, icon, dict, setDict, onCheck = false }) => {

    const { loading, error, clearError, request } = useHttp()
    const { updatePage, setUpdatePage } = useContext(userContext)
    const [word, setWord] = useState(value)
    const [preWord, setPreWord] = useState(value)

    useEffect(() => {
        setWord(value)
    }, [value])

    useEffect(() => {
        setDict({ ...dict, [idx]: word })
    }, [word])

    // События для FormWordV0 - редактирование/создание слов
    // включить редактирование
    const editHandler = () => {
        setPreWord(word)
        setWord({ ...word, ['visible']: true })
        // console.log('PRE = ', preWord)
    }

    // удалить слово
    const deleteOneHandler = async (idx) => {
        let data = dict[idx].word
        try {
            const word = await request(
                `api/dicteng/delete`,
                'DELETE',
                { data }
            )
            setUpdatePage(!updatePage)
        } catch (error) { }
    }

    // События для FormWordV1 - редактирование/создание слов
    // отменить создание слова
    const backHandler = (idx) => {
        let arr = Object.values(dict)
        const deleteCount = 1
        if (arr[idx].id === null) {
            // arr = Object.values(dict).filter(val => val['id'])
            arr.splice(idx, deleteCount)
            setDict({ ...arr })
        }
        else {
            setWord(preWord)
            // setWord({ ...preWord, ['visible']: false })
            // setUpdatePage(!updatePage)
        }
    }

    // сохранить слово
    const saveUpdateHandler = async (idx) => {
        let data = dict[idx]
        // console.log('test data = ', data)
        if (data.id === null) {
            // save new
            saveOne(data)
        }
        else {
            // update
            updateOne(data)
        }
    }

    const saveOne = async (data) => {
        try {
            const word = await request('/api/dicteng/create',
                'POST',
                { data }
            )
            setUpdatePage(!updatePage)
        } catch (error) { }
    }

    const updateOne = async (data) => {

        try {
            const word = await request('/api/dicteng/update',
                'PUT',
                { data })
            setUpdatePage(!updatePage)
        } catch (error) { }
    }

    // () => { setWord({ ...word, ['visible']: false }) }
    const btnItemsV0 = (idx) => {
        return ([
            { name: ``, to: ``, icon: iEdit, type: 'button', disabled: 0, handler: () => { editHandler(idx) } },
            { name: ``, to: ``, icon: iDel, type: 'button', disabled: 0, handler: () => { deleteOneHandler(idx) } },
        ])
    }
    const btnItemsV1 = (idx) => {
        return ([
            { name: ``, to: ``, icon: iBack, type: 'button', disabled: 0, handler: () => { backHandler(idx) } },
            { name: ``, to: ``, icon: iSave, type: 'button', disabled: 0, handler: () => { saveUpdateHandler(idx) } },
        ])
    }
    return (
        <div className={style.wrapper}>
            {
                word.visible || value.visible ?
                    // для редактирования 
                    <FormWordV1
                        icon={icon}
                        word={word}
                        setWord={setWord}
                        idx={idx}
                        onCheck={onCheck}
                    >
                        <SetLinkOrBtn items={btnItemsV1(idx)} />
                    </FormWordV1>
                    :
                    // для чтения
                    <FormWordV0
                        icon={icon}
                        word={word}
                        onCheck={onCheck}
                    >
                        <SetLinkOrBtn items={btnItemsV0(idx)} />
                    </FormWordV0>
            }
        </div>
    )
}