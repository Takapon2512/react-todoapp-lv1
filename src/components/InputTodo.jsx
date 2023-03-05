import React from "react";

export const InputTodo = (props) => {
    const { todoText, onChange, onKeyDown, onClick } = props

    return (
        <>
        <div className="input-area">
            <input 
            type="text" 
            placeholder="ToDoを入力してください"
            value={todoText}
            onChange={onChange}
            onKeyDown={onKeyDown}
            />
            <button onClick={onClick}>追加</button>
        </div>
        </>
    )
}