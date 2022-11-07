import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import style from './DropdownV0.module.css'
import { HandySvg } from 'handy-svg'
import iBtn from '../../../img/bx-dots-horizontal-rounded.svg'
import { InputFile } from '../InputFile/InputFile'
import { InputBtnImg } from '../Button/input-file/InputBtnImg'


export const DropdownV0 = ({ options, icon = iBtn, orientation = 'middle-left' }) => {
    // const {
    //     name,
    //     handler,
    //     icon,
    // } = options
    // y = -57, x = -190
    // orientation = middle-left, middle-right, top-left, top-right, bottom-left, bottom-right  
    const [coor, setCoor] = useState({ x: 0, y: 0 })
    const [active, setActive] = useState(false)
    const refBtn = useRef(null)
    const refDropdown = useRef(null)
    // привязка координат drop-списка к кнопке
    useEffect(() => {
        if (active && refDropdown !== null) {
            const coordinate1 = refBtn.current.getBoundingClientRect()
            const coordinate2 = refDropdown.current.getBoundingClientRect()
            switch (orientation) {
                case 'middle-left':
                    setCoor({
                        x: coordinate1.x - coordinate2.width,
                        y: (coordinate1.y - coordinate2.height / 2 + coordinate1.height / 2)
                    })
                    break;
                case 'top-left':
                    setCoor({
                        x: coordinate1.x - coordinate2.width - coordinate1.width / 2,
                        y: (coordinate1.y + coordinate1.height + coordinate1.height / 2)
                    })
                    break;
                case 'in-modal':
                    setCoor({
                        x: (coordinate1.x - coordinate2.width - coordinate1.width / 2) * 0.91,
                        y: (coordinate1.y + coordinate1.height + coordinate1.height / 2) * 0.5
                    })
                    break
                default: //'middle-left'
                    setCoor({
                        x: coordinate1.x - coordinate2.width,
                        y: (coordinate1.y - coordinate2.height / 2 + coordinate1.height / 2)
                    })
                    break;
            }

            // console.log('coor btn = ', coordinate1)
            // console.log('coor popup = ', coordinate2)
        }

    }, [active])

    return (

        <div>

            <div className={style.btn_wrapper}
                onClick={(e) => {
                    setActive(!active)
                    e.stopPropagation()
                }}
                ref={refBtn}
            >
                <HandySvg
                    src={icon}
                    className={style.btnIcon}
                />
            </div>



            <div className={active ? style.exit + ' ' + style.active : style.exit} onClick={(e) => {
                setActive(false)
                // e.stopPropagation()
            }}>
                <div className={active ? style.content + ' ' + style.active : style.content}
                    style={{ top: `${coor.y}px`, left: `${coor.x}px`, }}
                    ref={refDropdown}
                >

                    {
                        options.map((option, idx) =>
                            <div key={idx}>
                                {
                                    (option.type === 'button') &&
                                    <div className={style.item}
                                        onClick={(e) => {
                                            option.handler()
                                            setActive(false)
                                            e.stopPropagation()
                                        }}
                                    >
                                        <HandySvg
                                            src={option.icon}
                                            className={style.btnIcon}
                                        />
                                        {option.name}
                                    </div>
                                }

                                {(option.type === 'hr') && <hr />}

                                {
                                    (option.type === 'input-file') &&
                                    <div className={style.item}>
                                        <InputBtnImg obj={option} />
                                    </div>
                                }

                            </div>
                        )
                    }

                </div>
            </div>


        </div>

    )
}