import React, { useContext } from "react";
import { ColorContext } from "../../pages/TestPage";
import { Color } from "./Color";
import { useColors } from "./colors.hook";


export const ColorList = () => {
    const { colors } = useColors()
    console.log(colors)
    return (
        colors.map(color => (<Color key={color.id} {...color} />))
    )
}
