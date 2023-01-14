import * as XLSX from 'xlsx';
import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ExportCSV, ExportCSVdwnl } from '../../components/ExportCSV/ExportCSV'
import { userContext } from '../../context/user.context'
import { useHttp } from '../../hooks/http.hook'
import { TableHeader } from '../../components/Table/TableHeader';
import { TableRow } from '../../components/Table/TableRow';
import { replaceInput, sortWords } from '../../utils/UserFunction'
// import { Subtitle2 } from '../../components/UI/Subtitle/Subtitle2';
import { SetLinkOrBtn } from '../../components/SetLinkOrBtn/SetLinkOrBtn';
import iAdd from '../../img/bx-plus.svg'
import iBack from '../../img/svg/Vector-89.svg'
import iTrend from '../../img/bx-line-chart.svg'
import iTrain from '../../img/bx-joystick.svg'
import iMain from '../../img/bx-heart.svg'


const fileName = ''

function StatisticPage() {
    const history = useNavigate()
    //Подключаем хук для API запросов на backend    
    const { loading, error, clearError, request } = useHttp()
    //подключаем глобальные данные об авторизованном пользователе
    const user = useContext(userContext)
    //Сохраняем в dict импортированные слова с excel
    const [dict, setDict] = useState(
        [{
            word: '',
            transcription: '',
            translate: [],
            example: '',
            img: ''
        }]
    )
    const btnItems = [
        { name: 'Слова', to: `/editWords/main`, icon: iMain, type: 'st', disabled: 0 },
        { name: 'Тренировка', to: `/training`, icon: iTrain, type: 'st', disabled: 0 },
        { name: 'Статистика', to: `/admin`, icon: iTrend, type: 'st', disabled: 0 },

    ]
    useEffect(() => {
        if (dict.length === 0) setDict([{
            word: '',
            transcription: '',
            translate: [],
            example: '',
            img: ''
        }])
    }, [dict])

    // кнопка импорта - чтение excel 
    const readExcelHandler = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(file)
            fileReader.onload = (e) => {
                const bufferArray = e.target.result
                const wb = XLSX.read(bufferArray, { type: 'buffer' })
                const wsname = wb.SheetNames[0]
                const ws = wb.Sheets[wsname]
                const data = XLSX.utils.sheet_to_json(ws)
                resolve(data)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
        promise.then((data) => {
            const arr = data.map((value) => {
                return (
                    {
                        word: replaceInput(value.word),
                        transcription: value.transcription,
                        translate: replaceInput(value.translate).split(',').map((el) => { return (el.replace(/^\s+/g, '')) }),
                        example: value.example
                    }
                )
            })
            // console.log('++++++data+++++', arr)

            setDict(arr)
        })
    }
    //фильтр по уникальному полю word
    const filterDict = () => {
        const ori = Object.values(dict)//исходный массив
        //на основе исходного массива - только с полем word
        const arr = ori.map((val) => { return val.word })
        let resWord = [] //отфильтрованный массив (arr[i] = 'word')
        let resIdx = [] //отфильтрованный массив (index)
        //фильтр
        arr.forEach((val, idx) => {
            if (!resWord.includes(val) && val != '') {
                resWord.push(val)
                resIdx.push(idx)
            }
        })
        //формируем новый массив по индексам отфильтрованного и элементам исходного
        let result = resIdx.map((val, idx) => {
            return ori[val]
        })

        if (result.length === 0) {
            result.push({
                word: '',
                transcription: '',
                translate: [],
                comment: '',
                img: ''
            })
        }
        return result
    }
    //Отфильтровать список слов по кнопке 
    // (удалить схожие слова по полю word, и пустые строчки)
    const filterDictHandler = () => {
        const arr = filterDict()
        setDict({ ...arr })
    }
    //сортировка по word, по translate
    function getSortedWords(dict, sort) {
        let arr = sortWords(dict, sort)
        setDict({ ...arr })
        // return arr
    }
    //Чтение слов в БД
    const ReadHandler = async () => {
        // const link = {
        //     create_date: new Date(),
        //     last_repeat_date: null,
        //     repeat_count: 0,
        //     correct_count: 0,
        //     ratio: 0,
        //     login_id: user.userState.id,
        //     login_code_access: user.userState.code_access
        // }
        // let arr = { ...filterDict() }
        // setDict(arr)
        // console.log('save2', dict, arr)
        try {
            const words = await request(
                '/api/dicteng/read',
                'GET', null
            )
            console.log(words.message)
            setDict(words.message)
        } catch (error) { }
    }
    //Сохранение слов в БД
    const CreateHandler = async () => {
        const link = {
            create_date: new Date(),
            last_repeat_date: null,
            repeat_count: 0,
            correct_count: 0,
            ratio: 0,
            login_id: user.userState.id,
            login_code_access: user.userState.code_access
        }
        let arr = { ...filterDict() }
        setDict(arr)
        console.log('create value =', dict, arr)
        // try {
        //     const testReq = await request('/api/dicteng/create',
        //         'POST',
        //         { arr })
        // } catch (error) {

        // }
    }
    //Чтение по id
    const ReadIdHandler = async () => {
        const id = 9
        try {
            const word = await request(
                `api/dicteng/read/${id}`,
                'GET', null
            )
            console.log(word)
        } catch (error) { }
    }
    //удалить слова/слово
    const DeleteHandler = async () => {
        let arr = { ...filterDict() }
        try {
            const words = await request(
                `api/dicteng/delete`,
                'DELETE', { arr }
            )
            console.log('Delete!')
        } catch (error) { }
    }
    // Обновить слова/слово
    const UpdateHandler = async () => {
        let arr = { ...filterDict() }
        try {
            const words = await request(
                `api/dicteng/update`,
                'PUT', { arr }
            )
            console.log('Update!')
        } catch (error) { }
    }
    const testDwnl = async () => {
        try {
            const word = await request(
                `api/excelExport/export`,
                'GET', null
            )
            console.log(word)
        } catch (error) { }
    }
    // ***************************************

    return (
        <>
            {/* <Subtitle2
                icon1={iBack}
                icon2={iAdd}
                handler1={() => { history(-1) }}
                handler2={() => { }}
                title={'Мои слова'}
                text={Object.values(dict).length}>
                <SetLinkOrBtn items={btnItems} />
            </Subtitle2> */}
            <div>
                <strong>Administration</strong>
            </div>
            <button onClick={testDwnl}>
                Download BaseToExcel
            </button>
            <div>
                {dict && <ExportCSV csvData={Object.values(dict)} fileName={fileName} />}
            </div>

            <div>
                <input
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files[0]
                        readExcelHandler(file)
                    }}
                />

            </div>

            {/* <FormWordV2 save={saveHandler} word={word} setWord={setWord} /> */}

            <div>
                <button
                    disabled={(dict && Object.values(dict).length > 1) ? false : true}
                    onClick={filterDictHandler}
                >Отфильтровать
                </button>
                <button
                    disabled={(dict && Object.values(dict).length > 1) ? false : true}
                    name={'word'}
                    onClick={({ target }) => { getSortedWords(dict, target.name) }}
                >
                    Сортировать по имени
                </button>
                <button
                    disabled={(dict && Object.values(dict).length > 1) ? false : true}
                    name={'translate'}
                    onClick={({ target }) => { getSortedWords(dict, target.name) }}
                >
                    Сортировать по переводу
                </button>

                <button
                    onClick={ReadHandler}
                >
                    {'Прочитать всё'}
                </button>

                <button
                    onClick={CreateHandler}
                >
                    TEST CREATE
                </button>

                <button
                    onClick={ReadIdHandler}
                >
                    TEST Read ID
                </button>

                <button
                    onClick={DeleteHandler}
                >
                    TEST Delete ID
                </button>

                <button
                    onClick={UpdateHandler}
                >
                    TEST Update
                </button>

                <table>
                    <TableHeader />
                    <tbody>
                        {dict && Object.values(dict).map((row, index) => {
                            // console.log('render')
                            return (<TableRow
                                key={index}
                                row={row}
                                index={index}
                                setDict={setDict}
                                dict={dict}
                            />)
                        })}


                    </tbody>
                </table>
            </div>

            {/* <FormWord save={ToSaveServerHandler} word={word} setWord={setWord} trl={trl} setTrl={setTrl}></FormWord> */}
        </>
    )
}

export default StatisticPage