import React, { useState, useEffect, useContext } from 'react'
import { MyLogin } from '../components/Login/MyLogin'
import { userContext } from '../context/user.context'
import { useHttp } from '../hooks/http.hook'

function Login() {
    // ввод пользователя
    const [form, setForm] = useState(
        {
            login: 'qwe', password: '123'
        })

    // хук api - отправка запроса на сервер
    const { loading, error, clearError, request } = useHttp()

    //подключаем контекст - глобальных данных 
    const user = useContext(userContext)
    //const [isAuth, setIsAuth, userId, userName] = useContext(userContext)

    //  обработчки ввода данных
    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // Событие: запрос на сервер - регистрация
    const registerHandler = async () => {
        try {
            const data = await request('/api/user/register', 'POST', { ...form })
            console.log(data, typeof (data))
        } catch (error) { }
    }

    // Событие: запрос на сервер - login
    const loginHandler = async () => {
        try {
            const data = await request('/api/user/login', 'POST', { ...form })
            // сохранение данных в контекст
            user.setUserState({
                ...user.userState,
                ['id']: data.client.id,
                ['name']: data.client.login,
                ['isAuth']: true,
                ['role']: data.client.role
            })

        } catch (error) { }
    }

    // фоновое обновление - dev    
    useEffect(() => {
        console.log('User entered =', user.userState)
    }, [user.userState])
    console.log(form)
    return (
        <div style={{ height: '90vh' }}>



            <MyLogin
                changeHandler={changeHandler}
                loginHandler={loginHandler}
                registerHandler={registerHandler}
            />

        </div>
    )
}

export default Login