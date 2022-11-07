import React from "react";
import { BtnIcon } from "../UI/Button/btn-icon/BtnIcon";
import { InputBtnImg } from "../UI/Button/input-file/InputBtnImg";
import { LinkIcon } from "../UI/Button/link-icon/LinkIcon";


export const SetLinkOrBtn = ({ items }) => {
    // const {
    //     name,
    //     to,
    //     icon,
    //     type,
    //     handler,
    //     disabled
    // } = items

    return (
        <>
            {items.map((item, idx) => {
                // navigation link
                if (item.type === 'link') {
                    return (<LinkIcon key={idx} item={item} />)
                }
                else if (item.type === 'button') {
                    // button
                    return (
                        <div key={idx} style={{ paddingLeft: '.5rem' }}>
                            <BtnIcon
                                item={item}
                            />
                        </div>

                    )
                }
                else if (item.type === 'input-file') {
                    return (<InputBtnImg key={idx} obj={item} />)
                }
                // text
                else { return (<span key={idx} style={{ fontSize: '.85rem' }}>{item.name}</span>) }
            })}
        </>
    )
}