import React, { useState, useEffect, useCallback } from 'react'


export const useHttp = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                console.log('not stringify = ', body, typeof (body))
                // body = JSON.stringify(body)//преобразование объекта в json строку
                console.log('stringify = ', body)
                // headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, { method, body, headers })
            const data = await response.json()
            console.log('ok', response.ok)
            console.log('status', response.status)
            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так((')
            }
            setLoading(false)
            return data
        } catch (error) {
            setLoading(false)
            setError(error.message)
            throw error
        }
    }, [])

    const clearError = useCallback(() => { setError(null) }, [])
    return { loading, error, clearError, request }
}