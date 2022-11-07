import React from "react";
import style from './Arrows.module.scss'
import iUp from '../../../../../img/bxs-up-arrow.svg'
import iDown from '../../../../../img/bxs-down-arrow.svg'

export const Arrows = React.memo(({ handlerChange }) => {
    return (
        <div>
            <img src={iUp} alt="Up" onClick={() => handlerChange(-1)} />
            <img src={iDown} alt="Down" onClick={() => handlerChange(1)} />
        </div>
    )
})