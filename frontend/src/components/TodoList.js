import React, { useState, useEffect } from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'

function TodoList() {
    const[todos, setTodos] = useState([])

    const addTodo = todo => {

    const newTodos = [todo, ...todos]

    setTodos(newTodos)

    const requestInit = {
        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    }

    fetch("http://localhost:3001/api/tasks", requestInit)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err)) 
    
    window.location = window.location.href

    };

    useEffect(() => {
        const getTasks = () => {
            fetch("http://localhost:3001/api/tasks")
            .then(res => res.json())
            .then(res => setTodos(res))
        }
        getTasks()
    }, [])

    const updateTodo = (todoId, newValue) => {
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue: item)))
    }

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)
        const delItem = [...todos].find(todo => todo.id === id)

        const requestInit = {
            method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(delItem)
        }
    
        fetch("http://localhost:3001/api/tasks/delete", requestInit)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err)) 
        
        setTodos(removeArr)
    }

    const completeTodo = tasks => {

        const requestInit = {
            method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(tasks)
        }
    
        fetch("http://localhost:3001/api/tasks/checked", requestInit)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err)) 
        

        let updatedTodos = todos.map(todo => {
            if (todo.id === tasks.id) {
                todo.check = !todo.check
            }
            return todo
        })
        setTodos(updatedTodos);
    }

    return (
        <div>
            <h1>What's the Plan for Today?</h1>
            <TodoForm onSubmit={addTodo}/>
            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
        </div>
    );
}

export default TodoList
