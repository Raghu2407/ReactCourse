import React , {useContext} from 'react'
import { ThemeContext } from "../contexts/ThemeComponent";


const Navbar = () => {
  const {toggleTheme ,icon } = useContext(ThemeContext);
  return (
    <div >Navbar

<button onClick={toggleTheme}>Toggle Theme {icon}</button>
    </div>
  )
}

export default Navbar