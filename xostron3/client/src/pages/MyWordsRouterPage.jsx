import React, { Suspense, useState, useContext } from 'react'
import { Route, Routes, useParams, useNavigate, useMatch } from 'react-router-dom'
import { SetLinkOrBtn } from '../components/SetLinkOrBtn/SetLinkOrBtn'
import { Subtitle3 } from '../components/UI/Subtitle/Subtitle3'
import { MyWordsPages } from '../routes/Routes'
import { userContext } from '../context/user.context'
import style from './MyWordsRouterPage.module.scss'
import iTrend from '../img/bx-line-chart.svg'
import iTrain from '../img/bx-joystick.svg'
import iMain from '../img/bx-heart.svg'

import iBack from '../img/svg/Vector-89.svg'
import iNo from '../img/bx-x.svg'
import iYes from '../img/bx-check.svg'
import iShare from '../img/bx-share.svg'
import iNew from '../img/svg/Vector-15.svg'
import iDel from '../img/bx-trash-alt.svg'
import iTable from '../img/bx-menu.svg'
import iTile from '../img/bx-category.svg'
import iAdd from '../img/svg/Vector-24.svg'
import iKit from '../img/bx-library.svg'
import iKitCreate from '../img/bx-add-to-queue.svg'
import iImport from '../img/svg/Vector-68.svg'
import iExport from '../img/svg/Vector-76.svg'
import iExit from '../img/bx-undo.svg'

const currentPage = (obj) => {
    let result = ''
    for (let item in obj) {
        // console.log('iteration', item)
        if (obj[item] != null) {
            result = item
            return result
        }
    }
}

