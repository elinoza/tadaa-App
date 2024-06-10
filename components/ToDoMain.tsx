import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import uniqid from "uniqid";
import { IoLogoGithub } from "react-icons/io";
import Input from "./Input";
import ToDoItem from "./ToDoItem";

interface ToDo {
  id: string;
  isDone: boolean;
  task: string;
  createdAt: Date;
}

const ToDoMain = () => {
  const [task, setTask] = useState<string>("");
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [dones, setDones] = useState<ToDo[]>([]);

  const handleStorage = (key: string, data: ToDo[]) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleSubmit = (e: any) => {
    if (e.keyCode === 13) {
      const date = new Date();
      const toDo: ToDo = {
        id: uniqid(),
        isDone: false,
        task: task,
        createdAt: date,
      };
      toDos.push(toDo);
      setTask("");
      handleStorage("toDos", toDos);
    }
  };

  const handleDelete = (id: string, isDone: boolean) => {
    if (!isDone) {
      const newArr = toDos.filter((todo) => todo.id != id);
      setToDos(newArr);
      handleStorage("toDos", newArr);
    } else {
      const newArr = dones.filter((done) => done.id != id);
      setDones(newArr);
      handleStorage("dones", newArr);
    }
  };

  const handleUpdate = (id: string, task: string) => {
    const indexTobeUpdated = toDos.findIndex((todo) => todo.id === id);
    const updatedToDos = [...toDos];
    updatedToDos[indexTobeUpdated] = {
      ...updatedToDos[indexTobeUpdated],
      task: task,
    };
    setToDos(updatedToDos);
    handleStorage("toDos", updatedToDos);
  };
  const handleCheck = (id: string, isDone: boolean) => {
    if (!isDone) {
      let selectedTask = toDos.find((todo) => todo.id === id);
      const newArr = toDos.filter((todo) => todo.id !== id);
      if (selectedTask) {
        selectedTask = { ...selectedTask, isDone: true };
        const updatedDones = [...dones, selectedTask];
        setToDos(newArr);
        setDones(updatedDones);
        handleStorage("toDos", newArr);
        handleStorage("dones", updatedDones);
      }
    } else {
      let selectedTask = dones.find((todo) => todo.id === id);
      const newArr = dones.filter((todo) => todo.id !== id);
      if (selectedTask) {
        selectedTask = { ...selectedTask, isDone: false };
        const updatedToDos = [...toDos, selectedTask];
        setDones(newArr);
        setToDos(updatedToDos);
        handleStorage("toDos", newArr);
        handleStorage("dones", updatedToDos);
      }
    }
  };

  useEffect(() => {
    const toDosFromLocalStorage = localStorage.getItem("toDos");
    const donesFromLocalStorage = localStorage.getItem("dones");
    if (toDosFromLocalStorage) {
      setToDos(JSON.parse(toDosFromLocalStorage));
    }
    if (donesFromLocalStorage) {
      setDones(JSON.parse(donesFromLocalStorage));
    }
  }, []);

  return (
    <motion.main
      initial={{ top: -300 }}
      animate={{ top: 0 }}
      transition={{ duration: 0.4 }}
      className=" bg-daylight-200 w-screen h-screen sm:h-full sm:w-full  rounded  text-night flex-col p-8 items-center  justify-between shadow-md "
    >
      <div className="my-4 w-full  ">
        {" "}
        <div className="mb-5 flex justify-between text-2xl">
          {" "}
          <h1 className="font-bold  ">
            {" Let's Turn To-Dos into Ta-Das! 🎉"}
          </h1>{" "}
          <span>
            <a href="https://github.com/elinoza/calculator" target="_blank">
              <IoLogoGithub />
            </a>
          </span>
        </div>
        <Input
          placeholder="Create new task"
          value={task}
          autoFocus={true}
          task={task}
          onChange={(e: any) => setTask(e.currentTarget.value)}
          onKeyUp={handleSubmit}
        />
      </div>

      {toDos && toDos.length > 0 && (
        <>
          <h1 className="font-bold">To-Dos</h1>
          {toDos.map((task, i) => (
            <ToDoItem
              key={i}
              task={task}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              handleCheck={handleCheck}
            />
          ))}
        </>
      )}

      {dones && dones.length > 0 && (
        <>
          <h1 className="font-bold">Ta-Das </h1>
          {dones.map((task, i) => (
            <ToDoItem
              key={i}
              task={task}
              handleDelete={handleDelete}
              handleCheck={handleCheck}
            />
          ))}
        </>
      )}
    </motion.main>
  );
};
export default ToDoMain;
