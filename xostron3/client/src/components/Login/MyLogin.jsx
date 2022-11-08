import React, { useState } from "react"
import { MyInput } from "../UI/Input/MyInput"
import style from './MyLogin.module.scss'
import iLogin from '../../img/bxs-user.svg'
import iClear from '../../img/bx-x.svg'
import iVisible from '../../img/bx-low-vision.svg'
import iPsw from '../../img/bx-key.svg'
import iReg from '../../img/bx-lock-open.svg'
import iIn from '../../img/bx-log-in.svg'
import iOut from '../../img/bx-log-out.svg'
import { BtnIconRect } from "../UI/Button/btn-icon/BtnIcon"


export const MyLogin = () => {
    const [login, setLogin] = useState(false)
    const inputLogin = {
        name: 'login',
        placeholder: 'Введите логин',
        iLogo: iLogin,
        iHandler: iClear,
        btnHandler: () => { },
        changeHandler: () => { },
        autoFocus: true
    }
    const inputPsw = {
        name: 'psw',
        placeholder: 'Введите пароль',
        iLogo: iPsw,
        iHandler: iVisible,
        btnHandler: () => { },
        changeHandler: () => { },
        type: 'password'
    }
    const btnItems = {
        Reg: {
            name: 'Регистрация',
            icon: iReg,
            handler: () => { },
            disabled: false,
            idName: ""
        },
        Login: {
            name: 'Войти',
            icon: iIn,
            handler: () => { },
            disabled: false,
            idName: ""
        },
        Logout: {
            name: 'Регистрация',
            icon: iOut,
            handler: () => { },
            disabled: false,
            idName: ""
        }
    }

    return (
        <div className={style.container}>
            <MyInput obj={inputLogin} />
            <MyInput obj={inputPsw} />
            <div className={style.btns}>
                <BtnIconRect item={btnItems.Reg} />
                {!login ?
                    <BtnIconRect item={btnItems.Login} /> : <BtnIconRect item={btnItems.Logout} />
                }
            </div>
        </div>
    )
}