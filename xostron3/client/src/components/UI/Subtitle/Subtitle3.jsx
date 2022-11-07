import React from 'react'
import { HandySvg } from 'handy-svg'
import { DropdownV0 } from '../Dropdown/DropdownV0'
import style from './Subtitle3.module.css'


export const Subtitle3 = ({ children, content }) => {
    const {
        leftIcon,
        leftHandler,
        rightIcon,
        title,
        auxTitle,
        dropOptions,
        orientation
    } = content

    return (
        <div className={style.title}>

            <div className={style.left}>
                <div className={style.btn} onClick={leftHandler}>
                    <HandySvg
                        src={leftIcon}
                        className={style.icon}
                    />
                </div>
                <strong>
                    {title}
                    <span className={style.text_span}>{auxTitle}</span>
                </strong>
            </div>

            <div className={style.middle}>
                {children}
            </div>

            <div className={style.right}>
                <div className={style.btn}>
                    {dropOptions ?
                        <DropdownV0
                            options={dropOptions}
                            icon={rightIcon}
                            orientation={orientation}
                        />
                        :
                        null
                    }
                </div>
            </div>

        </div>
    )
}