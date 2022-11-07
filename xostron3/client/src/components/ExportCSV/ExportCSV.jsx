import React from 'react'
import { CSVLink, CSVDownload } from 'react-csv'


export const ExportCSV = ({ csvData, fileName }) => {
    return (
        <button variant="warning">
            <CSVLink data={csvData} filename={fileName}>Export</CSVLink>
        </button>
    )
}

//Срабатывает в фоне как useEffect
export const ExportCSVdwnl = ({ csvData }) => {
    return (
        <button variant="warning">
            Download
            <CSVDownload data={csvData} target='_blank' />
        </button>
    )
}