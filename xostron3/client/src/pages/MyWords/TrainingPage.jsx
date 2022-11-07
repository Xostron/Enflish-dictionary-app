import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../context/user.context'
import { useHttp } from '../../hooks/http.hook'
import { BtnCard } from '../../components/UI/Button/btn-card/BtnCard'
import style from './TrainingPage.module.scss'
import iLogo from '../../img/bx-joystick-alt.svg'
function TrainingPage() {
    const history = useNavigate()
    //подключаем глобальные данные об авторизованном пользователе
    const user = useContext(userContext)
    //State на вводимые данные для словаря
    const [word, setWord] = useState({
        word: '',
        transcription: '',
        translate: [],
        comment: ''
    })
    //хук для выполнения запросов
    const { loading, error, clearError, request } = useHttp()

    //поле translate на форме 
    const [trl, setTrl] = useState([''])

    //запись в форму словаря по изменению useState trl
    useEffect(() => {
        setWord({ ...word, translate: [...trl] })
    }, [trl])

    //сохранить слово в БД
    const saveHandler = async () => {
        console.log('save', word, 'from', user)
        const link = {
            create_date: new Date(),
            last_repeat_date: null,
            repeat_count: 0,
            correct_count: 0,
            ratio: 0,
            login_id: user.userState.id,
            login_code_access: user.userState.code_access
        }
        try {
            const engWord = await request('/api/engdict/eng_word', 'POST', { ...word, ...link })
        } catch (error) { }
    }
    const TrainCard = [
        { name: 'Учить слова', icon: iLogo, count: '5', handler: () => history('/words/train_learning'), color: 'white' },
        { name: 'Спринт', icon: iLogo, count: '12', handler: () => history('/words/train_sprint'), color: 'white' },
        { name: 'Слово - Перевод', icon: iLogo, count: '13', handler: () => history('/words/train_write/trl'), color: 'white' },
        { name: 'Перевод - Слово', icon: iLogo, count: '15', handler: () => history('/words/train_write/word'), color: 'white' }
    ]
    return (
        <>
            <div className={style.container}>

                <div className={style.cards}>
                    {TrainCard.map((elem, idx) => {

                        return (<BtnCard key={elem.name} card={elem} />)

                    })}
                </div>

            </div>
        </>
    )
}

export default TrainingPage