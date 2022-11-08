import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { InFileAvaCard } from '../../components/UI/InputFile/InFileAvaCard/InFileAvaCard'
import { MyRowIconBtn } from '../../components/UI/MyRowIconBtn/MyRowIconBtn'
import { FormCard } from '../../components/FormCard/FormCard'
import iAdd from '../../img/bx-plus.svg'
import iAva from '../../img/bx-image-add.svg'

import style from './OneCardEditCreatePage.module.css'
import { ItemFormWord } from '../../components/UI/Word/Edit/ItemFormWord'

const hostUrl = '/upload'


function OneCardEditPage() {
    const history = useNavigate()
    const { loading, error, clearError, request } = useHttp()
    const [selectedFile, setSelectedFile] = useState(null)
    const [imageFrom, setImageFrom] = useState()
    // Массив слов
    let [dict, setDict] = useState([
        {
            word: 'Lorem Ipsum',
            transcription: 'Lorem Ipsum',
            translate: ['Lorem Ipsum'],
            example: 'Lorem Ipsum',
            img: '',
            visible: ''
        },
        {
            word: 'Lorem Ipsum Lorem Ipsum',
            transcription: 'Lorem Ipsum',
            translate: ['Lorem Ipsum', 'Lorem Ipsum'],
            example: 'Lorem Ipsum',
            img: '',
            visible: ''
        },

    ])

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('please select file')
            return
        }

        const formData = new FormData()
        formData.append('image', selectedFile)
        console.log('aaa = ', formData)

        try {
            const data = await request('/api/card/create',
                'POST',
                formData
            )

            // const res = await fetch('/api/card/upload', {
            //     method: 'POST',
            //     body: formData,
            // })

            // const data = await res.json()
            console.log('ANSWER = ', data)

            setImageFrom(data)
            // const myImg = lazy(import(`${data.filePath}`).default)
        } catch (error) { console.log(error) }

    }

    const handleChange = (e) => { setSelectedFile(e.target.files[0]) }

    const handlerToPage = () => { history('/card/:id/add') }

    return (
        <div className={style.container}>

            <FormCard handle={handleChange} />


            {/* <button onClick={handleUpload}>UPLOAD</button> */}

            <MyRowIconBtn
                icon={iAdd}
                onClick={handlerToPage}
            >
                Добавить слова
            </MyRowIconBtn>

            {dict && Object.values(dict).map((value, idx) => {
                return (
                    <ItemFormWord
                        key={idx}
                        idx={idx}
                        value={value}
                        icon={''}
                        dict={dict}
                        setDict={setDict}
                    />
                )
            })}

            {/* {
                selectedFile && (
                    <ul>
                        <li> Name: {selectedFile.name}</li>
                        <li> Type: {selectedFile.type}</li>
                        <li> Size: {selectedFile.size}</li>
                        <li> Date: {selectedFile.lastModifiedDate.toLocaleDateString()}</li>
                    </ul>
                )
            }
            <strong>uploaded file: </strong>
            {imageFrom && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {imageFrom.fileName}
                    <strong>Из сервера</strong>
                    <img src={process.env.REACT_APP_API_URL + imageFrom.fileName} alt="logo" width='250' height='150' />



                </div>
            )} */}







        </div>
    )
}

export default OneCardEditPage