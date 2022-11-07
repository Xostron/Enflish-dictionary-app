import React from "react"
import { MyInput } from "../UI/Input/MyInput"
import style from './MyLogin.module.scss'
import iLogin from '../../img/bxs-user.svg'
import iClear from '../../img/bx-x.svg'
import iPsw from '../../img/bx-key.svg'


export const MyLogin = () => {
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
        iHandler: iClear,
        btnHandler: () => { },
        changeHandler: () => { }
    }
    return (
        <div>
            <MyInput obj={inputLogin} />
            <MyInput obj={inputPsw} />

        </div>
    )
}