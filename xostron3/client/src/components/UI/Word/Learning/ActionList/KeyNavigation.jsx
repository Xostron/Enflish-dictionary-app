import React, { useEffect, useState } from "react";
import { getIsMobile } from "../../../../../utils/UserFunction";
import style from './KeyNavigation.module.scss'
import iUp from '../../../../../img/svg/Vector-86.svg'
import iLeft from '../../../../../img/svg/Vector-91.svg'
import iDown from '../../../../../img/svg/Vector-96.svg'
import iRight from '../../../../../img/svg/Vector-81.svg'
import { HandySvg } from "handy-svg";

export const KeyNavigation = ({ width = '64', height = '64', setCommand }) => {
    let isMobile = getIsMobile()
    let KEY = isMobile ? [iUp, iLeft, iDown, iRight] : ['W', 'A', 'S', 'D']

    const styleWrapper = [style.wrapper]
    const styleRow = [style.row]

    if (isMobile) {
        styleWrapper.push(style.mobile)
        styleRow.push(style.mobile)
    }

    const [key, setKey] = useState('')

    const onCommand = (key) => {
        setKey(key) //включение подсветки
        setTimeout(TimerOffStyle, 300) //таймер на отключение подсветки, ms
    }

    // Добавление событий обработки клавиатуры
    useEffect(() => {

        const onKeydown = (e) => {
            const { key } = e
            setKey(key) //включение подсветки
            setTimeout(TimerOffStyle, 300) //таймер на отключение подсветки, ms
        }

        // монтирование
        document.addEventListener('keydown', onKeydown);

        return () => {
            // размонтирование
            document.removeEventListener('keydown', onKeydown);
        }
    }, [])
    const TimerOffStyle = () => {
        setKey('+')
    }

    const styleW = key === 'w' ? style.key + ' ' + style.active_WS : style.key
    const styleS = key === 's' ? style.key + ' ' + style.active_WS : style.key
    const styleA = key === 'a' ? style.key + ' ' + style.active_A : style.key
    const styleD = key === 'd' ? style.key + ' ' + style.active_D : style.key

    return (
        <div className={styleWrapper.join(' ')} >

            <div className={styleRow.join(' ')}>
                <div
                    className={styleW}
                    style={{ width: `${width}px`, height: `${height}px`, }}
                    onClick={(e) => {
                        setCommand('up')
                        onCommand('w')
                    }}
                >
                    {!isMobile ? KEY[0] :
                        <>
                            <HandySvg
                                src={KEY[0]}
                                className={style.img}
                            />
                        </>
                    }

                </div>
            </div>
            <div className={styleRow.join(' ')}>
                <div
                    className={styleA}
                    style={{ width: `${width}px`, height: `${height}px` }}
                    onClick={() => {
                        setCommand('left')
                        onCommand('a')
                    }}
                >
                    {!isMobile ? KEY[1] :
                        <>
                            <HandySvg
                                src={KEY[1]}
                                className={style.img}
                            />
                        </>
                    }
                </div>
                <div
                    className={styleS}
                    style={{ width: `${width}px`, height: `${height}px` }}
                    onClick={() => {
                        setCommand('down')
                        onCommand('s')
                    }}
                >
                    {!isMobile ? KEY[2] :
                        <>
                            <HandySvg
                                src={KEY[2]}
                                className={style.img}
                            />
                        </>
                    }
                </div>
                <div
                    className={styleD}
                    style={{ width: `${width}px`, height: `${height}px` }}
                    onClick={() => {
                        setCommand('right')
                        onCommand('d')
                    }}
                >
                    {!isMobile ? KEY[3] :
                        <>
                            <HandySvg
                                src={KEY[3]}
                                className={style.img}
                            />
                        </>
                    }
                </div>
            </div>

        </div>
    )
}