import React from "react";
import { HandySvg } from 'handy-svg'
import style from './InputMap.module.css'
import iAdd from '../../../img/bx-plus.svg'
import iSub from '../../../img/bx-minus.svg'

const InputMap = ({ obj }) => {
    const {
        trl,
        handler,
        handlerAddDel
    } = obj
    return (
        <div className={style.content}>
            {trl.map((val, idx) => {
                return (
                    <div className={style.wrapper} key={idx}>
                        <input
                            className={style.my_input}
                            type="text"
                            autoComplete='off'
                            placeholder={'Translate ' + (idx + 1)}
                            name='translate'
                            value={val}
                            onChange={(e) => handler(e, idx)}
                        />
                        {
                            // +1 строку перевода
                            idx === 0 ?
                                <div className={style.btn}>
                                    <HandySvg
                                        src={iAdd}
                                        className={style.icon}
                                        onClick={() => handlerAddDel('add', idx)}
                                    />
                                </div> :
                                // -1 строку перевода
                                <div className={style.btn}>
                                    <HandySvg
                                        src={iSub}
                                        className={style.icon}
                                        onClick={() => handlerAddDel('del', idx)}
                                    />
                                </div>
                        }


                    </div>
                )
            })
            }
        </div>
    )
}

export { InputMap }