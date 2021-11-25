import React, {useState} from 'react'
import TodoForm from './TodoForm'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'


function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
    const [edit, setEdit] = useState({
        id: null,
        value: '',
        check: ''
    })

    const submitUpdate = value => {

        const requestInit = {
            method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(value)
        }
    
        fetch("http://localhost:3001/api/tasks/edit", requestInit)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err)) 
        
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: '',
            check: ''
        })
    }

    if (edit.id){
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
    }


    return todos.map((todo, index) => (
        <div className={todo.check ? 'todo-row complete' : 'todo-row'} 
        key={index}
        >
            <div key={todo.id} onClick={() => completeTodo(todo)} className='task-field'>
                {todo.text}
            </div>

        <div className="icons">
            <RiCloseCircleLine onClick={() => removeTodo(todo.id)} className='delete-icon'/>
            <TiEdit onClick={() => setEdit({id: todo.id, value: todo.text, check: todo.check})} className='edit-icon' /> 
        </div>

        </div>

    ))
}

export default Todo
