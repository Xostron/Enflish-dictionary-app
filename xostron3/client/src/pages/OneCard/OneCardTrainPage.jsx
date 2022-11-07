import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BtnCard } from '../../components/UI/Button/btn-card/BtnCard'
import style from './OneCardTrainPage.module.css'
import iLogo from '../../img/bx-joystick-alt.svg'




function OneCardTrainPage() {
    const history = useNavigate()
    const handler = (e) => { console.log('test card = ', e) }
    const TrainCard = [
        { name: 'Учить слова', icon: iLogo, count: '5', handler: () => history('/card/:id/train_learning'), color: 'white' },
        { name: 'Спринт', icon: iLogo, count: '12', handler: () => history('/card/:id/train_sprint'), color: 'white' },
        { name: 'Слово - Перевод', icon: iLogo, count: '13', handler: () => history('/card/:id/train_write/trl'), color: 'white' },
        { name: 'Перевод - Слово', icon: iLogo, count: '15', handler: () => history('/card/:id/train_write/word'), color: 'white' },
        { name: 'Спринт2', icon: iLogo, count: '15', handler: () => history('/card/:id/train_write/word'), color: 'white' },
    ]
    // style={{ display: 'flex', flexDirection: 'row' }}
    return (
        <div className={style.container}>

            <div className={style.cards}>
                {TrainCard.map((elem, idx) => {

                    return (<BtnCard key={elem.name} card={elem} />)

                })}
            </div>

        </div>
    )
}

export default OneCardTrainPage