import React, { useState } from 'react'
import iLogo from '../../../../img/bxs-edit-alt.svg'

export const EditCard = () => {
    const [img, setImg] = useState(iLogo)
    // console.log('icon = ', icon)
    return (
        <div>

            {/* <input type="image" src={icon}></input> */}

            <img src={img} alt='icon' />
            <input
                type="file"
                src={iLogo}
                onChange={(e) => {
                    // setImg(e.target.files[0])
                    console.log(__dirname, img)
                }} />

        </div>
    )
}