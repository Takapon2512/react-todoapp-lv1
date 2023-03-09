import React from "react";

export const EndTodos = ({ todos, onClickBack, onClickDeleteEnd }) => {
    
    return (
        <>
        <div className="endjob-area">
            <h2>完了したタスク</h2>
            <ul className="job-list">
                {
                    todos.map((todo, index) => {
                        return (
                            <li key={todo.id} className="job">
                                <p>{todo.title}</p>
                                <button onClick={() => onClickBack(index)}>戻す</button>
                                <button onClick={() => onClickDeleteEnd(index)}>削除</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
        </>
    )
}