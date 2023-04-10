import React, { useEffect, useState } from "react";

// create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    try {
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/dzagar88",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const body = await response.json();
      setTodos(body);
    } catch {}
  }
  
  async function putTodos() {
    try {
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/dzagar88",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            // send todos w/ label and done
            ...todos, {
              label: inputValue,
              done: false
            }
          ]),
        }
      );
      const body = await response.json();
      console.log(body);
    } catch {}
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="container">
      <h1>To Do List</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyUp={async (e) => {
              if (e.key === "Enter") {
                // setTodos(todos.concat(inputValue));
                
                await putTodos();
                await getTodos();
                setInputValue("");
              }
            }}
            placeholder="Add items here..."
          ></input>
        </li>
        {todos.map((item, index) => (
          <li key={index}>
            {item.label}{" "}
            <i
              className="fas fa-trash-alt"
              onClick={() =>
                setTodos(
                  todos.filter((item, currentIndex) => index != currentIndex)
                )
              }
            ></i>
          </li>
        ))}
      </ul>
      <div>{todos.length} Tasks</div>
    </div>
  );
};

export default Home;
