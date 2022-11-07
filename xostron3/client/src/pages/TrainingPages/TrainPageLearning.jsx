import React, { useState, useEffect, useRef, useContext } from "react";
import { useHttp } from '../../hooks/http.hook'
import { useNavigate } from "react-router-dom";
import { WordCard } from "../../components/UI/Word/Learning/WordCard";
import { ActionList } from "../../components/UI/Word/Learning/ActionList/ActionList";
import { KeyNavigation } from '../../components/UI/Word/Learning/ActionList/KeyNavigation';
import { userContext } from "../../context/user.context";
import style from './TrainPageLearning.module.scss'
import iAdd from '../../img/bx-plus.svg'
import iBack from '../../img/svg/Vector-89.svg'

export default function TrainPageLearning() {
    const { loading, error, clearError, request } = useHttp()
    const { viewTrainLearning, setViewTL } = useContext(userContext)
    const [coor, setCoor] = useState(0)
    const refFooter = useRef()
    const [dict, setDict] = useState(
        [{
            word: '',
            transcription: '',
            translate: [],
            example: '',
            img: '',
            visible: '',
            check: ''
        }])
    const [commandKB, setcommandKB] = useState('')
    // Получить координату Y футера 
    const getCoordinateFooter = () => {
        if (viewTrainLearning) {
            const coordinate = refFooter.current.getBoundingClientRect();
            setCoor(coordinate.y)
        }
    }

    //Запрос слов из БД
    const ReadHandler = async () => {
        try {
            const words = await request(
                '/api/dicteng/read',
                'GET', null
            )
            let arr = []
            words.message.forEach(val => {
                arr.push({
                    id: val.id,
                    word: val.word || '',
                    transcription: val.transcription || '',
                    translate: val.translate || [],
                    example: val.example || '',
                    img: val.img || '',
                    visible: false,
                    check: ''
                })
            });
            arr[0].visible = true
            setDict(arr)
        } catch (error) { }
    }

    //Обновление запроса при создании компонента
    useEffect(() => {
        getCoordinateFooter()
        ReadHandler()

    }, [])





    return (
        <div>

            {viewTrainLearning ?
                // Вид таблицы
                <div>
                    <ActionList
                        y={coor}
                        words={dict}
                        setWords={setDict}
                        commandKB={commandKB}
                        setCommandKB={setcommandKB}
                    />
                    <div ref={refFooter} className={style.myFooter} >
                        <div className={style.wrapperFooter}>
                            <KeyNavigation
                                width={40}
                                height={40}
                                setCommand={setcommandKB}
                            />
                        </div>
                    </div>
                </div>
                :
                // Вид плитка
                <div className={style.container}>
                    <div className={style.cards}>
                        {
                            dict.map((item) => {
                                return (
                                    <WordCard key={item.word} item={item} />
                                )
                            })
                        }
                    </div>
                </div>
            }

        </div>
    )
}
