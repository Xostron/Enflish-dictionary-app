import React, { Suspense, useState, useContext } from 'react'
import { Route, Routes, useParams, useNavigate, useMatch } from 'react-router-dom'
import { cardContext, userContext } from '../context/user.context'
import { OneCardPages } from '../routes/Routes';
import { MyFooter } from '../components/UI/Footer/MyFooter';
import { BtnV1 } from '../components/UI/Button/btn-text/BtnV1';
import { Subtitle3 } from '../components/UI/Subtitle/Subtitle3';
import { SetLinkOrBtn } from '../components/SetLinkOrBtn/SetLinkOrBtn';
import Player from '../components/UI/Anime/Test/Player';
import style from './OneCardRouterPage.module.scss'
import iSet from '../img/bx-dots-vertical-rounded.svg'
import iBack from '../img/svg/Vector-89.svg'
import iTrend from '../img/bx-line-chart.svg'
import iTrain from '../img/bx-joystick.svg'
import iMain from '../img/bx-heart.svg'
import iEdit from '../img/bx-edit-alt.svg'
import iExit from '../img/bx-x.svg'
import iCancel from '../img/bx-x.svg'
import iDel from '../img/bx-trash-alt.svg'
import iShare from '../img/bx-share.svg'
import iNew from '../img/bx-plus.svg'
import iTable from '../img/bx-collection.svg'
import iTile from '../img/bx-category.svg'

const currentPage = (obj) => {
    let result = ''
    for (let item in obj) {
        console.log('iteration', item)
        if (obj[item] != null) {
            result = item
            return result
        }
    }
}

const pagesCard = OneCardPages
// функция для кнопки "Поделиться" - off mode
const eventDisabled = (e) => {
    e.preventDefault()
}

