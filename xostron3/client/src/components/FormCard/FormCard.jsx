import React from "react";
import { InFileAvaCard } from "../UI/InputFile/InFileAvaCard/InFileAvaCard";
import style from './FormCard.module.css'

export const FormCard = ({ handle }) => {

    return (
        <div className={style.container}>
            <div className={style.image}>
                <InFileAvaCard
                    handle={handle}
                />
            </div>

            <div className={style.right}>


                <span className={style.spanName}>Название</span>
                <input
                    className={style.textName}
                    type="text"
                    autoComplete='off'
                    placeholder="Например: Arcane: League of Legends"
                    spellCheck='false'
                />
                <span className={style.spanDesc}>Описание</span>
                <textarea
                    className={style.textDesc}
                    type="text"
                    autoComplete='off'
                    placeholder="Например: 1s3e"
                    spellCheck='false'
                />
            </div>
        </div>
    )
}