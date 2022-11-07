import React, { useRef, useState } from 'react'
import { HandySvg } from 'handy-svg'
import style from './MyCheckbox.module.css'
import iOk from '../../../img/../img/bx-check.svg'


export const MyCheckbox = ({ handler }) => {

    const [active, setActive] = useState(false)

    const styleToggle = active ? (style.toggle + ' ' + style.active) : style.toggle

    const checkRef = useRef()

    const handlerEvent = () => {
        checkRef.current.click()
        setActive(!active)
        handler()
        console.log('check = ', active)
    }
    return (
        <>
            <div className={style.container} onClick={handlerEvent}>
                <HandySvg
                    className={styleToggle}
                    src={iOk}
                />
            </div>

            <input className={style.hiddenParent} type="checkbox" ref={checkRef} />

        </>
    )
}