export default function OneCardOutletPage() {
    // context data
    const { viewTrainLearning, setViewTL } = useContext(userContext)

    const cardId = useParams().id

    const history = useNavigate()

    const pages = {
        detail: useMatch('card/:id/detail'),
        train: useMatch('card/:id/train'),
        stc: useMatch('card/:id/stc'),
        edit: useMatch('card/:id/edit'),
        trainLearning: useMatch('card/:id/train_learning'),
        trainWriteWord: useMatch('card/:id/train_write/word'),
        trainWriteTrl: useMatch('card/:id/train_write/trl'),
        trainSprint: useMatch('card/:id/train_sprint'),
        add: useMatch('card/:id/add')
    }


    const btnItems = [
        { name: 'Слова', to: `detail`, icon: iMain, type: 'link', disabled: 0 },
        { name: 'Тренировка', to: `train`, icon: iTrain, type: 'link', disabled: 0 },
        { name: 'Статистика', to: `stc`, icon: iTrend, type: 'link', disabled: 0 },
        { name: 'Редактировать', to: `edit`, icon: iEdit, type: 'link', disabled: 0 },
    ]


    const dropOptions = {
        detail: [
            // { name: 'Слова', handler: () => { history(`/card/${cardId}/detail`) }, icon: iMain,type: 'button' },
            { name: 'Тренировка', handler: () => { history(`/card/${cardId}/train`) }, icon: iTrain, type: 'button' },
            { name: 'Статистика', handler: () => { history(`/card/${cardId}/stc`) }, icon: iTrend, type: 'button' },
            { name: 'Редактировать', handler: () => { history(`/card/${cardId}/edit`) }, icon: iEdit, type: 'button' },
            { name: ' ' },
            { name: 'Поделиться', handler: () => { console.log('test share') }, icon: iShare, type: 'button' },
            { name: 'Создать новый набор', handler: () => { console.log('test create new') }, icon: iNew, type: 'button' },
            { name: 'Удалить набор', handler: () => { console.log('test delete') }, icon: iDel, type: 'button' },
        ],
        edit: [
            { name: 'Слова', handler: () => { history(`/card/${cardId}/detail`) }, icon: iMain, type: 'button' },
            { name: 'Тренировка', handler: () => { history(`/card/${cardId}/train`) }, icon: iTrain, type: 'button' },
            { name: 'Статистика', handler: () => { history(`/card/${cardId}/stc`) }, icon: iTrend, type: 'button' },
            // { name: 'Редактировать', handler: () => { history(`/card/${cardId}/edit`) }, icon: iEdit,type: 'button' },
            { name: ' ' },
            { name: 'Поделиться', handler: () => { console.log('test share') }, icon: iShare, type: 'button' },
            { name: 'Создать новый набор', handler: () => { console.log('test create new') }, icon: iNew, type: 'button' },
            { name: 'Удалить набор', handler: () => { console.log('test delete') }, icon: iDel, type: 'button' },
        ],
        train: [
            { name: 'Слова', handler: () => { history(`/card/${cardId}/detail`) }, icon: iMain, type: 'button' },
            // { name: 'Тренировка', handler: () => { history(`/card/${cardId}/train`) }, icon: iTrain,type: 'button' },
            { name: 'Статистика', handler: () => { history(`/card/${cardId}/stc`) }, icon: iTrend, type: 'button' },
            { name: 'Редактировать', handler: () => { history(`/card/${cardId}/edit`) }, icon: iEdit, type: 'button' },
            // { name: ' ' },
            // { name: 'Поделиться', handler: () => { console.log('test share') }, icon: iShare,type: 'button' },
            // { name: 'Создать новый набор', handler: () => { console.log('test create new') }, icon: iNew,type: 'button' },
            // { name: 'Удалить набор', handler: () => { console.log('test delete') }, icon: iDel,type: 'button' },
        ],
        stc: [
            { name: 'Слова', handler: () => { history(`/card/${cardId}/detail`) }, icon: iMain, type: 'button' },
            { name: 'Тренировка', handler: () => { history(`/card/${cardId}/train`) }, icon: iTrain, type: 'button' },
            // { name: 'Статистика', handler: () => { history(`/card/${cardId}/stc`) }, icon: iTrend ,type: 'button'},
            { name: 'Редактировать', handler: () => { history(`/card/${cardId}/edit`) }, icon: iEdit, type: 'button' },
        ],
        trainLearning: [
            { name: 'Слова', handler: () => { history(`/card/${cardId}/detail`) }, icon: iMain, type: 'button' },
            { name: 'Тренировка', handler: () => { history(`/card/${cardId}/train`) }, icon: iTrain, type: 'button' },
            { name: 'Статистика', handler: () => { history(`/card/${cardId}/stc`) }, icon: iTrend, type: 'button' },
            { name: 'Редактировать', handler: () => { history(`/card/${cardId}/edit`) }, icon: iEdit, type: 'button' },
            { name: ' ' },
            {
                name: viewTrainLearning ? 'Вид - плитка' : 'Вид - таблица',
                handler: () => { setViewTL(!viewTrainLearning) },
                icon: viewTrainLearning ? iTile : iTable,
                type: 'button'
            },
            { name: 'Закончить изучение', handler: () => { history(`/card/${cardId}/edit`) }, icon: iExit, type: 'button' },
            // { name: 'Close', handler: () => { setViewTL(false) }, icon: iExport,type: 'button' },
            // { name: 'Добавить слово', handler: () => { console.log('test share') }, icon: iAdd,type: 'button' },
        ],
        trainWriteWord: [
            { name: 'Слова', handler: () => { history(`/card/${cardId}/detail`) }, icon: iMain, type: 'button' },
            { name: 'Тренировка', handler: () => { history(`/card/${cardId}/train`) }, icon: iTrain, type: 'button' },
            { name: 'Статистика', handler: () => { history(`/card/${cardId}/stc`) }, icon: iTrend, type: 'button' },
            { name: 'Редактировать', handler: () => { history(`/card/${cardId}/edit`) }, icon: iEdit, type: 'button' },
            { name: ' ' },
            {
                name: viewTrainLearning ? 'Вид - плитка' : 'Вид - таблица',
                handler: () => { setViewTL(!viewTrainLearning) },
                icon: viewTrainLearning ? iTile : iTable,
                type: 'button'
            },
            { name: 'Закончить изучение', handler: () => { history(`/card/${cardId}/edit`) }, icon: iExit, type: 'button' },
            // { name: 'Экспорт в excel', handler: () => { console.log('test delete') }, icon: iExport ,type: 'button'},
            // { name: 'Добавить слово', handler: () => { console.log('test share') }, icon: iAdd,type: 'button' },
        ],
        trainWriteTrl: [
            { name: 'Слова', handler: () => { history(`/card/${cardId}/detail`) }, icon: iMain, type: 'button' },
            { name: 'Тренировка', handler: () => { history(`/card/${cardId}/train`) }, icon: iTrain, type: 'button' },
            { name: 'Статистика', handler: () => { history(`/card/${cardId}/stc`) }, icon: iTrend, type: 'button' },
            { name: 'Редактировать', handler: () => { history(`/card/${cardId}/edit`) }, icon: iEdit, type: 'button' },
            { name: ' ' },
            {
                name: viewTrainLearning ? 'Вид - плитка' : 'Вид - таблица',
                handler: () => { setViewTL(!viewTrainLearning) },
                icon: viewTrainLearning ? iTile : iTable,
                type: 'button'
            },
            { name: 'Закончить изучение', handler: () => { history(`/card/${cardId}/edit`) }, icon: iExit, type: 'button' },
            // { name: 'Экспорт в excel', handler: () => { console.log('test delete') }, icon: iExport,type: 'button' },
            // { name: 'Добавить слово', handler: () => { console.log('test share') }, icon: iAdd,type: 'button' },
        ],
        trainSprint: [
            { name: 'Слова', handler: () => { history(`/card/${cardId}/detail`) }, icon: iMain, type: 'button' },
            { name: 'Тренировка', handler: () => { history(`/card/${cardId}/train`) }, icon: iTrain, type: 'button' },
            { name: 'Статистика', handler: () => { history(`/card/${cardId}/stc`) }, icon: iTrend, type: 'button' },
            { name: 'Редактировать', handler: () => { history(`/card/${cardId}/edit`) }, icon: iEdit, type: 'button' },
            { name: ' ' },
            {
                name: viewTrainLearning ? 'Вид - плитка' : 'Вид - таблица',
                handler: () => { setViewTL(!viewTrainLearning) },
                icon: viewTrainLearning ? iTile : iTable,
                type: 'button'
            },
            { name: 'Закончить изучение', handler: () => { history(`/card/${cardId}/edit`) }, icon: iExit, type: 'button' },
            // { name: 'Экспорт в excel', handler: () => { console.log('test delete') }, icon: iExport,type: 'button' },
            // { name: 'Добавить слово', handler: () => { console.log('test share') }, icon: iAdd ,type: 'button'},
        ],
        add: [
            { name: 'Слова', handler: () => { history(`/card/${cardId}/detail`) }, icon: iMain, type: 'button' },
            { name: 'Тренировка', handler: () => { history(`/card/${cardId}/train`) }, icon: iTrain, type: 'button' },
            { name: 'Статистика', handler: () => { history(`/card/${cardId}/stc`) }, icon: iTrend, type: 'button' },
            { name: 'Редактировать', handler: () => { history(`/card/${cardId}/edit`) }, icon: iEdit, type: 'button' },
        ],
    }

    const fillSubtitles =
    {
        detail: {
            leftIcon: iBack,
            leftHandler: () => { history(-1) },
            rightIcon: iSet,
            title: `Набор`,
            auxTitle: ``,
            dropOptions: dropOptions[currentPage(pages)],
            orientation: 'top-left'
        },
        train: {
            leftIcon: iBack,
            leftHandler: () => { history(-1) },
            rightIcon: iSet,
            title: `Набор`,
            auxTitle: ``,
            dropOptions: dropOptions[currentPage(pages)],
            orientation: 'top-left'
        },
        stc: {
            leftIcon: iBack,
            leftHandler: () => { history(-1) },
            rightIcon: iSet,
            title: `Набор`,
            auxTitle: ``,
            dropOptions: dropOptions[currentPage(pages)],
            orientation: 'top-left'
        },
        edit: {
            leftIcon: iBack,
            leftHandler: () => { history(-1) },
            rightIcon: iSet,
            title: `Набор`,
            auxTitle: ``,
            dropOptions: dropOptions[currentPage(pages)],
            orientation: 'top-left'
        },
        trainLearning: {
            leftIcon: iCancel,
            leftHandler: () => { history(-1) },
            rightIcon: iSet,
            title: `Изучение слов`,
            auxTitle: ``,
            dropOptions: dropOptions[currentPage(pages)],
            orientation: 'top-left'
        },
        trainWriteWord: {
            leftIcon: iCancel,
            leftHandler: () => { history(-1) },
            rightIcon: iSet,
            title: `Изучение слов`,
            auxTitle: ``,
            dropOptions: dropOptions[currentPage(pages)],
            orientation: 'top-left'
        },
        trainWriteTrl: {
            leftIcon: iCancel,
            leftHandler: () => { history(-1) },
            rightIcon: iSet,
            title: `Изучение слов`,
            auxTitle: ``,
            dropOptions: dropOptions[currentPage(pages)],
            orientation: 'top-left'
        },
        trainSprint: {
            leftIcon: iCancel,
            leftHandler: () => { history(-1) },
            rightIcon: iSet,
            title: `Изучение слов`,
            auxTitle: ``,
            dropOptions: dropOptions[currentPage(pages)],
            orientation: 'top-left'
        },
        add: {
            leftIcon: iBack,
            leftHandler: () => { history(-1) },
            rightIcon: iSet,
            title: `Набор`,
            auxTitle: ``,
            dropOptions: dropOptions[currentPage(pages)],
            orientation: 'top-left'
        },
    }

    // функция для кнопки "Поделиться" - on mode
    const foo = (id) => {
        console.log('mark12 =', id)
    }



    // Test Log****************************************
    // console.log('current route =', isPage)
    // Test Log****************************************

    return (
        <cardContext.Provider value={{
            // viewTrainLearning,
            // setViewTL
        }}>
            <>

                {/* Главный Заголовок */}
                <Subtitle3
                    content={fillSubtitles[currentPage(pages)]}
                >
                    <SetLinkOrBtn items={btnItems} />
                </Subtitle3>

                <hr />


                {/* Основной контент страницы */}
                {/* Lazy route */}
                < Suspense fallback={< div > Loading...</div >}>
                    <Routes>
                        {pagesCard.map(({ path, element, exact }) =>
                            <Route key={path} path={path} element={element} exact={exact} />
                        )}
                    </Routes>
                </Suspense >


                {/* <div className={style.anim}>
                    <Player />
                </div> */}


                {/* Футер основной страницы - показывается только на странице Редактирования */}
                {pages.edit ?
                    < MyFooter >
                        <BtnV1 onClick={() => { console.log('Кнопка footer') }}>
                            Сохранить
                        </BtnV1>
                    </MyFooter>
                    :
                    null}

                {/* <MyModal visibleId={modal} setVisibleId={setModal}>
                <div style={{ color: 'white', width: '50%', height: '50%', backgroundColor: 'violet' }}>ЕПТА!</div>
            </MyModal> */}
            </>
        </cardContext.Provider>
    )
}