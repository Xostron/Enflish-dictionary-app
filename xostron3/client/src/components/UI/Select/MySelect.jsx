import React, { useState, useCallback, useEffect } from 'react'
import style from './MySelect.module.css'

export const MySelect = ({ options, defaultVal, selectVal, setSelectVal }) => {
    const {
        value,
        name
    } = options
    return (
        <select className={style.wrapper}
            value={selectVal}
            onChange={e => {
                setSelectVal(e.target.value)
                console.log(e.target.value)
            }}>
            <option value={defaultVal}>
                {defaultVal}
            </option>
            {
                options.map(option =>
                    <option
                        key={name}
                        value={value}
                    >
                        {name}
                    </option>
                )
            }
        </select>
    )
}