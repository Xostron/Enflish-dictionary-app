import React from "react";
import style from "./BtnV1.module.css"

export const BtnV1 = ({ children, ...props }) => {
    return (
        <button className={style.container} {...props}>
            {children}
        </button>
    )
}