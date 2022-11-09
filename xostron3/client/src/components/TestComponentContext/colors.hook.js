import React, { createContext, useContext, useState } from "react";
import colorsData from './color-data.json'

const ColorContext = createContext()



export const ColorProvider = ({ children }) => {
    const [colors, setColors] = useState(colorsData)
    return (
        <ColorContext.Provider value={{ colors, setColors }}>
            {children}
        </ColorContext.Provider>
    )
}

export const useColors = () => useContext(ColorContext)