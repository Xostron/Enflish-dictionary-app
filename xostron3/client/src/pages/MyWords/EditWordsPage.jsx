import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../../context/user.context'
import { useHttp } from '../../hooks/http.hook'
import { ItemFormWord } from '../../components/UI/Word/Edit/ItemFormWord'
import { MyModal } from '../../components/UI/Modal/MyModal'
import { MyRowIconBtn } from '../../components/UI/MyRowIconBtn/MyRowIconBtn'
import ModalCreateWords from '../../components/ModalCreateWords/ModalCreateWords'
import iTrend from '../../img/bx-line-chart.svg'
import iTrain from '../../img/bx-joystick.svg'
import iMain from '../../img/bx-heart.svg'
import iAdd from '../../img/bx-plus.svg'
import iDel from '../../img/bx-trash-alt.svg'
import iEdit from '../../img/bx-edit-alt.svg'
import iSave from '../../img/bxs-save.svg'
import iBack from '../../img/bx-undo.svg'


function EditWords() {

    const btnItems = [
        { name: 'Слова', to: `/editWords`, icon: iMain, type: 'link', disabled: 0 },
        { name: 'Тренировка', to: `/training`, icon: iTrain, type: 'link', disabled: 0 },
        { name: 'Статистика', to: `/admin`, icon: iTrend, type: 'link', disabled: 0 },
    ]

    // хук API запросов на backend
    const { loading, error, clearError, request } = useHttp()

    // глобальные данные из контекста
    const { updatePage, setUpdatePage, activeModal, setActiveModal } = useContext(userContext)

    // Массив слов
    let [dict, setDict] = useState([])

    // Сетевой запрос - чтение слов (выполняется после обновления DOM (рендеринг))
    useEffect(() => {
        ReadHandler()
    }, [updatePage])

    // ******************************HANDLERS*******************************************************
    //событие кнопки - "добавить слово"
    const addHandler = () => {
        const row = {
            id: null,
            word: '',
            transcription: '',
            translate: [''],
            example: '',
            img: '',
            visible: true
        }
        setDict(() => {
            let arr = Object.values(dict)
            arr.unshift(row)
            return (arr)
        })
    }

    // События для FormWordV0 - редактирование слова
    const editHandler = (id) => {
        // console.log(id)
        setDict(Object.values(dict).map((value) => value.id === id ? { ...value, visible: true } : value))
    }

    // События для FormWordV1 - отменить изменения (назад)
    const backHandler = (idList, idObj) => {
        /*
        idList - номер индекса массива
        idObj - id слова из БД
        */
        let arr = Object.values(dict)
        const deleteCount = 1
        // если слово добавлено, но еще не сохранено в БД, то при нажатии "назад" оно удаляется из списка
        if (idObj === null) {
            arr.splice(idList, deleteCount)
            setDict({ ...arr })
        }
        // иначе если слово в БД, то при нажатии назад, меняем "видимость формы редактора"
        else {
            setDict(Object.values(dict).map((value) => value.id === idObj ? { ...value, visible: false } : value))
            // setUpdatePage(!updatePage)
        }
    }

    // обработчик Input для word, transcription, example
    function changeHandler(e, idList) {
        setDict(Object.values(dict).map((word, idx) => idx === idList ? { ...word, [e.target.name]: e.target.value } : word))
    }

    // обработчик Input для translate с типом данных массив
    function changeHandlerTrl(e, idList, idTrl) {
        let trl = dict[idList].translate
        // console.log('trl = ', trl, typeof (trl))
        let trlChange = trl.map((val, idx) => idx === idTrl ? val = e.target.value : val)
        // console.log('trlChange = ', trlChange)
        setDict(Object.values(dict).map((word, idx) => idx === idList ? { ...word, [e.target.name]: trlChange } : word))
    }

    // добавить/удалить элемент массива translate
    function handlerAddDel(mode, name, idList, idTrl) {
        let translate = dict[idList].translate
        if (mode === 'add') {
            translate.push('')
        }
        // delete
        else {
            translate.splice(idTrl, 1)
        }
        setDict(Object.values(dict).map((word, idx) => idx === idList ? { ...word, [name]: translate } : word))
    }

    // *********************************API*********************************************************
    //чтение всех слов
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
    // сохранить слово
    const saveUpdateHandler = async (idList) => {
        let data = dict[idList]
        // console.log('test data = ', data)
        if (data.id === null) {
            // создать новое слово
            await saveOne(data)
        }
        else {
            // обновить существующее слово
            await updateOne(data)
        }
    }

    const saveOne = async (data) => {
        let postData = { ...data, user_id: 3 }
        try {
            const word = await request('/api/user_word/create',
                'POST',
                { postData }
            )
            setUpdatePage(!updatePage)
        } catch (error) { }
    }

    const updateOne = async (data) => {
        let putData = { ...data, user_id: 3 }
        try {
            const word = await request('/api/user_word/update',
                'PUT',
                { putData })
            setUpdatePage(!updatePage)
        } catch (error) { }
    }

    // События для FormWordV0 - удалить слово
    const deleteOneHandler = async (idList) => {
        let deleteData = { ...dict[idList], idList }
        try {
            const word = await request(
                `/api/user_word/delete`,
                'DELETE',
                { deleteData }
            )
            setUpdatePage(!updatePage)
        } catch (error) { }
    }
    // ****************************PROPS************************************************************
    // кнопки для компонента FormWordV0 - чтение
    const btnItemsV0 = (idList, idObj) => {
        return ([
            { name: ``, to: ``, icon: iEdit, type: 'button', disabled: 0, handler: () => { editHandler(idObj) } },
            { name: ``, to: ``, icon: iDel, type: 'button', disabled: 0, handler: () => { deleteOneHandler(idList) } },
        ])
    }
    // кнопки для компонента FormWordV1 - редактирование
    const btnItemsV1 = (idList, idObj) => {
        return ([
            { name: ``, to: ``, icon: iBack, type: 'button', disabled: 0, handler: () => { backHandler(idList, idObj) } },
            { name: ``, to: ``, icon: iSave, type: 'button', disabled: 0, handler: () => { saveUpdateHandler(idList) } },
        ])
    }
    const propsItemFormWord = (value, idx) => {
        return ({
            idx,
            value,
            icon: '',
            btnItemsV0,
            btnItemsV1,
            dict,
            setDict,
            v1: {
                changeHandler,
                changeHandlerTrl,
                handlerAddDel
            }
        })
    }
    // ****************************DEBUG***************************************
    // console.log('auth = ', user)
    const foo = () => { return (12) }
    const id = 5
    const obj1 = {
        id,
        val: 10,
        fuu: foo
    }
    // console.log('obj', obj1)
    return (
        <>
            {/* Кнопка "Добавить слово" */}
            <MyRowIconBtn
                icon={iAdd}
                onClick={addHandler}
            >
                Добавить слово
            </MyRowIconBtn>

            {/* Генерируемый список слов */}
            {dict && Object.values(dict).map((value, idx) => {
                return (
                    <ItemFormWord
                        key={idx}
                        ivalue={value}
                        item={propsItemFormWord(value, idx)}
                    />
                )
            })}

            {/* Модальное окно "Импорт слов из Excel" */}
            <MyModal visibleId={activeModal} setVisibleId={setActiveModal}>
                <ModalCreateWords setActiveModal={setActiveModal} />
            </MyModal>
        </>
    )
}

export default EditWords