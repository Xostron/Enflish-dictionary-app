import React, { useEffect, useState, useContext } from 'react'
import style from './ItemFormWord.module.css'
import { FormWordV1 } from '../FormWord/FormWordV1'
import { FormWordV0 } from '../FormWord/FormWordV0'
import { useHttp } from '../../../../hooks/http.hook'
import { userContext } from '../../../../context/user.context'
import { SetLinkOrBtn } from '../../../SetLinkOrBtn/SetLinkOrBtn'
import iDel from '../../../../img/bx-trash-alt.svg'
import iEdit from '../../../../img/bx-edit-alt.svg'
import iSave from '../../../../img/bxs-save.svg'
import iBack from '../../../../img/bx-undo.svg'

export const ItemFormWord = ({ item, onCheck = false }) => {
    // ***********************************Деструктуризация props******************************
    const {
        idx,
        value,
        icon,
        btnItemsV0,
        btnItemsV1,
        dict,
        setDict,
        v1
    } = item

    const {
        changeHandler,
        changeHandlerTrl,
        handlerAddDel
    } = v1

    // **********************************Структуризация для компонента FormWordV1***************
    const propsV1 = {
        icon,
        value,
        changeHandler,
        changeHandlerTrl,
        handlerAddDel,
        idx,
        onCheck
    }


    return (
        <div className={style.wrapper}>

            {value.visible
                ?
                // для редактирования 
                <FormWordV1
                    obj={propsV1}
                >
                    <SetLinkOrBtn items={btnItemsV1(idx, value.id)} />
                </FormWordV1>
                :
                // для чтения
                <FormWordV0
                    icon={icon}
                    word={value}
                    onCheck={onCheck}
                >
                    <SetLinkOrBtn items={btnItemsV0(idx, value.id)} />
                </FormWordV0>
            }
        </div>
    )
}