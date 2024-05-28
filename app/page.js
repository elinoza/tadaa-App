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

export default function Home() {
  const [task, setTask] = useState("");
  const [toDo, setToDo] = useState({
    id: "",
    isDone: false,
    task: "",
    createdAt: "",
  });
  const [toDos, setToDos] = useState([]);
  const [isEdit, setisEdit] = useState(false);
  const [dones, setDones] = useState([]);
  const [toDoDialogOpen, setToDoDialogOpen] = useState(false);

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      const date = format(new Date(), "MM/dd/yyyy");
      const toDo = {
        id: uniqid(),
        isDone: false,
        task,
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
  const handleEdit = (id) => {
    setisEdit(true);
    const tempArr = toDos.filter((todo) => todo.id != id);
    const toDo = toDos.filter((todo) => todo.id === id);
    tempArr.push({ ...toDo, task: task });
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
      {toDos &&
        toDos.map((task, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className=" w-full h-30 bg-white shadow flex justify-between items-center my-2 p-3"
          >
            {" "}
            {task.task}
            <div className=" justify-between  flex items-center w-24">
              {" "}
              {!isEdit ? (
                <span className="shadow cursor-pointer p-3">
                  {" "}
                  <LuPencil onClick={() => handleEdit(id)} />
                </span>
              ) : (
                <span className="shadow cursor-pointer p-3 text-green-600">
                  {" "}
                  <IoMdCheckmark />
                </span>
              )}
              <span
                onClick={() => handleDelete(task.id)}
                className="text-red-600 cursor-pointer p-3 shadow"
              >
                {" "}
                <MdDelete />{" "}
              </span>
            </div>
          </motion.div>
        ))}
    </motion.main>
  );
}
