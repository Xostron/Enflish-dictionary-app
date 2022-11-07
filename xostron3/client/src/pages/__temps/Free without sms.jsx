import * as XLSX from 'xlsx';
import React, { useEffect, useState, useCallback, useContext } from 'react'
import { ExportCSV, ExportCSVdwnl } from '../../components/ExportCSV/ExportCSV'
import { userContext } from '../../context/user.context'
import { useHttp } from '../../hooks/http.hook'
import { FormWord } from '../../components/FormWord/FormWord';
import { TableHeader } from '../../components/Table/TableHeader';
import { TableRow } from '../../components/Table/TableRow';
import { TableCell } from '../../components/Table/TableCell';
const fileName = ''


function Admin() {
    //Подключаем хук для API запросов на backend
    const { loading, error, clearError, request } = useHttp()

    // const [words, setWords] = useState(null)
    //Сохраняем в dict импортированные слова с excel
    const [dict, setDict] = useState(null)

    // const [word, setWord] = useState({
    //     word: '',
    //     transcription: '',
    //     translate: [],
    //     comment: ''
    // })
    //поле translate на форме 
    // const [trl, setTrl] = useState([''])

    // const getWords = async () => {
    //     const words = await request('/api/excel/export', 'GET', null)
    //     console.log(words)
    // }

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(file)
            fileReader.onload = (e) => {
                const bufferArray = e.target.result

                const wb = XLSX.read(bufferArray, { type: 'buffer' })
                const wsname = wb.SheetNames[0]
                const ws = wb.Sheets[wsname]

                const data = XLSX.utils.sheet_to_json(ws)
                console.log('data = ', data)
                resolve(data)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
        promise.then((data) => {
            setDict(data)
        })
    }


    // const ToSaveServerHandler = async () => {
    //     try {
    //         const importData = await request('/api/engdict/saveWords', 'POST', { ...word })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    //запись в форму словаря по изменению useState trl
    // useEffect(() => {
    //     setWord({ ...word, translate: [...trl] })
    // }, [trl])


    return (
        <>
            <div><strong>Administration</strong></div>

            {/* <div><button
                onClick={getWords}
            >
                Export to xlsx server</button>
            </div> */}
            <div>
                {dict && <ExportCSV csvData={dict} fileName={fileName} />}
                {/* {dict && <ExportCSVdwnl csvData={dict} />} */}
            </div>

            <div>
                <input
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files[0]
                        readExcel(file)
                    }}
                />
            </div>

            <div>
                <table>

                    <TableHeader />
                    <tbody>
                        {dict && dict.map((word, index) => {

                            return (
                                < TableRow key={index} elem={word} index={index + 1} />)
                        })}
                    </tbody>
                </table>







            </div>

            <FormWord save={ToSaveServerHandler} word={word} setWord={setWord} trl={trl} setTrl={setTrl}></FormWord>
        </>
    )
}

export default Admin