import React , {createContext , useState} from 'react'

export const TodoListCOntext = createContext();

const TodoListContextProvider = ({children}) => {

   const [todos, setTodos] = useState([{text : 'Learn Hooks' , id : 1}]);

   const addTodo = (todo) => {
    console.log(todo);
    setTodos([...todos , {text : todo , id : Date.now()}]);
   }

   const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => {
      return todo.id !== Number(id);
    }))
   }
    
  return (
    <TodoListCOntext value={{todos , addTodo ,deleteTodo}} >
        {children}
    </TodoListCOntext>
  )
}

export default TodoListContextProvider