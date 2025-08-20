import React, { useContext } from 'react'
// React nalli useState hook na import madkondu ide state handle madoke
import { useState } from 'react'
import { ThemeContext } from "../contexts/ThemeComponent";
import { AuthContext } from '../contexts/AuthContext';



const TodoList = () => {
  const { theme, } = useContext(ThemeContext);
  const { isLoggedIn, changeAuthState } = useContext(AuthContext);
  // todos -> tasks list store madoke
  // setTodos -> tasks na update madoke
  // initial state -> ond task already ide
  const [todos, setTodos] = useState([
    { id: 1, text: "Get Up at @ 6:00AM", completed: true }
  ]);

  // text -> input box nalli user type madiddu store agutte
  // setText -> input value update madoke
  const [text, setText] = useState("");

  // New task add madoke function
  const addTodo = () => {
    if (!text.trim()) return; // empty task add agalla
    setTodos([...todos, { id: Date.now(), text, completed: false }]); // hosa task add madutte
    setText(""); // input box reset madutte
  };

  // Task complete aagide anta toggle madoke
  const toggleTodo = (id) =>
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed } // complete <-> incomplete toggle
          : todo
      )
    );

  // Task delete madoke
  const deleteTodo = (id) =>
    setTodos(todos.filter((todo) => todo.id !== id));
  return (
    <div className={`min-h-screen bg-gray-100 flex justify-center p-6 ${theme}`}>
      <div className="w-full max-w-md">
        <div className='flex flex-col content-center flex-wrap'>
          <h1>Welcome to My App</h1>
          {isLoggedIn ? (
            <>
              <p className='text-2xl'>You are logged in ✅</p>
              <button onClick={changeAuthState}>Logout</button>
            </>
          ) : (
            <>
              <p className='text-2xl'>You are logged out ❌</p>
              <button onClick={changeAuthState}>Login</button>
            </>
          )}
        </div>
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-center">Todo App ✅</h1>

        {/* Input Box + Add button */}
        <div className="flex gap-2 mb-4">
          <input
            value={text} // input box nalli store agide
            onChange={(e) => setText(e.target.value)} // typing -> state update
            onKeyDown={(e) => e.key === "Enter" && addTodo()} // enter key -> addTodo()
            placeholder="Add a new task..."
            className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTodo} // button click -> task add agutte
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-2">
          {/* Empty list case */}
          {todos.length === 0 && (
            <li className="text-gray-500 text-center">No tasks yet. Add one!</li>
          )}

          {/* Tasks loop madoke */}
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-white shadow rounded-lg px-4 py-2"
            >
              {/* Task text (click madidre toggle complete agutte) */}
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`cursor-pointer ${todo.completed ? "line-through text-gray-400" : ""
                  }`}
              >
                {todo.text}
              </span>

              {/* Delete button */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoList