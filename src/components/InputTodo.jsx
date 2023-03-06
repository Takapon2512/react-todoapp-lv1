import React from "react";



// export const InputTodo = ({ todoText, onChange, onKeyDown, onClick }) => {
//     // 引数で受け取った時点で分割代入する上記のような記述でもいいかもしれません！
//     // やっていることはたかぽんさんのコードと同じです！

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