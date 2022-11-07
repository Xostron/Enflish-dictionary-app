import React from "react";
import style from './Arrows.module.scss'
import iUp from '../../../../img/bxs-up-arrow.svg'
import iDown from '../../../../img/bxs-down-arrow.svg'

export const Dots = React.memo(({handlerUp, handlerDown})=>{
    return(
        <div>
            <img src={iUp} alt="Up" onClick={handlerUp}/>
            <img src={iDown} alt="Down" onClick={handlerDown} />
        </div>
    )
})