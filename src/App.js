import './App.css';
import {useState, useEffect} from 'react';

function App() {
    
  // Взимаме mock информация
  const[todos, setTodos] = useState([]);
    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => setTodos(data));
    }, []);
    // Създаваме листа с филтрирани по user todo-та

    const [filterUserId, setFilterUserId] = useState(null);
    const userIDs = [... new Set(todos.map(todo => todo.userId))]
    const filteredTodos = filterUserId ? todos.filter(todo => todo.userId === Number(filterUserId)) : todos;
    
    // разделяме взетата информация
    

      //  Функция за подредба
    const [sortOrder, setSortOrder] = useState('az');
    const sorting = (todos) => {return [...todos].sort((a,b) => {
      return sortOrder == 'az' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);

    });
  };

  const completed = sorting(filteredTodos.filter(todo => todo.completed));
    const uncompleted = sorting(filteredTodos.filter(todo => !todo.completed));

    // Функционалност на бутоните
    const CompleteButton = (id) => {setTodos(todos.map
      (todo => todo.id === id ? {...todo, completed:  true} : todo)); };
    const UndoButton = (id) => {setTodos(todos.map
      (todo => todo.id === id ? {...todo, completed:  false} : todo)); };
   
    

      return (
        <div className="app">
          <div className="controls">
            <div className="filter-controls">
              <h2>Filter & Sort</h2>
              <div className="dropdown-group">
                <label htmlFor="user-filter">Filter by User:</label>
                <select
                  id="user-filter"
                  value={filterUserId || ""}
                  onChange={(e) => setFilterUserId(e.target.value || null)}
                >
                  <option value="">All Users</option>
                  {userIDs.map(id => (
                    <option key={id} value={id}>User {id}</option>
                  ))}
                </select>
              </div>
      
              <div className="dropdown-group">
                <label htmlFor="sort-order">Sort Order:</label>
                <select
                  id="sort-order"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="az">Title (A-Z)</option>
                  <option value="za">Title (Z-A)</option>
                </select>
              </div>
            </div>
          </div>
      
          <div className="todo-columns">
            <div className="left">
              <h1>UNCOMPLETED TODOS</h1>
              {uncompleted.map(todo => (
                <div key={todo.id} className="todo-item">
                  <p>{todo.title}</p>
                  <button onClick={() => CompleteButton(todo.id)}>Complete</button>
                </div>
              ))}
            </div>
            <div className="right">
              <h1>COMPLETED TODOS</h1>
              {completed.map(todo => (
                <div key={todo.id} className="todo-item">
                  <p>{todo.title}</p>
                  <button onClick={() => UndoButton(todo.id)}>Undo</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}
export default App;
