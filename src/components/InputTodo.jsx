import React from "react";



// export const InputTodo = ({ todoText, onChange, onKeyDown, onClick }) => {
//     // 引数で受け取った時点で分割代入する上記のような記述でもいいかもしれません！
//     // やっていることはたかぽんさんのコードと同じです！

export const InputTodo = ({ todoText, isEmptyInput, onChange, onKeyDown, onClick }) => {

    const attention = {
        color: 'rgb(247, 11, 11)',
        fontSize: '1.5rem',
        fontWeight: '500',
        marginLeft: '18px',
        marginTop: '16px'
    }
    //これはcssファイルに書くべきかもしれませんが、使ってみようと思い、ここでスタイルをあてました(by たかぽん)

    return (
        <>
        <div className="input-area">
            <div className="input-area-inner">
                <input 
                type="text" 
                placeholder="ToDoを入力してください"
                value={todoText}
                onChange={onChange}
                onKeyDown={onKeyDown}
                />
                <button onClick={onClick}>追加</button>
            </div>

            {
                isEmptyInput ? (
                    <p style={attention}>ToDoの入力欄が空です</p>
                ) : (
                    <>
                    </>
                )
            }
        </div>
        </>
    )
}