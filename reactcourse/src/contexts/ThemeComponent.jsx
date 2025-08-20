import React , {Children, createContext, useState} from 'react'
import { Sun, Moon } from 'lucide-react';

export const ThemeContext = createContext();

const ThemeContextProvider = ({children}) => {
    
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

   // derive icon from theme
   const icon = theme === "light" 
   ? <Moon className="w-5 h-5 text-gray-800" />   // 🌙 for light mode
   : <Sun className="w-5 h-5 text-yellow-400" />; // 🌞 for dark mode

  return (
    // Step 2: Provide Context
    <ThemeContext.Provider value={{ theme, toggleTheme ,icon }}>
        {children}
    </ThemeContext.Provider>
  );
}


export default  ThemeContextProvider;