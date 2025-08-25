import React, { useContext, useState  } from 'react'
// React nalli useState hook na import madkondu ide state handle madoke
import { ThemeContext } from "../contexts/ThemeComponent";
import { AuthContext } from '../contexts/AuthContext';
import { TodoListCOntext } from '../contexts/TodoListCOntext';
import { ListTodo } from 'lucide-react';  


const TodoList = () => {
  // const { todos, addTodo ,deleteTodo } = useContext(TodoListCOntext);
  const { todos ,dispatch } = useContext(TodoListCOntext);
  const { theme, } = useContext(ThemeContext);
  // const { isLoggedIn, changeAuthState, authicon } = useContext(AuthContext);
  const [todo, setTodo] = useState('');
  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // addTodo(todo);
    dispatch({type : 'ADD_TODO' , text: todo})
    setTodo(''); 
  }

  const removeTodo = (e) => {
    const id = e.target.id;
    // deleteTodo(id)
    dispatch({type: 'REMOVE_TODO' , id})
  }


  return (
    <div className={`min-h-screen bg-gray-100 flex justify-center p-6 ${theme}`}>
      <div className="w-full max-w-md">
        <div className='flex flex-col content-center flex-wrap'>
          <h1>Welcome to My App</h1>
          {/* {isLoggedIn ? (
            <>
              <p className='text-2xl flex gap-1 items-center'>You are logged in {authicon}</p>
              <button onClick={changeAuthState}>Logout</button>
            </>
          ) : (
            <>
              <p className='text-2xl flex gap-1 items-center'>You are logged out {authicon}</p>
              <button onClick={changeAuthState}>Login</button>
            </>
          )} */}
        </div>
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-center">Todo App ✅</h1>

        <form className='flex gap-2 mb-4' onSubmit={handleFormSubmit}>
          <input placeholder="Add a new task..." value={todo} className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400" onChange={handleChange} />
          <button type='submit' className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <ListTodo />
          </button>
        </form>

        {/* Todo List */}
        <ul className="space-y-2">


          {todos.length ? (todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-white shadow rounded-lg px-4 py-2"
            >
              {/* Task text (click madidre toggle complete agutte) */}
              <span
                key={todo.id}
                
              >
                {todo.text}
              </span>

              {/* Delete button */}
              {/* <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button> */}

              <button id={todo.id}
                onClick={removeTodo}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          )

          )) : <li className="text-gray-500 text-center">No tasks yet. Add one!</li>}
        </ul>
      </div>
    </div>
  )
}

export default TodoList