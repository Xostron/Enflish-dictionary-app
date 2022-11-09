import React, { useContext } from "react";
import { ColorContext } from "../../pages/TestPage";
import { BtnIconRect } from "../UI/Button/btn-icon/BtnIcon";
import iF from '../../img/bxl-react.svg'
import iS from '../../img/bxl-redux.svg'

export const Color = ({ ...color }) => {

    const item1 = {
        name: 'Добавить',
        icon: iF,
        handler: () => { },
        disabled: 0,
        idName: ''
    }

    const item2 = {
        name: 'Удалить',
        icon: iS,
        handler: () => { },
        disabled: 0,
        idName: ''
    }

    return (
        <div style={{ paddingBottom: '.5rem' }}>
            <h1>{color.id}: {color.title}</h1>
            <h3>{color.rating}</h3>
            <div style={{ height: '50px', backgroundColor: `${color.color}` }}></div>
            <BtnIconRect item={item1} />
            <BtnIconRect item={item2} />
        </div>
    )
}