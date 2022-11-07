import React, { useState } from 'react'
import style from './DropdownV1.module.scss'
import { HandySvg } from 'handy-svg'
import iDel from '../../../img/bx-trash-alt.svg'
import iPen from '../../../img/bx-edit-alt.svg'
import iShare from '../../../img/bx-share.svg'


export const DropdownV1 = ({ options, setActive }) => {

    return (

        <div className={style.dropdown}>
            <div className={style.content}>

                {
                    options.map((option, idx) =>
                        <div className={style.item}
                            key={option.name}
                            onClick={() => {
                                option.handler()
                                setActive(false)
                            }}
                        >
                            {/* <HandySvg
                                    src={icons[idx]}
                                    className={style.btnIcon}
                                /> */}
                            {option.name}
                        </div>
                    )
                }
                <div className={style.exit} onClick={() => { setActive(false) }}>
                </div>
            </div>
        </div>

    )
}