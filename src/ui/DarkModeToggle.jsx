import React from 'react'
import ButtonIcon from "../ui/ButtonIcon"
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import { useDarkMode } from '../features/context/DarkModeContext'
export default function DarkModeToggle() {
    const {isDarkMode,toggleDarkMode} = useDarkMode()
    return (
    <ButtonIcon onClick={toggleDarkMode}>
        {
            isDarkMode ? <HiOutlineSun/> : <HiOutlineMoon/>
        } 
    </ButtonIcon>)
}
