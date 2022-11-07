import React, { useEffect, useState, useCallback, useContext, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { RowCard } from '../components/UI/Card/RowCard/RowCard'
import { userContext } from '../context/user.context'
import { useHttp } from '../hooks/http.hook'
import iAdd from '../img/bx-plus.svg'
import iBack from '../img/svg/Vector-89.svg'
import iDel from '../img/bx-trash-alt.svg'
import iPen from '../img/bx-edit-alt.svg'
import iShare from '../img/bx-share.svg'
import { Subtitle2 } from '../components/UI/Subtitle/Subtitle2';


export default function AllCards(params) {
    const history = useNavigate()

    const [card, setCard] = useState(
        [{
            id: null,
            user_id: null,
            name: '',
            img: '',
            arr_word_id: [],
            retweet: 0,

        }])
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
            name: 'PlayList311111111111111111111112222222222222222333333333333333334444444444444444444444444444444555555555555555555555555555555555566666666666666666666666666677777777777777777777777777777777788888888888888888888888888888889999999999999999999999999999999999999900000000000000000000000000000000000000000000000qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        },
        {
            id: 12,
            user_id: 1,
            name: 'PlayList41111sdfsd11111111111',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        },
        {
            id: 13,
            user_id: 1,
            name: 'PlayList4111111jkljkl111111111',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        },
        {
            id: 14,
            user_id: 1,
            name: 'PlayList411cvbcvbcvb1111111111111',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        },
        {
            id: 15,
            user_id: 1,
            name: 'PlayList411134534534535111111111111',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        },
        {
            id: 16,
            user_id: 1,
            name: 'PlayList41111qaaz[]l;/;L;/l11111111111',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        },
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
            name: 'PlayList311111111111111111111112222222222222222333333333333333334444444444444444444444444444444555555555555555555555555555555555566666666666666666666666666677777777777777777777777777777777788888888888888888888888888888889999999999999999999999999999999999999900000000000000000000000000000000000000000000000qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        },
        {
            id: 12,
            user_id: 1,
            name: 'PlayList41111sdfsd11111111111',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        },
        {
            id: 13,
            user_id: 1,
            name: 'PlayList4111111jkljkl111111111',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        },
        {
            id: 14,
            user_id: 1,
            name: 'PlayList411cvbcvbcvb1111111111111',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        },
        {
            id: 15,
            user_id: 1,
            name: 'PlayList411134534534535111111111111',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        },
        {
            id: 16,
            user_id: 1,
            name: 'PlayList41111qaaz[]l;/;L;/l11111111111',
            img: '',
            arr_word_id: [1, 3, 5],
            retweet: 12
        }
    ]
    //Обновление запроса при создании компонента
    useEffect(() => {
        setCard(testCard)//test debug
    }, [])

    const createHandler = () => {
        history('/createCard')
    }

    return (
        <div >
            <Subtitle2 icon1={iBack} icon2={iAdd}
                handler1={() => { history(-1) }}
                handler2={() => { history(`/card/none/edit`) }}
                title={'Все наборы'}
                text={Object.values(card).length}
            >

            </Subtitle2>
            {/* <hr /> */}

            {card && card.map((value, idx) => {
                return (
                    <RowCard
                        key={idx}
                        value={value}
                        icon={''}
                        handler1={() => { history(`/card/${value.id}/detail`) }}
                        selectOptions={[
                            { name: 'Удалить', handler: () => { console.log('test1') }, icon: iDel },
                            { name: 'Редактировать', handler: () => { console.log('test2') }, icon: iPen },
                            { name: 'Поделиться', handler: () => { console.log('test3') }, icon: iShare }
                        ]}
                    />
                )
            })}

        </div>
    )
}