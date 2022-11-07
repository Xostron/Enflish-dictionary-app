import * as XLSX from 'xlsx';
// Фильтрует строку от некоторых спецсимволов
export function replaceInput(val) {
    let strVal = String(val)
    strVal = strVal.replace(/[^a-zа-яё0-9\,\-\+\s]/gi, '').
        replace(' ,', ',').
        replace('  ', ' ').
        replace(',,', ',')
    return strVal
}
// strVal = strVal.replace(/[^a-zа-яё0-9\,\-\+\s]/gi, '').
//         replace(' ,', ',').
//         replace('  ', ' ').
//         replace(',,', ',')
export function sortWords(objList, sortName) {
    let arr = Object.values(objList)
    arr.sort((a, b) => {
        return replaceInput(a[sortName]).localeCompare(replaceInput(b[sortName]))
    })
    return arr
}

// прочитать excel file в arr (массив объектов)
export const readExcel = (file, setDict) => {
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
        setDict(arr)
    })

}

//фильтр по уникальному полю word
export const filterDict = (obj) => {

    const ori = Object.values(obj)//исходный массив

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


export const getIsMobile = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        return true
    }
    return false
}