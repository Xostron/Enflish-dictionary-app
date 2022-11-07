import * as XLSX from 'xlsx';
import React, { useEffect, useState, useCallback, useContext, useMemo } from 'react'
import { userContext } from '../../context/user.context'
import { useHttp } from '../../hooks/http.hook'
import { replaceInput, sortWords, readExcel, filterDict } from '../../utils/UserFunction'
import { ItemWordEditModal } from './ItemWordEditModal';
import { Subtitle3 } from '../UI/Subtitle/Subtitle3';
import { SetLinkOrBtn } from '../SetLinkOrBtn/SetLinkOrBtn';
import { InputFile } from '../UI/InputFile/InputFile';
import { PanelModal } from './PanelModal';
import style from './ModalCreateWords.module.css'
import iItem from '../../img/bx-heart-circle.svg'
import iOpen from '../../img/bx-folder-open.svg'
import iSave from '../../img/bxs-save.svg'
import iClear from '../../img/bx-eraser.svg'
import iClose from '../../img/bx-x.svg'
import iSortWord from '../../img/bx-sort.svg'
import iSortTrl from '../../img/bx-sort.svg'
import iSortDefault from '../../img/bx-sort.svg'


const fileName = ''

function ModalCreateWords({ setActiveModal }) {

    //Подключаем хук для API запросов на backend
    const { loading, error, clearError, request } = useHttp()
    //подключаем глобальные данные об авторизованном пользователе
    const user = useContext(userContext)
    //Сохраняем в dict импортированные слова с excel
    const [dict, setDict] = useState([])
    // прошлое состояние списка слов - для возврата к исходному 
    // (от фильтрованному) списку
    // const [already, setAlready] = useState(false)
    // const [currFlag, setCurrFlag] = useState('')
    // const [preDict, setPreDict] = useState(dict)

    // Подсчет дублирующих или пустых строк
    const [countFiltered, setCountFiltered] = useState(0)
    //  - selector

    useEffect(() => {
        const ori = Object.values(dict)
        const arr = Object.values(filterDict(dict))
        // console.log('ori =', ori.length)
        // console.log('arr =', arr.length)
        let n = ori.length - arr.length
        setCountFiltered(n)
    }, [dict])
    // ****************************************
    const dropOptions = [
        { name: 'Открыть Excel', handler: (e) => { handleReadFile(e) }, icon: iOpen, type: 'input-file' },
        { name: 'Закрыть Excel', handler: () => cancelHandler(), icon: iClose, type: 'button' },
        { name: `Очистить (${countFiltered})`, handler: () => filterDictHandler(), icon: iClear, type: 'button' },
        { type: 'hr' },
        // { name: 'Сортировать по-умолчанию', handler: () => { getSortedWordsBtn(dict, '') }, icon: iSortDefault, type: 'button' },
        { idName: 'word', name: 'Сортировать по Word', handler: () => { getSortedWordsBtn(dict, 'word') }, icon: iSortWord, type: 'button' },
        { idName: 'translate', name: 'Сортировать по Translate', handler: () => { getSortedWordsBtn(dict, 'translate') }, icon: iSortTrl, type: 'button' },
        { type: 'hr' },
        { name: 'Сохранить', handler: () => CreateHandler(), icon: iSave, type: 'button' },
    ]
    const fillSubtitle = {
        leftIcon: iClose,
        leftHandler: () => { setActiveModal(false) },
        // rightIcon: null,
        title: `Импорт Excel:`,
        auxTitle: `${Object.values(dict).length}`,
        dropOptions: dropOptions,
        orientation: 'in-modal'
    }

    // ****************************************
    function getSortedWordsBtn(dict, sort) {
        let arr = sortWords(dict, sort)
        setDict({ ...arr })
    }

    // function getSortedWordsBtn(dict, sort) {
    //     if (sort !== '' && currFlag === '') {
    //         setCurrFlag(sort)
    //         setAlready(true)
    //         setPreDict(dict)

    //         let arr = sortWords(dict, sort)
    //         setDict({ ...arr })
    //     }
    //     else if (sort !== '' && currFlag !== '') {
    //         setAlready(true)
    //         let arr = sortWords(dict, sort)
    //         setDict({ ...arr })
    //     }
    //     else if (sort === '') {
    //         setCurrFlag(sort)
    //         setAlready(false)
    //         setDict(preDict)
    //     }
    // }



    // ********************************************
    // кнопка прочитать файл excel
    const handleReadFile = (e) => {
        const file = e.target.files[0]
        readExcel(file, setDict)
    }
    // Закрыть Excel
    const cancelHandler = () => {
        setDict([])
        document.getElementById('inputFile').value = null
    }

    //Отфильтровать список слов по кнопке 
    // (удалить схожие слова по полю word, и пустые строчки)
    const filterDictHandler = () => {
        const arr = filterDict(dict)
        setDict({ ...arr })
    }

    //API: Сохранение слов в БД
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

    // *****Кнопки в Заголовке**********************************
    const btnItems = [
        { name: 'Открыть Excel', handler: (e) => handleReadFile(e), icon: iOpen, type: 'input-file', disabled: false },
        { name: `Очистить (${countFiltered})`, handler: filterDictHandler, icon: iClear, type: 'button', disabled: false },
        { name: 'Сохранить в словарь', handler: CreateHandler, icon: iSave, type: 'button', disabled: false },
        { name: `Закрыть Excel`, handler: cancelHandler, icon: iClose, type: 'button', disabled: false },
    ]
    // ********************DEBUG********************
    console.log('@@@ PARENT Modal')
    // console.log('@@@@@@@@@@@@@@@@@@@', preDict)
    // ***************debug**************************
    return (
        <div className={style.wrapper}>
            <div className={style.title}>
                <Subtitle3
                    content={fillSubtitle}
                >
                    <SetLinkOrBtn items={btnItems} />
                </Subtitle3>
            </div>
            {/* 2.2 - words */}
            <table className={style.myTable}>
                <tbody >
                    {dict && Object.values(dict).map((value, idx) => {
                        return (
                            <tr className={style.row} key={idx}>
                                <ItemWordEditModal
                                    key={idx}
                                    value={value}
                                    icon={null}
                                    dict={dict}
                                    idx={idx}
                                    setDict={setDict}
                                    idxStyle={idx + 'modal'}
                                />
                            </tr>
                        )
                    })}

                </tbody>
            </table>


        </div>
    )
}

export default ModalCreateWords