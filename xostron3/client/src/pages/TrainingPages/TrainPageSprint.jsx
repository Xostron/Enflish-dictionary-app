import React, { useState } from "react";
import { WordSlider } from "../../components/UI/Word/Learning/Slider/WordSlider";
const dict = [
    { word: '1', transcription: '1', translate: ['1'], example: '', img: '', visible: '' },
    { word: '2', transcription: '1', translate: ['2'], example: '', img: '', visible: '' },
    { word: '3', transcription: '1', translate: ['3'], example: '', img: '', visible: '' },
    { word: '4', transcription: '1', translate: ['4'], example: '', img: '', visible: '' },
    { word: '5', transcription: '1', translate: ['5'], example: '', img: '', visible: '' },
    { word: '6', transcription: '1', translate: ['6'], example: '', img: '', visible: '' },
]
export default function TrainPageSprint() {
    return (
        <>
            Sprint
            <WordSlider dict={dict} />
        </>
    )
}