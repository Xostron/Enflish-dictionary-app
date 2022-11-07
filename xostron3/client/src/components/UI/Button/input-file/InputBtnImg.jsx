import React, { useRef } from 'react'
import { HandySvg } from 'handy-svg'
import style from './InputBtnImg.module.css'
const colorDisabled = '#0000003d'

export const InputBtnImg = ({ obj }) => {
    const {
        name,
        icon,
        handler,
        disabled
    } = obj
    const reference = useRef()
    const handleRef = () => {
        reference.current.click()
    }

    return (
        <>
            <div className={style.wrapper} onClick={handleRef}>
                {icon && <HandySvg
                    src={icon}
                    className={style.icon}
                    style={disabled === true ? { fill: colorDisabled } : {}}
                />}
                <span
                    className={style.text}
                    style={disabled === true ? { color: colorDisabled } : {}}
                >
                    {name}
                </span>
            </div>

            <input className={style.hiddenFile}
                id='inputFile'
                ref={reference}
                type="file"
                onChange={handler}
            />
        </>

    )
}