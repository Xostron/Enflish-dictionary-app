import React, { useState } from 'react'
import { useContext } from 'react'
import { Outlet, useMatch } from 'react-router-dom'
import { Menu } from '../components/Navbar/Menu'
import { Navbar } from '../components/Navbar/Navbar'
import { userContext } from '../context/user.context'

export default function Layout() {
    const [activeMenu, setActiveMenu] = useState(false)
    const match = useMatch('')
    const { setActiveModal } = useContext(userContext)
    return (
        <div onClick={() => setActiveModal(false)}>
            <Navbar active={activeMenu} setActive={setActiveMenu} />
            <Menu active={activeMenu} setActive={setActiveMenu} />
            {/* Outlet - здесь рендерятся дочерние роуты, как children*/}
            <Outlet />
        </div>
    )
}