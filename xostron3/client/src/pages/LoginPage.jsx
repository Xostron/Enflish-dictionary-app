import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../context/user.context'
import { useHttp } from '../hooks/http.hook'

function Login() {
    // ввод пользователя
    const [form, setForm] = useState(
        {
            login: '', password: ''
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
            <input
                type="text"
                placeholder='Введите логин'
                name='login'
                onChange={changeHandler}
            />
            <input
                type="text"
                placeholder='Введите пароль'
                name='password'
                onChange={changeHandler}
            />
            <button
                onClick={loginHandler}
                disabled={user.isAuth}
            >
                Войти
            </button>
            <button
                onClick={registerHandler}
            >
                Зарегистрироваться
            </button>
        </div>
    )
}

export default Login