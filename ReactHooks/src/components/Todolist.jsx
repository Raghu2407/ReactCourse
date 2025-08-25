import React , {useState ,useEffect} from 'react'
import AddTodo from './AddTodo'

const Todolist = () => {

    const [todos , setTodos ] = useState([{
        text: 'Learn React', id: 1
      },
      { text: 'Check FR Tickts', id: 2 }]);

      const [count , setCount] = useState(0);


      const addTodo = (text) => {
        setTodos([
            ...todos, {
                text,
                id : new Date()
            }
        ]);
      }

      useEffect(() =>{
        console.log('use effect ' , todos);
      } ,[todos])

  return (
    <div>
        <ul className='role="list" class="divide-y divide-gray-100'>
            {todos.map((todo) => {
                return(
                    <li className='flex justify-between gap-x-6 py-5' key={todo.id}>
                    <div>
                    {todo.text}
                    </div>
                    </li>
                    
                )
            })}
        </ul>
    <AddTodo addTodo={addTodo} />
    <button onClick={() => setCount(count +1)}>Score {count} </button>
    </div>
  )
}

export default Todolist