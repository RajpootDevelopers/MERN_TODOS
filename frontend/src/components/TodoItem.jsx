import { useState } from "react";
import axios from "axios";

function TodoItem({ todo, setTodos }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.task);

  const editTodo = (e) => {
    setTodoMsg(e.target.value);
  };

  const handleEditTodo = async () => {
    try {
      const result = await axios.post(`https://todos-server-murex.vercel.app/update_todo`,{ id: todo._id, todoMsg });  
      setTodos(result.data);
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  const deleteTodo = async () => {
    try {
      const result = await axios.delete(`https://todos-server-murex.vercel.app/delete_todo?id=${todo._id}`);
      setTodos(result.data);
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  return (
    <div className="flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black bg-[#c6e9a7]">
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } `}
        value={todoMsg}
        onChange={editTodo}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          setIsTodoEditable(!isTodoEditable);
          if (isTodoEditable) {
            handleEditTodo();
          }
        }}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={deleteTodo}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
