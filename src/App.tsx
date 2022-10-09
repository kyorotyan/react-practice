import React,{ useState} from 'react';
import './App.css';

function App() {
  const [inputvalue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);


  type Todo = {
    inputvalue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newTodo: Todo = {
      inputvalue: inputvalue,
      id: todos.length,
      checked: false,
    }

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

    const handleEdit = (id:number, inputvalue: string) => {
      const newTodos = todos.map((todo) => {
        if(todo.id === id){
          todo.inputvalue = inputvalue;
        }
        return todo;
      })

      setTodos(newTodos);
    };

    const handleChecked = (id: number, checked: boolean) => {
      const newTodos = todos.map((todo) => {
        if(todo.id === id){
          todo.checked = !checked;
        }
        return todo;
    });

    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const printHelloWorld = () => {
    const fetchTodoUrl = 'https://jsonplaceholder.typicode.com/todos/' + (todos.length + 1);
    fetch(fetchTodoUrl, {
      method: 'GET',
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.resolve(response.json());
        }
        return Promise.reject();
      })
      .then((json) => {
        const newTodo: Todo = {
          inputvalue: json!.title,
          id: todos.length,
          checked: json!.completed,
        }
    
        setTodos([newTodo, ...todos]);
      });
  };



  return (
    <div className="App">
     <div>
       <h2>Todoリスト with Typescript</h2>
       <form onSubmit={(e) => handleSubmit(e)}>
          <input type='text' value={inputvalue} onChange={(e) => handleChange(e)} className="inputText"/>
          <input type='submit' value='作成' className='submitButton' />
       </form>
       <button onClick={() => printHelloWorld()}>fetch</button>
       <ul className='todoList'>
         {todos.map((todo) => (
          <li key={todo.id}>
            <input  type='text'  onChange={(e) => handleEdit(todo.id, e.target.value)} className="inputText" value={todo.inputvalue} disabled={todo.checked}/>
            <input type='checkbox'  checked={todo.checked} onChange={() => handleChecked(todo.id, todo.checked)}/>
            <button onClick={() => handleDelete(todo.id)}>消</button>
          </li>
         ))}
       </ul>
     </div>
    </div>
  );
}

export default App;
