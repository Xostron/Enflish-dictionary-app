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
import iBack from '../../img/svg/Vector-89.svg'
import iNo from '../../img/bx-x.svg'
import iYes from '../../img/bx-check.svg'
import Main from '../../pages/MainPage'
function EditWords() {

    const history = useNavigate()

    const btnItems = [
        { name: 'Слова', to: `/editWords`, icon: iMain, type: 'link', disabled: 0 },
        { name: 'Тренировка', to: `/training`, icon: iTrain, type: 'link', disabled: 0 },
        { name: 'Статистика', to: `/admin`, icon: iTrend, type: 'link', disabled: 0 },
    ]


    // console.log('paramsPage =  = ', idFromPage)
    // хук API запросов на backend
    const { loading, error, clearError, request } = useHttp()

    // глобальные данные об авторизованном пользователе
    const { updatePage, activeModal, setActiveModal } = useContext(userContext)

    // Массив слов
    let [dict, setDict] = useState([])

    // Активация модального окна
    // const [modal, setModal] = useState(false);
    // активация модального окна
    const modalHandler = () => {
        // console.log("Call modal")
        setActiveModal(!(activeModal))
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
    }, [updatePage])

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
            // console.log('DICT = ', arr)
            return (arr)
        })
    }

    // debug
    // console.log('auth = ', user)
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
                        idx={idx}
                        value={value}
                        icon={''}
                        dict={dict}
                        setDict={setDict}
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