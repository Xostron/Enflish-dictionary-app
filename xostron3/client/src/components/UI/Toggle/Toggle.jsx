import React, { useState, useContext } from 'react'
import './Toggle.css'

export const Toggle = ({ name, handler }) => {

    return (
        <div className="switch">
            <input name={name} type="checkbox" onClick={handler} />
        </div>
    )
}