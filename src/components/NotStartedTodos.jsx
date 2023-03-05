import React from "react";

export const NotStartedTodos = (props) => {
    const { 
        todos, 
        editingTodoText, 
        onChange, 
        onClickEditing, 
        onEditingMode,
        onClickJob,
        onClickDeleteNotStarted } = props
    return (
        <>
        <div className="notstajob-area">
                    <h2>未着手のタスク</h2>
                    <ul className="job-list">
                        {
                            todos.map((todo, index) => {
                                return (
                                    <li key={todo.id} className="job">
                                        {todo.isEditing ? (
                                            <>
                                            <input 
                                            type="text"
                                            value={editingTodoText}
                                            onChange={onChange}
                                            />
                                            <button onClick={() => onClickEditing(index)}>編集</button>
                                            </>
                                        ) : (
                                            <>
                                            <p onClick={() => onEditingMode(index)}>{todo.title}</p>
                                            <div className="edit-solid icon"></div>
                                            <button onClick={() => onClickJob(index)}>着手</button>
                                            <button onClick={() => onClickDeleteNotStarted(index)}>削除</button>
                                            </>
                                        )}
                                    </li>
                                )
                            })
                        }
                    </ul>
             </div>
        </>
    )
}