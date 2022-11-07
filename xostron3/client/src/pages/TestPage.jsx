import React from "react";
import { useState } from "react";
import { BtnIcon } from '../components/UI/Button/btn-icon/BtnIcon'
import iF from '../img/bxl-react.svg'
import iS from '../img/bxl-redux.svg'
export default function TestPage() {
    const [alg1, setAlg1] = useState(0)
    const [alg2, setAlg2] = useState([1, 2, 3].join(', '))
    const testArr = [5, 10, 7, 3, 9, 1, 6, 0, 4, 2, 8]
    const ar1 = [1, 10, 100, 150, 200, 250, 300]
    const ar2 = [150, 200, 250, 300, 1, 10, 100,]
    const arr1 = [1, 2, 3]
    const arr2 = [4, 5, 6]
    const item1 = {
        name: 'Факториал',
        icon: iF,
        handler: () => { setAlg1(fact(5)) },
        disabled: 0,
        idName: ''
    }

    const item2 = {
        name: 'Быстрая сортировка',
        icon: iS,
        handler: () => { setAlg2(fastSort(testArr)) },
        disabled: 0,
        idName: ''
    }

    function fact(x) {
        if (x > 1) {
            return x * fact(x - 1)
        }
        else {
            return x
        }
    }


    function fastSort(arr) {
        let res = arr
        for (let i = 0; i < res.length - 1; i++) {
            for (let j = i + 1; j < res.length; j++) {
                if (res[i] > res[j]) {
                    let temp = res[j]
                    res[j] = res[i]
                    res[i] = temp
                    console.log(temp)
                }
            }

        }
        return res
    }

    return (
        <>
            TestPage
            <div style={{ display: 'flex', flexDirection: 'column', width: '30%', rowGap: '1rem' }}>
                <span>Факториал: {alg1}</span>

                Быстрая сортировка: {alg2}
                <BtnIcon item={item1} />
                <BtnIcon item={item2} />
            </div>
        </>
    )
}