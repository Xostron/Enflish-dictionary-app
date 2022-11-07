import React, {useState} from "react";
import style from './WordCard.module.scss'

export const WordCard = ({item})=>{
    const {
        word,
        transcription,
        translate,
        example,
        img,
        visible
    } = item
const [styleContainer, setStyle] = useState(style.container)

const handlerYesNo=()=>{
    if (styleContainer === style.container){
        setStyle(style.container_yes)
    }
    else if (styleContainer === style.container_yes){
        setStyle(style.container_no)
    }
    else{
        setStyle(style.container)
    }
}



    return(
        <div className={style.wrapper_parlax}
        onClick={handlerYesNo}
        
        >
            <div className={styleContainer}>
                <div className={style.front_side}>
                    <h3>{word}</h3>
                </div>
                <div className={style.back_side}>
                    <p>{word}</p>
                    <p >[{transcription}]</p>
                    {translate.map((i,idx)=>{
                        if (idx<=1){
                        return(<p key={idx}><b>{i}</b></p>)
                        }
                    })}
                    

                </div>
            </div>
        </div>
    )
}