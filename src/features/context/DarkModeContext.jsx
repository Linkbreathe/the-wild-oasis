import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState"

const DarkModeContext = createContext()

function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(true, "isDarkMode")
    useEffect(function(){
        if(isDarkMode){
            document.documentElement.classList.add("dark-mode")
            document.documentElement.classList.remove("light-mode")
        }else{
            document.documentElement.classList.add("light-mode")
            document.documentElement.classList.remove("dark-mode")
        }
    })
    function toggleDarkMode() {
        setIsDarkMode(isDarkMode => !isDarkMode)
    }
    return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        {children}
    </DarkModeContext.Provider>
}
function useDarkMode() {
    // the context storing the value of isDarkMode and toggleDarkMode
    const context = useContext(DarkModeContext)
    if (context === undefined)
        throw new Error("using outside of DarkModeContext Provider")
    return context
}
export {DarkModeProvider,useDarkMode}