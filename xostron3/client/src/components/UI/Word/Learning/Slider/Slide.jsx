import React, { useEffect, useState } from "react";
import style from './Slide.module.scss'

export const Slide = React.memo(({ item, slideNumber, idx }) => {
    const {
        word,
        transcription,
        translate,
        example,
        img,
        visible
    } = item

    const [styleComponent, setStyle] = useState(style.wrapper)



    return (

        <div className={styleComponent}
            style={(slideNumber === idx) ? { backgroundColor: '#256ce1',
            boxShadow: '0 8px 16px 0 #00000088' } : { backgroundColor: 'rgb(182, 182, 182)',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.25)' }}
        >
            <div>id={idx}</div>
            <div><h3>{word}</h3></div>
            <div>[{transcription}]</div>
            {
                translate.map((i, idx) => {
                    if (idx <= 2) {
                        return (<div key={idx}><h3>{i}</h3></div>)
                    }
                })
            }
        </div >

    )
})
