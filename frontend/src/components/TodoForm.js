import React, {useState, useEffect, useRef} from 'react'

function TodoForm(props) {
const [input, setInput] = useState(props.edit ? props.edit.value : '');

const inputRef = useRef(null);

useEffect(() => {
    inputRef.current.focus();
  });

const handleChange = e => {
    setInput(e.target.value)
}

const handleSubmit = e => {
    e.preventDefault();
    if (props.edit){
        props.onSubmit({
            id: props.edit.id,
            user: "user",
            text: input,
            check: props.edit.check
        });
    } else {
        props.onSubmit({
            user: "user",
            text: input,
            check: false
        });
    }

    setInput('')

};

    return (
        <form className='todo-form' onSubmit={handleSubmit}>
            {props.edit ? (
        <>
          <input
            placeholder='Update your task...'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add new task...'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
        </form>
    )
}

export default TodoForm
