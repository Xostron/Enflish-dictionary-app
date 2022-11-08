import React, { useEffect, useState, useCallback, useContext, useMemo, useRef } from 'react'
import { userContext } from '../context/user.context'
import { NavLink } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { Card } from '../components/UI/Card/Card';
import { Loader } from '../components/UI/Loader/Loader'
import { FormWordV0 } from '../components/UI/Word/FormWord/FormWordV0';
import { Subtitle } from '../components/UI/Subtitle/Subtitle';
import { SetLinkOrBtn } from '../components/SetLinkOrBtn/SetLinkOrBtn';
import styleCard from '../components/UI/Card/Card.module.css'
import iShow from '../img/svg/Vector-79.svg'
import iBtnWord from '../img/bx-dots-vertical-rounded.svg'
import '../App.css'


export default function Main() {

    //Подключаем хук для API запросов на backend
    const { loading, error, clearError, request } = useHttp()
    //Слова для отображения
    const [dict, setDict] = useState(
        [{
            word: '',
            transcription: '',
            translate: [],
            example: '',
            img: '',
            visible: '',
            ratio: ''
        }])
    const [card, setCard] = useState(
        [{
            id: null,
            user_id: null,
            name: '',
            img: '',
            arr_word_id: [],
            retweet: 0
        }]
    )
    const testCard = [
        {
            id: 1,
            user_id: 1,
            name: 'PlayList1',
            img: '',
            arr_word_id: [1, 2, 3],
            retweet: 10
        },
        {
            id: 2,
            user_id: 1,
            name: 'PlayList2',
            img: '',
            arr_word_id: [3, 4, 5],
            retweet: 11
        },
        {
            id: 3,
            user_id: 1,
            name: 'PlayList3',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        },
        {
            id: 12,
            user_id: 1,
            name: 'PlayList4loremipsumloremloremipsumloremipsum',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        },
        {
            id: 12,
            user_id: 1,
            name: 'PlayList4loremipsumloremloremipsumloremipsum',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        },
        {
            id: 12,
            user_id: 1,
            name: 'PlayList4loremipsumloremloremipsumloremipsum',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        },
        {
            id: 12,
            user_id: 1,
            name: 'PlayList4loremipsumloremloremipsumloremipsum',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        },
        {
            id: 12,
            user_id: 1,
            name: 'PlayList4loremipsumloremloremipsumloremipsum',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        }
    ]

    const btnItems = (ratio, idx) => {
        return ([
            { name: `${ratio}`, to: ``, icon: null, type: '', disabled: 0 },
            { name: ``, to: ``, icon: iBtnWord, type: 'button', disabled: 0, handler: () => { console.log(`@@@btn items test ${idx}`) } },
        ])
    }

    //Запрос слов из БД
    const ReadHandler = async () => {
        try {
            const words = await request(
                '/api/dicteng/read',
                'GET', null
            )
            console.log(words.message)
            setDict(words.message)
        } catch (error) { }
    }
    //Обновление запроса при создании компонента
    useEffect(() => {
        ReadHandler()
        setCard(testCard)//test debug
    }, [])

    // ****************
    // const enter = '1\n2'
    // let arrEnter = enter.split('\n').map((val) => Number(val))
    // let res = arrEnter.reduce((summ, curr) => summ + curr, 0)
    // console.log(arrEnter, res)
    // ****************

    return (
        <>
            {/* НАБОРЫ */}
            <Subtitle
                val={card.length}
                iconBtn={iShow}
                path='/card/all'
                name='Мои наборы'
            />

            <div className={styleCard.scroll}>
                {card && card.map((value, idx) => {
                    return (
                        <Card
                            key={idx}
                            value={value}
                            icon={value.icon}
                        />
                    )
                })}
            </div>

            <hr />

            {/* МОИ СЛОВА */}
            <Subtitle
                val={dict.length}
                iconBtn={iShow}
                path='words/edit'
                name='Мои слова'
            />

            {dict && dict.map((value, idx) => {
                return (
                    <FormWordV0
                        key={idx}
                        icon={''}
                        word={value}
                    >
                        <SetLinkOrBtn items={btnItems('12%', idx)} />
                    </FormWordV0>
                )
            })}

            {/* <Loader></Loader> */}

        </>
    )
}