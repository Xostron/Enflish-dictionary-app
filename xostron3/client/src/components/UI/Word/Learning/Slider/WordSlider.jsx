import React, { useState } from "react";
import { Arrows } from "./Arrows";
import { SlideList } from "./SlideList";
import style from './WordSlider.module.scss'

export const WordSlider = React.memo(({ dict }) => {

    const [slide, setSlide] = useState(0)
    const [preSlideNumber, setPreSlideNumber] = useState(0)
    console.log(dict.length)

    const handler = (direction = 1) => {
        let number = slide + direction
        let preNumber=number-1
        if (number >= 6) { 
            number = 0 
            preNumber=5
        }
        else if (number < 0) { 
            number = 6 - 1 
            preNumber=-1
        }
        setSlide(number);
        setPreSlideNumber(preNumber)
        console.log('arrows =', slide)

    }

    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                {dict && <SlideList dict={dict} slideNumber={slide} preSlideNumber={preSlideNumber} />}
            </div>
            <Arrows handlerChange={handler} />
        </div>
    )
})

