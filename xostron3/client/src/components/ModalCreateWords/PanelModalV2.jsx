import React, { useState, useEffect, useMemo, useContext } from 'react'
import style from './PanelModalV2.module.css'
import iLogo from '../../img/bxs-edit-alt.svg'
import iOpen from '../../img/bx-folder-open.svg'

export const PanelModalV2 = () => {

    return (
        <div className={style.sidebar}>

            <div className={style.logo_content}>
                <img className={style.iLogo} src={iLogo} alt="iLogo" width='32px' height='32px' />
                <div className={style.logo_name}>Excel file</div>
            </div>

            <div className={style.menu_content}>

                <a href='#' className={style.btn_icon}>
                    <img className={style.icon} src={iOpen} alt="iOpen" width='24px' height='24px' />
                    <span className={style.btnName}>Открыть</span>
                    <span className={style.btn_tooltip}>Открыть</span>
                </a>

                <a href='#' className={style.btn_icon}>
                    <img className={style.icon} src={iOpen} alt="iOpen" width='24px' height='24px' />
                    <span className={style.btnName}>Сохранить</span>
                    <span className={style.btn_tooltip}>Сохранить</span>
                </a>

                <a href='#' className={style.btn_icon}>
                    <img className={style.icon} src={iOpen} alt="iOpen" width='24px' height='24px' />
                    <span className={style.btnName}>Очистить</span>
                    <span className={style.btn_tooltip}>Сохранить</span>
                </a>

                <a href='#' className={style.btn_icon}>
                    <img className={style.icon} src={iOpen} alt="iOpen" width='24px' height='24px' />
                    <span className={style.btnName}>Закрыть</span>
                    <span className={style.btn_tooltip}>Сохранить</span>
                </a>

            </div>

        </div>
    )
}