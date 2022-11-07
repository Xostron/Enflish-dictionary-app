import React from 'react'
import { HandySvg } from 'handy-svg'
import style from './BtnIcon.module.css'
const colorDisabled = '#0000003d'
export const BtnIcon1 = ({ children, ...props }) => {
    return (
        <button {...props}>
            {children}
            <p>{props.text}</p>
            <p>{props.value.name}</p>
            {console.log('children = ', children)}
            {console.log('props = ', props)}
        </button>
    )
}

export const BtnIcon2 = ({ children, ...loken }) => {
    return (
        <button {...loken}>
            {children}
            <p>{loken.text}</p>
            <p>{loken.value.name}</p>
            {console.log('children = ', children)}
            {console.log('props = ', loken)}
        </button>
    )
}


// подстветка активного состояния 


export const BtnIcon = ({ item }) => {
    const {
        name,
        icon,
        handler,
        disabled,
        idName
    } = item



    return (
        <div name={idName} className={style.wrapper} onClick={handler} >
            {icon && <HandySvg
                src={icon}
                className={style.icon}
                style={disabled === true ? { fill: colorDisabled } : {}}
            />}
            <span
                className={style.text}
                style={disabled === true ? { color: colorDisabled } : {}}
            >
                {name}
            </span>
        </div>
    )
}