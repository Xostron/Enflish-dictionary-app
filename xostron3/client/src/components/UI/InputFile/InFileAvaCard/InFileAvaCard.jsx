import React, { useState, useRef } from 'react'
import style from './InFileAvaCard.module.css'
import { HandySvg } from 'handy-svg'
import iCancel from '../../../../img/bx-x.svg'
import iIcon from '../../../../img/bx-image-add.svg'
export const InFileAvaCard = ({ ...props }) => {

    const {
        handle
    } = props

    const fileRef = useRef() //якорь InputFile
    // привязка ref к видимому div элементу
    const handleRefInputFile = (e) => {
        fileRef.current.click()
    }
    // показ превьюшки
    const [previewImg, setPreviewImg] = useState()
    let previewFile = new FileReader()
    previewFile.onloadend = () => {
        setPreviewImg(previewFile.result)
        console.log('onloadend=', previewImg)
    }
    // сохраняем картинку в state и в переменную превьюшки
    const handleChange = (e) => {
        previewFile.readAsDataURL(e.target.files[0])
        handle(e)
    }
    // удалить картинку
    const handlerCancel = (e) => {
        e.stopPropagation()
        console.log('cancel', e)
        setPreviewImg(null)
        document.getElementById('inputFile').value = null
    }

    return (
        <>
            {/* Видимая часть */}
            <div
                className={style.container}
                onClick={handleRefInputFile}
            >

                {previewImg ?
                    <>
                        <img
                            className={style.image}
                            src={previewImg}
                            alt="Card"

                        />
                        <button className={style.btnCancel} onClick={handlerCancel}>
                            <HandySvg
                                src={iCancel}
                                className={style.iconCancel}
                            />
                        </button>
                    </>
                    :
                    <HandySvg
                        src={iIcon}
                        className={style.icon}
                    />
                }
            </div>

            {/* Невидимая часть - берем от него ref */}
            <input className={style.hiddenInFile}
                id='inputFile'
                type="file"
                ref={fileRef}
                onChange={handleChange}
            />

        </>
    )
}