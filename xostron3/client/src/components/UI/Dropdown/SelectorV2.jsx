import React, { useState } from 'react'
import style from './SelectorV2.module.css'
import iArrow from '../../../img/bxs-up-arrow.svg'

export const SelectorV2 = ({ options, selectVal, setSelectVal }) => {
    const [active, setActive] = useState(false)
    return (
        <div className={style.dropdown}>
            <div className={style.btn}
                onClick={() => setActive(!active)}
            >
                {selectVal.name}
                <span>
                    <img src={iArrow} alt="select" />
                </span>
            </div>
            {active && <div className={style.content}>
                {
                    options.map(option =>
                        <div className={style.item}
                            key={option.name}
                            onClick={() => {
                                setSelectVal({ name: option.name, value: option.value })
                                setActive(!active)
                            }}
                        >
                            {option.name}
                        </div>
                    )
                }
            </div>}
        </div>
    )
}