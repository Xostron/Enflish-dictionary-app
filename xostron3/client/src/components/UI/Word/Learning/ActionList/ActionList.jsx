import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import style from './ActionList.module.scss'
import { ActionRow } from "./ActionRow";

export const ActionList = ({ y, words, setWords, commandKB, setCommandKB }) => {

    // id номер строки
    const [number, setNumber] = useState(0)

    const [command, setCommand] = useState('')

    // Добавление событий обработки клавиатуры
    useEffect(() => {
        // обработчик клавиш
        const onKeypress = (e) => {
            const { key } = e

            if (key === 'w' || key === 'ц') {
                setCommand('up')
            }
            else if (key === 's' || key === 'ы') {
                setCommand('down')
            }
            if (key === 'a' || key === 'ф') {
                setCommand('left')
            }
            else if (key === 'd' || key === 'в') {
                setCommand('right')
            }
        }

        // монтирование
        document.addEventListener('keydown', onKeypress);

        // размонтирование
        return () => { document.removeEventListener('keydown', onKeypress) }
    }, [])

    // выделение строки нажатием мыши
    const handlerSelect = (idx) => {
        let arr = Object.values(words)
        let find = arr.findIndex((val) => val.visible === true)
        arr[find].visible = false
        arr[idx].visible = true
        setWords(arr)
        setNumber(idx)
    }

    // Слежение за скроллом
    useEffect(() => {
        let elem = document.getElementById(number);
        let currCoo = elem.getBoundingClientRect()
        console.log('ACTIONLIST =', y, currCoo)
        if (currCoo.bottom > y && y > 0) {
            let delta = currCoo.bottom - y + 8
            document.body.scrollBy({
                top: delta,
                left: 0,
                behavior: 'smooth'
            })
        }
        else if (currCoo.top < 55) {
            let delta = 100 - currCoo.top
            document.body.scrollBy({
                top: -delta,
                left: 0,
                behavior: 'smooth'
            })
        }
    }, [y, number])

    useEffect(() => {
        // console.log('ActionList words =', words)
        let arr = Object.values(words)
        // console.log('ActionList arr = ', arr)
        let find = arr.findIndex((val) => val.visible === true)
        // console.log('ActionList find = ', find)

        if (command === 'up' || commandKB === 'up') {
            if (find <= 0) {
                arr[0].visible = true
                setNumber(0)
            }
            else if (find > 0) {
                arr[find].visible = false
                arr[find - 1].visible = true
                setNumber(find - 1)
            }
            setWords(arr)
        }
        else if (command === 'down' || commandKB === 'down') {
            if (find < 0) {
                arr[0].visible = true
                setNumber(0)
            }
            else if (find < words.length - 1) {
                arr[find].visible = false
                arr[find + 1].visible = true
                setNumber(find + 1)
            }
            setWords(arr)
        }
        if (command === 'left' || commandKB === 'left') {
            if (find >= 0 && find <= words.length - 1) {
                if (arr[find].check !== 'no') {
                    arr[find].check = 'no'
                }
                else {
                    arr[find].check = ''
                }
                setWords(arr)
            }
        }
        else if (command === 'right' || commandKB === 'right') {
            if (find >= 0 && find <= words.length - 1) {
                if (arr[find].check !== 'yes') {
                    arr[find].check = 'yes'
                }
                else {
                    arr[find].check = ''
                }
                setWords(arr)
            }
        }
        setCommand('')
        setCommandKB('')
    }, [command, commandKB])


    return (

        <div className={style.container}>
            {Object.values(words).map((i, idx) => {
                return (
                    <div key={idx} id={idx}>
                        <ActionRow item={i} handler={() => { handlerSelect(idx) }} />
                    </div>
                )
            })}
        </div>

    )
}



// const onKeypress = (e) => {
//     const { key } = e
//     console.log('ActionList words =', words)
//     let arr = Object.values(words)
//     console.log('ActionList arr = ', arr)
//     let find = arr.findIndex((val) => val.visible === true)
//     console.log('ActionList find = ', find)
//     if (key === 'w' || key === 'ц') {
//         if (find <= 0) {
//             arr[0].visible = true
//             setNumber(0)
//         }
//         else if (find > 0) {
//             arr[find].visible = false
//             arr[find - 1].visible = true
//             setNumber(find - 1)
//         }
//         setWords(arr)
//     }
//     else if (key === 's' || key === 'ы') {
//         if (find < 0) {
//             arr[0].visible = true
//             setNumber(0)
//         }
//         else if (find < words.length - 1) {
//             arr[find].visible = false
//             arr[find + 1].visible = true
//             setNumber(find + 1)
//         }
//         setWords(arr)
//     }
//     if (key === 'a' || key === 'ф') {
//         if (find >= 0 && find <= words.length - 1) {
//             if (arr[find].check !== 'no') {
//                 arr[find].check = 'no'
//             }
//             else {
//                 arr[find].check = ''
//             }
//             setWords(arr)
//         }
//     }
//     else if (key === 'd' || key === 'в') {
//         if (find >= 0 && find <= words.length - 1) {
//             if (arr[find].check !== 'yes') {
//                 arr[find].check = 'yes'
//             }
//             else {
//                 arr[find].check = ''
//             }
//             setWords(arr)
//         }
//     }
// }