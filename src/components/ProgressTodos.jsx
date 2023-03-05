import React from "react";

export const ProgressTodos = (props) => {
    const { 
        todos, 
        onClickNotstartedBack,
        onClickEnd,
        onClickDeleteProgress 
    } = props
    return (
        <>
        <div className="job-area">
            <h2>現在進行中のタスク</h2>
            <ul className="job-list">
                {
                    todos.map((todo, index) => {
                        return (
                            <li key={todo.id} className="job">
                                <p>{todo.title}</p>
                                <button onClick={() => onClickNotstartedBack(index)}>戻す</button>
                                <button onClick={() => onClickEnd(index)}>完了</button>
                                <button onClick={() => onClickDeleteProgress(index)}>削除</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
        </>
    )
} 