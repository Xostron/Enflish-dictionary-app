import React, { useState } from "react"
import style from './MyInput.module.css'
import { HandySvg } from 'handy-svg'

export const MyInput = ({ obj }) => {

    const {
        name,
        placeholder,
        iLogo,
        iHandler,
        btnHandler,
        changeHandler,
        value,
        autoFocus,
        type
    } = obj

    return (
        <div className={style.container} >

            <input
                className={style.myInput}
                type={type || 'text'}
                placeholder={placeholder}
                name={name}
                onChange={changeHandler}
                autoComplete='off'
                autoFocus={autoFocus || false}
                value={value}

            />
            {iLogo &&
                <HandySvg
                    src={iLogo}
                    className={style.iconStart}
                />}
            {iHandler &&
                <HandySvg
                    src={iHandler}
                    className={style.iconEnd}
                    onClick={btnHandler}
                />}

        </div>
    )
}