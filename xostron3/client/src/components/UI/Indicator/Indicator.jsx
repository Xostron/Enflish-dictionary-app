import { useEffect } from 'react';
import './Indicator.css'
// import style from './indi.module.css'

export const Indicator = (props) => {

    const rot = () => {


        let el = document.querySelector(`.circle-wrap[data-value="${props.idx}"]`)

        let procToDeg = (props.value * 180) / 100

        el.querySelector('.mask.full').style.transform = 'rotate(' + procToDeg + 'deg)';
        el.querySelector('.mask.half').style.transform = 'rotate(' + (procToDeg + 180) + 'deg)';
        el.querySelector('.fill1').style.transform = 'rotate(' + procToDeg + 'deg)';
        el.querySelector('.fill2').style.transform = 'rotate(' + (-procToDeg) + 'deg)';
        console.log(`elemen ${props.idx} = `, el)
        // console.log('+++', el.querySelector('.mask.full').style)
    }


    useEffect(() => {

        rot()
    }, [props.value])

    // let el = document.querySelector('.circle-wrap')
    // console.log(el.getAttribute('data-value'))
    // console.log(el)
    return (
        <div className='circle-wrap' data-value={props.idx}>
            <div className="circle" >
                <div className="mask full">
                    <div className="fill1"></div>
                </div>
                <div className="mask half">
                    <div className="fill2"></div>
                </div>
                <div className="inside-circle"> {props.value}%</div>
            </div>
        </div>

        // data-value={`rotate(${(props.value)}deg)`}

        // <div className='wrapper'>
        //     wrapper
        //     <div className='inner1'>inner1</div>
        //     <div className='inner2'>inner2</div>
        // </div>
    )
}