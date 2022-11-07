import React, { useEffect, useState, useCallback, useContext, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { CardInfo } from '../../components/UI/Card/CardInfo/CardInfo'
import { FormWordV0 } from '../../components/UI/Word/FormWord/FormWordV0';

import { useHttp } from '../../hooks/http.hook'

import iAdd from '../../img/bx-plus.svg'
import iBack from '../../img/svg/Vector-89.svg'
import iTrend from '../../img/bx-line-chart.svg'
import iTrain from '../../img/bx-joystick.svg'
import iShare from '../../img/bx-share.svg'
import iMain from '../../img/bx-heart.svg'
import iLogo from '../../components/UI/Card/discord128x128.png'
import iEdit from '../../img/bx-edit-alt.svg'
import { SetLinkOrBtn } from '../../components/SetLinkOrBtn/SetLinkOrBtn';

export default function OneCardDetailPage() {
    const cardId = useParams().id

    const history = useNavigate()
    const [dict, setDict] = useState(
        [{
            word: 'QWERTY',
            transcription: 'qwerty',
            translate: ['QWERTY'],
            example: 'asd',
            img: '',
            visible: ''
        }])
    const [card, setCard] = useState(
        [{
            id: 42,
            user_id: null,
            name: 'Playlist IT',
            img: '',
            arr_word_id: [],
            retweet: 0,

        }])
    const [aboutCard, setAboutCard] = useState({
        name: 'God of War: Ragnarok \n vol1 ppppppppppppppppppppppppppppppppppppp',
        lastUpdate: 'Обновлено 25.10.2022',
        description: `Слова из игры \n,                
        #ragnarok, 
        \n#godofwar, 
        \n#games2022, 
        aaaaaaaaaaaaaaaaaaaa, AaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaX, bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        XaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaVssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1`,
        icon: iLogo
    })
    // const btnItemsV0 = (idx) => {
    //     return ([
    //         { name: ``, to: ``, icon: iEdit, type: 'button', disabled: 0, handler: () => { editHandler(idx) } },
    //         { name: ``, to: ``, icon: iDel, type: 'button', disabled: 0, handler: () => { deleteOneHandler(idx) } },
    //     ])
    // }
    return (
        <>
            <CardInfo value={aboutCard} />

            <hr />



            {dict && dict.map((value, idx) => {
                return (
                    <FormWordV0
                        key={idx}
                        icon={''}
                        word={value}
                    >
                        {/* <SetLinkOrBtn items={btnItemsV0(idx)} /> */}
                    </FormWordV0>
                )
            })}

        </>
    )
}
