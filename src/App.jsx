import React, { useState } from "react";
import { InputTodo } from "./components/InputTodo";
import { NotStartedTodos } from "./components/NotStartedTodos";
import { ProgressTodos } from "./components/ProgressTodos";
import { EndTodos } from "./components/EndTodos";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const App = () => {
    const [todoText, setTodoText] = useState('')
    const [editingTodoText, setEditingTodoText] = useState('')
    const [notstartedTodos, setNotStartedTodos] = useState([])
    const [progressTodos, setProgressTodos] = useState([])
    const [endTodos, setEndTodos] = useState([])

    //インプットボックスにテキストを入れたときに発動
    const onChangeTodoText = (event) => {
        setTodoText(event.target.value)
    }

    //Enterを押下することで、追加ボタンを押したときと同じ処理を行う
    const onPressEnter = (event) => {
        if (event.key === 'Enter') {
            onClickAdd()
        }
    }

    //編集モードのとき、インプットボックスのテキストが変化したときに発動
    const handleEditInputChange = (event) => {
        setEditingTodoText(event.target.value)
    }

    //編集が完了し、ボタンを押したら内容が反映されるようにする
    //その後、編集モードを解除する
    const onEditing = (index) => {
        if (editingTodoText !== '') {
            const newEditingTodos = [...notstartedTodos]
            newEditingTodos[index].title = editingTodoText
            newEditingTodos[index].isEditing = false

            setNotStartedTodos(newEditingTodos)
            setEditingTodoText('')
        } 
    }

    //追加ボタンをクリックしたときに発動
    const onClickAdd = () => {
        //もし、インプットボックスのテキストが空でないなら
        if (todoText !== '') {
            const newTodos = [...notstartedTodos, {
                id: notstartedTodos.length + 1,
                title: todoText,
                isEditing: false
            }]
            setNotStartedTodos(newTodos)

            //追加した後はインプットボックスのテキストを削除
            setTodoText('')
        }
    }

    //Todoタイトルをクリックしたときに編集モードに移行
    const onEditingMode = (index) => {
        const newEditingTodos = [...notstartedTodos]
        newEditingTodos[index].isEditing = true
        setNotStartedTodos(newEditingTodos)
    }

    //着手ボタンをクリックしたときに発動
    const onClickJob = (index) => {
        const newNotStartedJobTodos = [...notstartedTodos]
        const newProgressTodos = [...progressTodos, {
            id: progressTodos.length + 1,
            title: notstartedTodos[index].title
        }]

        newNotStartedJobTodos.splice(index, 1)

        //「未着手のタスク」のidに欠番が生じるため、idをふり直す
        idRewrite(newNotStartedJobTodos)

        setProgressTodos(newProgressTodos)
        setNotStartedTodos(newNotStartedJobTodos)
    }

    //削除ボタンをクリックしたときに発動
    const onClickDeleteNotStarted = (index) => {
        const newNotStartedTodos = [...notstartedTodos]

        //対象のTodoを配列から消去
        newNotStartedTodos.splice(index, 1)
        //消去したことにより、欠番が生じるため、idをふり直す
        idRewrite(newNotStartedTodos)
        setNotStartedTodos(newNotStartedTodos)
    }

    const onClickDeleteProgress = (index) => {
        const newProgressTodos = [...progressTodos]

        //対象のtodoを配列から消去
        newProgressTodos.splice(index, 1)
        //消去したことにより、欠番が生じるため、idをふり直す
        idRewrite(newProgressTodos)
        setProgressTodos(newProgressTodos)
    }

    const onClickDeleteEnd = (index) => {
        const newEndTodos = [...endTodos]

        //対象のtodoを配列から消去
        newEndTodos.splice(index, 1)
        //消去したことにより、欠番が生じるため、idをふり直す
        idRewrite(newEndTodos)
        setEndTodos(newEndTodos)
    }

    //完了ボタンをクリックしたときに発動
    //「現在進行中のタスク」から削除し、「完了したタスク」に追加する
    const onClickEnd = (index) => {
        const newProgressTodos = [...progressTodos]
        const newEndTodos = [...endTodos, {
            id: endTodos.length + 1,
            title: progressTodos[index].title
        }]

        newProgressTodos.splice(index, 1)

        setEndTodos(newEndTodos)
        setProgressTodos(newProgressTodos)
    }

    //戻すボタンをクリックしたときに発動
    const onClickBack = (index) => {
        const newEndTodos = [...endTodos]
        const newProgressTodos = [...progressTodos, endTodos[index]]

        //対象のtodoを消去し、「現在進行中のタスク」に追加する
        newEndTodos.splice(index, 1)
        setProgressTodos(newProgressTodos)
        setEndTodos(newEndTodos)

        //前項の処理により「完了したタスク」と「現在進行中のタスク」でidに欠番および重複が生じるため、idをふり直す
        idRewrite(newEndTodos)
        idRewrite(newProgressTodos)
    }

    const onClickNotstartedBack = (index) => {
        const newProgressTodos = [...progressTodos]
        const newNotStartedTodos = [...notstartedTodos, progressTodos[index]]

        //対象のtodoを消去し、「未着手のタスク」に追加する
        newProgressTodos.splice(index, 1)
        //前項の処理により「現在進行中のタスク」と「未着手のタスク」でidに欠番及び重複が生じるため、idをふり直す
        idRewrite(newProgressTodos)
        idRewrite(newNotStartedTodos)

        setProgressTodos(newProgressTodos)
        setNotStartedTodos(newNotStartedTodos)

    }

    //idのふり直し処理を関数化
    const idRewrite = (Todos) => {
        for (let i = 0; i < Todos.length; i++) {
            Todos[i].id = i + 1
        }   
    }

    return (
        <>
        <Header />
        <section className="contents">
            <div className="menu-area">
                <h2>プロジェクト一覧</h2>
                <ul className="menu-list">
                    <li>プロジェクト1</li>
                    <li>プロジェクト2</li>
                    <li>プロジェクト3</li>
                </ul>
            </div>
            <div className="main-area">
                <InputTodo 
                todoText={todoText} 
                onChange={onChangeTodoText}
                onKeyDown={onPressEnter}
                onClick={onClickAdd}
                />
                <NotStartedTodos 
                todos={notstartedTodos}
                editingTodoText={editingTodoText}
                onChange={handleEditInputChange}
                onClickEditing={onEditing}
                onEditingMode={onEditingMode}
                onClickJob={onClickJob}
                onClickDeleteNotStarted={onClickDeleteNotStarted}
                />
                <ProgressTodos 
                todos={progressTodos}
                onClickNotstartedBack={onClickNotstartedBack}
                onClickEnd={onClickEnd}
                onClickDeleteProgress={onClickDeleteProgress}
                />
                <EndTodos 
                todos={endTodos}
                onClickBack={onClickBack}
                onClickDeleteEnd={onClickDeleteEnd}
                />
            </div>
        </section>
        <Footer />
        </>
    )
}
