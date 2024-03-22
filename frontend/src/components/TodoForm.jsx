import { useState } from 'react'
import axios from 'axios';
function TodoForm({onSetTodos}) {
    const [todo, setTodo] = useState("")
    
    const add = (e) => {
      e.preventDefault()
      if (!todo) return;
      setTodo("");
      axios.post(`https://mern-todos-alpha.vercel.app/create_todo`, { task : todo } )
      .then((result)=>{
        onSetTodos(result.data)
      })
      .catch((erro) => console.log(erro))
    }

 return (
      <form onSubmit={add}  className="flex">
          <input
              type="text"
              placeholder="Write Todo..."
              className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
              Add
          </button>
      </form>
  );
}

export default TodoForm;