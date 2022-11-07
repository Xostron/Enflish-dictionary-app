import React, { useEffect, useState, useCallback, useContext, useMemo } from "react";
import { userContext } from '../../context/user.context'
import { useHttp } from '../../hooks/http.hook'
import { InputBtnImg } from "../UI/Button/input-file/InputBtnImg";
import { SelectorV2 } from "../UI/Dropdown/SelectorV2";
import { BtnIcon } from "../UI/Button/btn-icon/BtnIcon";
import { MySelect } from "../UI/Select/MySelect";
import { replaceInput, sortWords } from '../../utils/UserFunction'
import style from './PanelModal.module.css'
import iOpen from '../../img/bx-folder-open.svg'
import iSave from '../../img/bxs-save.svg'
import iClear from '../../img/bx-eraser.svg'
import iClose from '../../img/bx-x.svg'



export const PanelModal = ({ dict, setDict, flag, readExcel }) => {

    //Подключаем хук для API запросов на backend
    const { loading, error, clearError, request } = useHttp()
    //подключаем глобальные данные об авторизованном пользователе
    const user = useContext(userContext)
    // всплывающее меню - selector
    const [selectVal, setSelectVal] = useState([
        { name: 'Не выбрано', value: '' },
        { name: 'по Word', value: 'word' },
        { name: 'по Translate', value: 'translate' }
    ])
    // прошлое состояние списка слов - для возврата к исходному 
    // (от фильтрованному) списку
    const [preDict, setPreDict] = useState(dict)
    const [preSelectVal, setPreSelectVal] = useState({ name: 'Не выбрано', value: '' })

    useEffect(() => {
        if (selectVal === preSelectVal) {
            console.log("save predict", dict)
            setPreDict(dict)
        }
        setPreSelectVal(selectVal)
    }, [flag])

    // Подсчет дублирующих или пустых строк
    const [countFiltered, setCountFiltered] = useState(0)
    useEffect(() => {
        const ori = Object.values(dict)
        const arr = Object.values(filterDict())
        // console.log('ori =', ori.length)
        // console.log('arr =', arr.length)
        let n = ori.length - arr.length
        setCountFiltered(n)
    }, [dict])

    //фильтр по уникальному полю word
    const filterDict = () => {
        const ori = Object.values(dict)//исходный массив
        //на основе исходного массива - только с полем word
        const arr = ori.map((val) => { return val.word })
        let resWord = [] //отфильтрованный массив (arr[i] = 'word')
        let resIdx = [] //отфильтрованный массив (index)
        //фильтр
        arr.forEach((val, idx) => {
            if (!resWord.includes(val) && val != '') {
                resWord.push(val)
                resIdx.push(idx)
            }
        })
        //формируем новый массив по индексам отфильтрованного и элементам исходного
        let result = resIdx.map((val, idx) => {
            return ori[val]
        })

        if (result.length === 0) {
            result.push({
                word: '',
                transcription: '',
                translate: [],
                comment: '',
                img: ''
            })
        }
        return result
    }

    //Отфильтровать список слов по кнопке 
    // (удалить схожие слова по полю word, и пустые строчки)
    const filterDictHandler = () => {
        const arr = filterDict()
        setDict({ ...arr })
    }

    //сортировка по word, по translate
    function getSortedWords(dict, sort) {
        if (selectVal.value != '') {
            let arr = sortWords(dict, sort)
            setDict({ ...arr })
        }
    }

    // обработка selector
    useMemo(() => {
        if (selectVal.value !== '') {
            getSortedWords(dict, selectVal.value)
            console.log('PRE != ', selectVal, dict)
        } else {
            setDict(preDict)
            console.log('PRE == ', preDict)
        }
    }
        , [selectVal])

    //Сохранение слов в БД
    const CreateHandler = async () => {
        const link = {
            create_date: new Date(),
            last_repeat_date: null,
            repeat_count: 0,
            correct_count: 0,
            ratio: 0,
            login_id: user.userState.id,
            login_code_access: user.userState.code_access
        }
        let arr = { ...filterDict() }
        setDict(arr)
        // console.log('save2', dict, arr)
        try {
            const testReq = await request('/api/dicteng/create',
                'POST',
                { arr })
        } catch (error) {

        }
    }

    // очистить окно
    const cancelHandler = () => {
        setDict([])
    }
    // кнопка прочитать файл excel
    const handleReadFile = (e) => {
        const file = e.target.files[0]
        console.log('12345')
        readExcel(file)
    }
    const btnOpenFile = {
        name: 'Открыть Excel',
        handlerReadFile: handleReadFile,
        disabled: false,
        icon: iOpen
    }
    const btnSave = {
        name: 'Сохранить в словарь',
        handler: CreateHandler,
        disabled: false,
        icon: iSave
    }
    const btnClose = {
        name: 'Закрыть excel',
        handler: cancelHandler,
        disabled: false,
        icon: iClose
    }
    const btnClear = {
        name: `Очистить (${countFiltered})`,
        handler: filterDictHandler,
        disabled: (dict && Object.values(dict).length > 1) ? false : true,
        icon: iClear
    }
    return (
        <>
            {/* {(dict && Object.values(dict).length > 1) && */}
            <div className={style.wrapper}>

                {/* <MySelect
                        selectVal={selectVal}
                        setSelectVal={setSelectVal}
                        defaultVal='Сортировка по'
                        options={[
                            { name: 'по Word', value: 'word' },
                            { name: 'по Translate', value: 'translate' }
                        ]}
                    /> */}


                <InputBtnImg obj={btnOpenFile} />

                <BtnIcon item={btnSave} />

                <BtnIcon item={btnClear} />
                <BtnIcon item={btnClose} />



                <SelectorV2
                    options={[
                        { name: 'По Word', value: 'word' },
                        { name: 'По Translate', value: 'translate' },
                        { name: 'Не выбрано', value: '' }
                    ]}
                    selectVal={selectVal}
                    setSelectVal={setSelectVal}
                />


                <button
                    disabled={(dict && Object.values(dict).length > 1) ? false : true}
                    name={'word'}
                    onClick={({ target }) => { getSortedWords(dict, target.name) }}
                >
                    Сорт. Word
                </button>

                <button
                    disabled={(dict && Object.values(dict).length > 1) ? false : true}
                    name={'translate'}
                    onClick={({ target }) => { getSortedWords(dict, target.name) }}
                >
                    Сорт. Translate
                </button>



            </div>
            {/* } */}
        </>
    )
}