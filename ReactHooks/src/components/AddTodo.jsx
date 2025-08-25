import React , {useState} from 'react'

const AddTodo = ({addTodo}) => {
    const [todos ,setTodos] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(todos);
        setTodos('');
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className='grid gap-6 mb-6 md:grid-cols-2'>
            <div>
            <label htmlFor='todolist' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Add New Todo</label>
            <input type='text' id='todolist' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500' value={todos} onChange={(e) => setTodos(e.target.value)} />
            </div>
            </div>
            <button type='submit'>submit</button>
        </form>
    </div>
  )
}

export default AddTodo