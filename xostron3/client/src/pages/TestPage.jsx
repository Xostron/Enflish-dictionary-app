import React from "react";
import { useState, createContext } from "react";
import { BtnIcon } from '../components/UI/Button/btn-icon/BtnIcon'
import iF from '../img/bxl-react.svg'
import iS from '../img/bxl-redux.svg'
import colors from '../components/TestComponentContext/color-data.json'
import { ColorList } from "../components/TestComponentContext/ColorList";
import { ColorProvider } from "../components/TestComponentContext/colors.hook";




export default function TestPage() {





    return (
        <>
            <ColorProvider>
                TestPage
                <div style={{ display: 'flex', flexDirection: 'column' }}>



                    <ColorList />

                </div>
            </ColorProvider>
        </>
    )
}