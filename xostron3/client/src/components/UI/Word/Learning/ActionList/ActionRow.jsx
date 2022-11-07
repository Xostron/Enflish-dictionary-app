import React, { useState } from "react";
import style from './ActionRow.module.scss'

export const ActionRow = ({ item, handler }) => {
    const {
        word,
        transcription,
        translate,
        example,
        img,
        visible,
        check

    } = item

    const styleContent = check === 'yes' ? style.content_yes + ' ' + style.content :
        check === 'no' ? style.content_no + ' ' + style.content :
            style.content
    const styleWrapper = check === 'yes' ? style.wrapper_yes + ' ' + style.wrapper :
        check === 'no' ? style.wrapper_no + ' ' + style.wrapper :
            style.wrapper
    const styleFocus = visible ? style.wrapper + ' ' + style.focus : style.wrapper

    return (
        <div className={styleWrapper + ' ' + styleFocus}
            onClick={handler}
        >

            <div className={styleContent}>
                <span className={style.word}>{word}</span>
                <span >[{transcription}]</span>
                {translate.map((i, idx) => {
                    if (idx <= 1) {
                        return (<span key={idx}><b>{i}</b></span>)
                    }
                })}
            </div>
        </div>
    )
}