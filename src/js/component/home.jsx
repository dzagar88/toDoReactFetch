import React, { useState } from "react";

// include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

// create your first component
const Home = () => { 
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	
	return (
		<div className="container">
			<h1>To Do List</h1>
			<ul>
				<li>
					<input 
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyUp={(e) => 
							{
								if (e.key === "Enter") {
									setTodos(todos.concat(inputValue));
									setInputValue("");
								}
							}
						}
						placeholder="Add items here..."
					></input>
				</li>
				{todos.map((item, index) => (
					<li>{item} <i className="fas fa-trash-alt" onClick={() => 
						setTodos(todos.filter(
							(t, currentIndex) => 
								index != currentIndex
							)
						)
					}></i></li>
				))}
			</ul>
			<div>{todos.length} Tasks</div>
		</div>
	);
};

export default Home;