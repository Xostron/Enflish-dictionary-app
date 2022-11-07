import React, { useState, Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { userContext } from './context/user.context';
import { ThemeProvider } from 'styled-components'
import { LightTheme, DarkTheme, ThemeWrapper, GlobalStyles } from './Theme'
import { Pages } from './routes/Routes';
import Layout from './pages/Layout';
import './App.css'


const pages = Pages
function App() {
  //useContext - глобальные данные
  const [userState, setUserState] = useState({
    id: null,
    name: '',
    isAuth: false,
    role: null
  })
  const [viewTrainLearning, setViewTL] = useState(1)
  const [activeModal, setActiveModal] = useState(false)
  const [theme, setTheme] = useState('light')
  const [updatePage, setUpdatePage] = useState(false)
  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  const [username, setUsername] = useState('Guest')

  return (
    <ThemeProvider theme={(theme === 'light') ? LightTheme : DarkTheme}>
      <userContext.Provider value={{
        userState,
        setUserState,
        theme,
        toggleTheme,
        setUpdatePage,
        updatePage,
        username,
        setUsername,
        viewTrainLearning,
        setViewTL,
        activeModal,
        setActiveModal
      }}>
        <GlobalStyles />
        <ThemeWrapper>

          <BrowserRouter>

            <Suspense fallback={<div>Loading...</div>}>



              <main>
                <Routes>

                  <Route element={<Layout />} path='/' >
                    {pages.map(({ path, element, exact }) =>
                      <Route key={path} path={path} element={element} exact={exact} />
                    )}
                    <Route path="*" element={<Navigate replace to="login" />} />
                  </Route>

                </Routes>
              </main>

            </Suspense>
          </BrowserRouter>

        </ThemeWrapper>
      </userContext.Provider>
    </ThemeProvider>
  );
}

export default App;
