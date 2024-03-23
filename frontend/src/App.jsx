import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import axios from 'axios'

function App() {

  const [ todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    ;( async ()=> {
      try {
        setLoading(true);
        const response = await axios.get(`https://todos-server-3uw2yjr4t-afaq-ahmads-projects-571f8223.vercel.app/get_todos`);
        setTodos(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false)
      }finally{
        setLoading(false)
      }

    })();
    // .then((result)=>{
    //   setTodos(result.data)
    // })
    // .catch((erro)=>console.log(erro))
  }, [])

  if (loading) {
    return <h1 className='flex justify-center items-center bg-[#2f3847] text-white font-bold text-xl min-h-screen'>Loading...</h1>
  }

  return (
      <div className="bg-[#2f3847] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Todos By MERN Stack</h1>
                    <div className="mb-4">
                        <TodoForm onSetTodos={setTodos} />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todos.map((todo) => (
                          <div key={todo._id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} setTodos= {setTodos} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
  )
}
export default App