export default function MyWordsRouterPage() {
    const history = useNavigate()
    const { viewTrainLearning, setViewTL, activeModal, setActiveModal } = useContext(userContext)
    const modalHandler = () => {
        // console.log("Call modal")
        setActiveModal(!(activeModal))
    }
    const pages = {
        edit: useMatch('words/edit'),
        train: useMatch('words/train'),
        stc: useMatch('words/stc'),
        trainLearning: useMatch('words/train_learning'),
        trainWriteWord: useMatch('words/train_write/word'),
        trainWriteTrl: useMatch('words/train_write/trl'),
        trainSprint: useMatch('words/train_sprint')
    }

    const btnItems = [
        { name: 'Слова', to: `edit`, icon: iMain, type: 'link', disabled: 0 },
        { name: 'Тренировка', to: `train`, icon: iTrain, type: 'link', disabled: 0 },
        { name: 'Достижения', to: `stc`, icon: iTrend, type: 'link', disabled: 0 },
    ]

    const dropOptions = {
        edit: [
            // { name: 'Слова', handler: () => { history(`/words/edit`) }, icon: iMain, },
            { name: 'Тренировка', handler: () => { history(`/words/train`) }, icon: iTrain, type: 'button' },
            { name: 'Достижения', handler: () => { history(`/words/stc`) }, icon: iTrend, type: 'button' },
            { name: 'Мои наборы', handler: () => { history(`/card/all`) }, icon: iKit, type: 'button' },
            { type: 'hr' },
            { name: 'Создать набор', handler: () => { history(`/card/none/edit`) }, icon: iKitCreate, type: 'button' },
            { type: 'hr' },
            { name: 'Импорт из excel', handler: () => { modalHandler() }, icon: iImport, type: 'button' },
            { name: 'Экспорт в excel', handler: () => { console.log('test delete') }, icon: iExport, type: 'button' },
            { name: 'Добавить слово', handler: () => { console.log('test share') }, icon: iAdd, type: 'button' },
        ],
        train: [
            { name: 'Слова', handler: () => { history(`/words/edit`) }, icon: iMain, type: 'button' },
            // { name: 'Тренировка', handler: () => { history(`/words/train`) }, icon: iTrain },
            { name: 'Достижения', handler: () => { history(`/words/stc`) }, icon: iTrend, type: 'button' },
            { name: 'Мои наборы', handler: () => { history(`/card/all`) }, icon: iKit, type: 'button' },
            { type: 'hr' },
            { name: 'Создать набор', handler: () => { history(`/card/none/edit`) }, icon: iKitCreate, type: 'button' },
            // { name: ' ' },
            // { name: 'Импорт из excel', handler: () => { console.log('test create new') }, icon: iImport },
            // { name: 'Экспорт в excel', handler: () => { console.log('test delete') }, icon: iExport },
            // { name: 'Добавить слово', handler: () => { console.log('test share') }, icon: iAdd },
        ],
        stc: [
            { name: 'Слова', handler: () => { history(`/words/edit`) }, icon: iMain, type: 'button' },
            { name: 'Тренировка', handler: () => { history(`/words/train`) }, icon: iTrain, type: 'button' },
            // { name: 'Достижения', handler: () => { history(`/words/stc`) }, icon: iTrend },
            { name: 'Мои наборы', handler: () => { history(`/card/all`) }, icon: iKit, type: 'button' },
            { type: 'hr' },
            { name: 'Создать набор', handler: () => { history(`/card/none/edit`) }, icon: iKitCreate, type: 'button' },
            // { name: ' ' },
            // { name: 'Импорт из excel', handler: () => { console.log('test create new') }, icon: iImport },
            // { name: 'Экспорт в excel', handler: () => { console.log('test delete') }, icon: iExport },
            // { name: 'Добавить слово', handler: () => { console.log('test share') }, icon: iAdd },
        ],
        trainLearning: [
            { name: 'Слова', handler: () => { history(`/words/edit`) }, icon: iMain, type: 'button' },
            { name: 'Тренировка', handler: () => { history(`/words/train`) }, icon: iTrain, type: 'button' },
            { name: 'Достижения', handler: () => { history(`/words/stc`) }, icon: iTrend, type: 'button' },
            { name: 'Мои наборы', handler: () => { history(`/card/all`) }, icon: iKit, type: 'button' },
            { type: 'hr' },
            { name: 'Создать набор', handler: () => { history(`/card/none/edit`) }, icon: iKitCreate, type: 'button' },
            { type: 'hr' },
            {
                name: viewTrainLearning ? 'Сменить вид: плитка' : 'Сменить вид: таблица',
                handler: () => { setViewTL(!viewTrainLearning) },
                icon: viewTrainLearning ? iTile : iTable, type: 'button'
            },
            { type: 'hr' },
            { name: 'Закончить изучение', handler: () => { history(`/words/train`) }, icon: iExit, type: 'button' },
            // { name: 'Close', handler: () => { setViewTL(false) }, icon: iExport },
            // { name: 'Добавить слово', handler: () => { console.log('test share') }, icon: iAdd },
        ],
        trainWriteWord: [
            { name: 'Слова', handler: () => { history(`/words/edit`) }, icon: iMain, type: 'button' },
            { name: 'Тренировка', handler: () => { history(`/words/train`) }, icon: iTrain, type: 'button' },
            { name: 'Достижения', handler: () => { history(`/words/stc`) }, icon: iTrend, type: 'button' },
            { name: 'Мои наборы', handler: () => { history(`/card/all`) }, icon: iKit, type: 'button' },
            { name: 'Создать набор', handler: () => { history(`/card/none/edit`) }, icon: iKitCreate, type: 'button' },
            { type: 'hr' },
            {
                name: viewTrainLearning ? 'Сменить вид: плитка' : 'Сменить вид: таблица',
                handler: () => { setViewTL(!viewTrainLearning) },
                icon: viewTrainLearning ? iTile : iTable, type: 'button'
            },
            { name: 'Закончить изучение', handler: () => { history(`/words/train`) }, icon: iExit, type: 'button' },
            // { name: 'Экспорт в excel', handler: () => { console.log('test delete') }, icon: iExport },
            // { name: 'Добавить слово', handler: () => { console.log('test share') }, icon: iAdd },
        ],
        trainWriteTrl: [
            { name: 'Слова', handler: () => { history(`/words/edit`) }, icon: iMain, type: 'button' },
            { name: 'Тренировка', handler: () => { history(`/words/train`) }, icon: iTrain, type: 'button' },
            { name: 'Достижения', handler: () => { history(`/words/stc`) }, icon: iTrend, type: 'button' },
            { name: 'Мои наборы', handler: () => { history(`/card/all`) }, icon: iKit, type: 'button' },
            { type: 'hr' },
            { name: 'Создать набор', handler: () => { history(`/card/none/edit`) }, icon: iKitCreate, type: 'button' },
            { type: 'hr' },
            {
                name: viewTrainLearning ? 'Сменить вид: плитка' : 'Сменить вид: таблица',
                handler: () => { setViewTL(!viewTrainLearning) },
                icon: viewTrainLearning ? iTile : iTable, type: 'button'
            },
            { type: 'hr' },
            { name: 'Закончить изучение', handler: () => { history(`/words/train`) }, icon: iExit, type: 'button' },
            // { name: 'Экспорт в excel', handler: () => { console.log('test delete') }, icon: iExport },
            // { name: 'Добавить слово', handler: () => { console.log('test share') }, icon: iAdd },
        ],
        trainSprint: [
            { name: 'Слова', handler: () => { history(`/words/edit`) }, icon: iMain, type: 'button' },
            { name: 'Тренировка', handler: () => { history(`/words/train`) }, icon: iTrain, type: 'button' },
            { name: 'Достижения', handler: () => { history(`/words/stc`) }, icon: iTrend, type: 'button' },
            { name: 'Мои наборы', handler: () => { history(`/card/all`) }, icon: iKit, type: 'button' },
            { type: 'hr' },
            { name: 'Создать набор', handler: () => { history(`/card/none/edit`) }, icon: iKitCreate, type: 'button' },
            { type: 'hr' },
            {
                name: viewTrainLearning ? 'Сменить вид: плитка' : 'Сменить вид: таблица',
                handler: () => { setViewTL(!viewTrainLearning) },
                icon: viewTrainLearning ? iTile : iTable, type: 'button'
            },
            { type: 'hr' },
            { name: 'Закончить изучение', handler: () => { history(`/words/train`) }, icon: iExit, type: 'button' },
            // { name: 'Экспорт в excel', handler: () => { console.log('test delete') }, icon: iExport },
            // { name: 'Добавить слово', handler: () => { console.log('test share') }, icon: iAdd },
        ],


        // { name: ' ' },

    }

    const fillSubtitles =
    {
        edit: {
            leftIcon: iBack,
            leftHandler: () => { history(-1) },
            // rightIcon: null,
            title: `Мои слова`,
            auxTitle: ``,
            dropOptions: dropOptions[currentPage(pages)],
            orientation: 'top-left'
        },
        stc: {
            leftIcon: iNo,
            leftHandler: () => { history(`/words/edit`) },
            // rightIcon: iAdd,
            title: `Мои слова:`,
            auxTitle: `Достижения`,
            dropOptions: dropOptions[currentPage(pages)],
            orientation: 'top-left'
        },
        train: {
            leftIcon: iNo,
            leftHandler: () => { history(`/words/edit`) },
            // rightIcon: iAdd,
            title: `Мои слова:`,
            auxTitle: `Тренировка`,
            dropOptions: dropOptions[currentPage(pages)],
            orientation: 'top-left'
        },
        trainLearning: {
            leftIcon: iNo,
            leftHandler: () => { history(`/words/edit`) },
            // rightIcon: iAdd,
            title: `Мои слова:`,
            auxTitle: `Изучение`,
            dropOptions: dropOptions[currentPage(pages)],
            orientation: 'top-left'
        },
        trainWriteWord: {
            leftIcon: iNo,
            leftHandler: () => { history(`/words/edit`) },
            // rightIcon: iAdd,
            title: `Мои слова:`,
            auxTitle: `Напиши слово`,
            dropOptions: dropOptions[currentPage(pages)],
            orientation: 'top-left'
        },
        trainWriteTrl: {
            leftIcon: iNo,
            leftHandler: () => { history(`/words/edit`) },
            // rightIcon: iAdd,
            title: `Мои слова:`,
            auxTitle: `Напиши перевод`,
            dropOptions: dropOptions[currentPage(pages)],
            orientation: 'top-left'
        },
        trainSprint: {
            leftIcon: iNo,
            leftHandler: () => { history(`/words/edit`) },
            // rightIcon: iAdd,
            title: `Мои слова:`,
            auxTitle: `Спринт`,
            dropOptions: dropOptions[currentPage(pages)],
            orientation: 'top-left'
        },
    }

    return (
        <>
            <div className={style.header} >
                {/* Главный Заголовок */}
                <Subtitle3
                    content={fillSubtitles[currentPage(pages)]}
                >
                    <SetLinkOrBtn items={btnItems} />
                </Subtitle3>

                {/* Разделитель <hr/> */}
                {/* <div className='horizLine'></div> */}
                <hr />
            </div>

            {/* Основной контент страницы */}
            <div className={style.content}>
                {/* Lazy route */}
                < Suspense fallback={< div > Loading...</div >}>
                    <Routes>
                        {MyWordsPages.map(({ path, element, exact }) =>
                            <Route key={path} path={path} element={element} />
                        )}
                    </Routes>
                </Suspense >
            </div>
        </>
    )
}