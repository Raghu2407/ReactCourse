import React , {createContext  , useReducer} from 'react'
import { todosReducer } from '../reducers/todoReducers';

export const TodoListCOntext = createContext();



const TodoListContextProvider = ({children}) => { 
   const [todos , dispatch] =  useReducer(todosReducer ,[{text : 'Learn Hooks' , id : 1}]);

   
    
  return (
    <TodoListCOntext value={{todos , dispatch }} >
        {children}
    </TodoListCOntext>
  )
}

export default TodoListContextProvider