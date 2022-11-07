import React, { Fragment, useEffect, useState } from "react";
import { Slide } from "./Slide";
import style from './SlideList.module.scss'

// { word:'6',transcription:'1',translate:['6'],example:'',img:'',visible:''},
//        { word:'7',transcription:'1',translate:['7'],example:'',img:'',visible:''},
//        { word:'8',transcription:'1',translate:['8'],example:'',img:'',visible:''},
//        { word:'9',transcription:'1',translate:['9'],example:'',img:'',visible:''},
//        { word:'10',transcription:'1',translate:['10'],example:'',img:'',visible:''},
//        { word:'11',transcription:'1',translate:['11'],example:'',img:'',visible:''}

export const SlideList = React.memo(({ dict, slideNumber, preSlideNumber })=> {

    const [words, setWords] = useState([
        { word:'1',transcription:'1',translate:['1'],example:'',img:'',visible:''},
        { word:'2',transcription:'1',translate:['2'],example:'',img:'',visible:''},
       { word:'3',transcription:'1',translate:['3'],example:'',img:'',visible:''},
       { word:'4',transcription:'1',translate:['4'],example:'',img:'',visible:''},
       { word:'5',transcription:'1',translate:['5'],example:'',img:'',visible:''},
       { word:'6',transcription:'1',translate:['6'],example:'',img:'',visible:''},
    ]) 

    

const styleTransform=()=> {
    if ((preSlideNumber===5 && slideNumber===0) || (preSlideNumber===-1 && slideNumber===5)){
    let styleEl = { transform: `translateY(calc(-${slideNumber * 15}%))`,
transition:'none' }
return(styleEl)}
else{
    let styleEl = { transform: `translateY(calc(-${slideNumber * 15}%))` }
    return(styleEl)
}
}



    return (
        <div className={style.container}
        style={styleTransform()}
        >
            <div className={style.wrapper50}>
                {words && words.map((elem, idx)=>{
                    return(
                        <Slide key={idx*10} item={elem} slideNumber={slideNumber} idx={(idx+1)*10}/>
                    )
                })}
                </div>

            <div className={style.wrapper50} >
                {words && words.map((elem, idx)=>{
                    return(
                        <Slide key={idx} item={elem} slideNumber={slideNumber} idx={idx}/>
                    )
                })}
            </div>

            <div className={style.wrapper50} >
                {words && words.map((elem, idx)=>{
                    return(
                        <Slide key={idx*100} item={elem} slideNumber={slideNumber} idx={(idx+1)*100}/>
                    )
                })}
            </div>
        </div>
        )
    })

    // const [component, setComponent] = useState(
    //     [
    //         <Slide item={words[0]} slideNumber={slideNumber}/>,
    //         <Slide item={words[1]} slideNumber={slideNumber}/>,
    //         <Slide item={words[2]} slideNumber={slideNumber}/>,
    //         <Slide item={words[3]} slideNumber={slideNumber}/>,
    //         <Slide item={words[4]} slideNumber={slideNumber}/>
    //     ]
    // )

    // useEffect(()=>{
    //     if (direction===-1 && component) {
    
    //         let arr = component.slice(0,4)
    //         arr.unshift(component[4])
    //         setComponent(arr)
    //     }
    //     else if (direction===1 && component){
    //         let arr = component.slice(1,5)
    //         arr.push(component[0])
    //         setComponent(arr)
    //     }
    //     setDirection(0)
    
    //     }, [direction])
    
    
    //     useEffect(()=>{
    //         setComponent(  [
    //             <Slide item={words[0]} slideNumber={slideNumber}/>,
    //             <Slide item={words[1]} slideNumber={slideNumber}/>,
    //             <Slide item={words[2]} slideNumber={slideNumber}/>,
    //             <Slide item={words[3]} slideNumber={slideNumber}/>,
    //             <Slide item={words[4]} slideNumber={slideNumber}/>
    //         ])
    //     },[])