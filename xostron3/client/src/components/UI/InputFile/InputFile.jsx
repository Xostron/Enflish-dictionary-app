import React from "react";
import style from './InputFile.module.css'

export const InputFile = ({ ...propsChildren }) => {
    return (
        <div className={style.wrapper}>
            <input {...propsChildren} className={style.input__file} id='myInputFile' type="file" />
            <label className={style.base__button} htmlFor='myInputFile'>
                <span className={style.text__button}>
                    Выберите файл...
                </span>
            </label>
        </div>


    )
}