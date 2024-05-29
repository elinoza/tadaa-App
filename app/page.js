"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import uniqid from "uniqid";
import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { IoMdCheckmark } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import ToDoDialog from "../components/ToDoDialog";
import ToDoItem from "@/components/ToDoItem";

export default function Home() {
  const [task, setTask] = useState("");
  const [toDo, setToDo] = useState({
    id: "",
    isDone: false,
    task: "",
    createdAt: "",
  });
  const [toDos, setToDos] = useState([]);
  const [dones, setDones] = useState([]);
  const [toDoDialogOpen, setToDoDialogOpen] = useState(false);

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      const date = new Date();
      const toDo = {
        id: uniqid(),
        isDone: false,
        task: task,
        createdAt: date,
      };
      toDos.push(toDo);
      setTask("");
      setToDoDialogOpen(false);
    }
  };

  const handleDelete = (id) => {
    const newArr = toDos.filter((todo) => todo.id != id);
    setToDos(newArr);
  };

  const handleUpdate = (id, task) => {
    const indexTobeUpdated = toDos.findIndex((todo) => todo.id === id);
    const updatedToDos = [...toDos];
    updatedToDos[indexTobeUpdated] = {
      ...updatedToDos[indexTobeUpdated],
      task: task,
    };
    setToDos(updatedToDos);
  };
  const handleCheck = (id) => {
    const newArr = toDos.filter((todo) => todo.id != id);
    let checkedToDo = toDos.find((todo) => todo.id === id);
    checkedToDo = { ...checkedToDo, isDone: true };
    const updatedDones = [...dones, checkedToDo];
    setToDos(newArr);
    setDones(updatedDones);
  };

  return (
    <motion.main
      initial={{ top: -300 }}
      animate={{ top: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen  text-gray-700 from-stone-100 to-stone-200 bg-gradient-to-tr  p-24"
    >
      <div className="flex justify-between items-center w-full">
        {" "}
        <h1 className="inline font-medium text-xl">Hello Hilal! </h1>{" "}
        <span onClick={() => setToDoDialogOpen(true)}>
          <FaPlus className="  cursor-pointer mr-1 inline-flex hover:text-lg" />
          New
        </span>
      </div>

      {toDoDialogOpen && (
        <ToDoDialog
          task={task}
          onKeyUp={handleSubmit}
          onChange={(e) => setTask(e.currentTarget.value)}
        />
      )}
      <h1>To Do</h1>
      {toDos &&
        toDos.map((task, i) => (
          <ToDoItem
            key={i}
            task={task}
            handleDelete={() => handleDelete(task.id)}
            handleUpdate={handleUpdate}
            handleCheck={() => handleCheck(task.id)}
          />
        ))}
      <h1>Done</h1>
      {dones &&
        dones.length > 0 &&
        dones.map((task, i) => <ToDoItem key={i} task={task} />)}
    </motion.main>
  );
}
