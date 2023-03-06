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
    const [notstartedTodos, setNotStartedTodos] = useState([]);
     // 細かいところですがnot started todos で区切れるとおもうので変数名はnotStartedTodosのように した方がGoodかもです！！
    const [progressTodos, setProgressTodos] = useState([])
    const [endTodos, setEndTodos] = useState([])

    //インプットボックスにテキストを入れたときに発動
    const onChangeTodoText = (event) => {
        setTodoText(event.target.value)
          // ↑一行で書くと const onChangeTodoText = event => setTodoText(event.target.value)のようにかけて2行分短くなってなお良いかもしれません
          // 大規模なコードになればなるほどこのような細かいところでの行の節約が、「塵も積もればで」効いてきます！！
    }

    //Enterを押下することで、追加ボタンを押したときと同じ処理を行う
    const onPressEnter = (event) => {
        if (event.key === 'Enter') {
            onClickAdd()
        }

        // Enterを押したときinputの中が空にならなかったのでよくみてみると
        // 文字入力の確定時に1回Enterを押すとそのまま未着手のタスクに追加
        // されさらにもう一回Enterを押すと未着手のタスクに追加されつつ、
        // ここでinputの値が空になります。

        // ここからは推測になるのですが、この1度目のIME確定(入力確定)のEnterはあくまで「入力を確定させるだけ」
        // とブラウザは認識しているため、onClickAddの処理が走り最後にInputを空にする処理を入れてもinputの値が
        // 空にならないのかなと思っています
        // 確定した後にinputにフォーカスを当てた状態でEnterを押下するとうまくいくことを根拠に上記のように考えました

        // 従って考えるべきは、 「IMEの入力確定のイベントの時はハンドリンクぜず、確定後のEnterのみ
        // ハンドリングする」といったような感じになります。
        // ここら辺少し難しいですね....

        // 下記に解決策を記述しますので、余裕があれば実際に解決策1 or 解決策2のコメントアウトをはずして試してみてください！
        // 解決策1 KeyboardEvent.isComposing を使用する
        // https://developer.mozilla.org/ja/docs/Web/API/KeyboardEvent/isComposing(引用: MDN)
        // isComposingでは文字の変換中はtrueを返し、そうでない場合はfalseを返すみたいです
        // if (!event.nativeEvent.isComposing && event.key === “Enter”) {
        //     onClickAdd()
        // }
        // ただこちらはブラウザによって挙動が違うようで、Safariの場合IME確定時のEnterを押した際に、isComposing
        // が本来trueになってほしいところ、falseになってしまうそうです。


        // 解決策2 keyCodeを使用する
        // 普通のEnterはkeyCodeが13に、IME確定のEnterは229になります
        // KeyCodeの使用はJSが公式で非推奨としているのですが、ブラウザの差異を考えなくても良いので
        // もしかすると解決策2の方がおすすめかもです...
        // if (event.keyCode === 13) {
        //     onClickAdd()
        // }

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
        // <- ここのバリデーションめっちゃ良いです！！このような考慮ができるのは素晴らしいです！！

        // カスタムの課題です。
        // もし入力欄が空の場合、ユーザーに入力欄がからであることを通知し
        // それ以降の処理が走らないような記述をしてみてください！
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

    // 削除ボタンをクリックしたときに発動
    const onClickDeleteNotStarted = (index) => {
        const newNotStartedTodos = [...notstartedTodos]

        //対象のTodoを配列から消去
        newNotStartedTodos.splice(index, 1)
        //消去したことにより、欠番が生じるため、idをふり直す
        idRewrite(newNotStartedTodos)
        setNotStartedTodos(newNotStartedTodos)
    }

    // 追加時の処理、削除時の処理どちらとも非常によくできています！！
    // たかぽんさんのコードで基本的に全く問題ないですが、一応私が考えたコードも下記に追記しておきます
    // 参考程度に見てみてください！

    //  ============================ 追記 wrote by Yuuki ============================================
    // const onClickJob = (index) => {
    //     const newNotStartedJobTodos = createNewTodosArray(notstartedTodos, index);
    //     setProgressTodos([...progressTodos, {  id: progressTodos.length + 1,  title: notstartedTodos[index].title }])
    //     setNotStartedTodos(newNotStartedJobTodos);
    // }

    // const onClickDeleteNotStarted = (index) => {
    //     const newNotStartedTodos = createNewTodosArray(notstartedTodos, index);
    //     setNotStartedTodos(newNotStartedTodos);
    // }
    
    // const createNewTodosArray = (todosArray, index) => {
    //     return todosArray.filter(notStartedTodos=> notStartedTodos.id !== notstartedTodos[index].id)
    //                       .map((notstartedTodos, index) => ( {...notstartedTodos, id: index + 1}) );
    //  配列のメソッドはメソッドは戻り値が配列になるのでメソッドを繋げることができます。(ちなみにこれをメソッドチェーンと言います)
    // }
    //  ============================ 追記ここまで wrote by Yuuki ===============================================

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

    // 戻す時の処理もidの欠番、重複を考慮できており素晴らしいです!!
    // 上記の処理で問題ないと思います！！

    //idのふり直し処理を関数化
    // この共通化も素晴らしいです！！！
    const idRewrite = (Todos) => {
        for (let i = 0; i < Todos.length; i++) {
            Todos[i].id = i + 1
        }   
    }


    // コンポーネント化が綺麗にできていて素晴らしいです！！かなりコードの見通しが良いです！！
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
