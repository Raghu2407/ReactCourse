import React , {useContext} from 'react';
// Navbar component na import madidira (but ee code nalli use aglilla)
import  {ThemeContext} from './contexts/ThemeComponent'
import TodoList from './components/TodoList.jsx';
import Navbar  from './components/Navbar.jsx';

// App component start agutte
export default function App() {

  const { theme, } = useContext(ThemeContext);
  // JSX UI return madutte
  return (
    <>
      <main className={`${theme} min-h-screen w-full`}>
      
        <header>
          {/* Illi Navbar use madbahudu if needed */}
      
          <Navbar />
      
        </header>

        {/* Background + layout */}
     
        <TodoList />
        
      </main>
    </>
  )
}