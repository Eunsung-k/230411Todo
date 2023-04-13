import React, { useState } from "react";
import TodoItem from "@/components/TodoItem";
import styles from "@/styles/TodoList.module.css";

// TodoList 컴포넌트를 정의합니다.
const TodoList = () => {
  // 상태를 관리하는 useState 훅을 사용하여 할 일 목록과 입력값을 초기화합니다.
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  // addTodo 함수는 입력값을 이용하여 새로운 할 일을 목록에 추가하는 함수입니다.
  const addTodo = () => {
    if (input.trim() === "") return;
      setTodos([...todos, { id: Date.now(), text: input, completed: false, date: selectedDate},
      ]);
      setInput("");
      setSelectedDate(null);
  };

  // toggleTodo 함수는 체크박스를 눌러 할 일의 완료 상태를 변경하는 함수입니다.
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      })
    );
  };

  // deleteTodo 함수는 할 일을 목록에서 삭제하는 함수입니다.
  const deleteTodo = (id) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };
  const sortTodos = (todos) => {
    return todos.sort((a,b) => new Date(a.date) - new Date(b.date));
  };


  // 컴포넌트를 렌더링합니다.
  return (
    <div className={styles.container}>
      <h1>Todo List</h1>
      <div className={styles.inputContainer}></div>
      <input
        type="text"
        className={styles.itemInput}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="date"
        className={styles.itemInput}
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)} 
        />
      <button className={styles.addButton} onClick={addTodo}>
        Add Todo
      </button>
      <ul>
        {sortTodos(todos).map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
