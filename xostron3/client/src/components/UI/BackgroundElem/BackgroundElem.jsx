import React, { useState } from 'react'
import { useEffect } from 'react'
import style from './BackgroundElem.module.css'

export const BackgroundElem = ({ val }) => {
    const [activate, setActivate] = useState(false)
    useEffect(() => {
        setActivate(!activate)
    }
        , [val])
    return (
        <div className={activate ? style.main : (style.main + ' ' + style.active)}>

        </div>
    )
}