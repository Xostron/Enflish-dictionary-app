import React, { useState, useEffect, useCallback } from 'react'
import style from './RowCard.module.css'
import { HandySvg } from 'handy-svg'
import iDots from '../../../../img/bx-dots-vertical-rounded.svg'
import iIcon from '../../../../img/bx-library.svg'
import { DropdownV0 } from "../../Dropdown/DropdownV0";

export const RowCard = ({ value, icon, handler1, selectOptions }) => {
    const [selectVal, setSelectVal] = useState({ name: 'Не выбрано', value: '' })
    return (

        <div className={style.wrapper__btn}>

            <div className={style.left_part} onClick={handler1}>
                <div className={style.img_wrapper}>
                    {icon ?
                        <img
                            className={style.icon}
                            src={icon}
                            alt="card"
                            width="64"
                            height="64" />
                        :
                        <HandySvg
                            src={iIcon}
                            className={style.svg}
                        />
                    }
                </div>

                <div className={style.content__wrapper}>
                    <div className={style.inner1}>{value.name}</div>
                    <div className={style.inner2}>{value.user_id}</div>
                </div>
            </div>

            <div className={style.right_part} >

                <DropdownV0
                    options={selectOptions}
                    icon={iDots}
                />
            </div>
        </div >


    )
}
