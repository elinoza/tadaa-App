import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { IoMdCheckmark } from "react-icons/io";
import { formatDistance } from "date-fns";

const ToDoItem = ({
  task,
  handleDelete,
  handleUpdate,
  handleCheck,
  checked,
}) => {
  const [updatedTask, setUpdatedTask] = useState(task.task);
  const [isEdit, setisEdit] = useState(false);

  const dateDistance = formatDistance(task.createdAt, new Date(), {
    addSuffix: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className=" w-full h-30 bg-white shadow flex justify-between items-center my-2 p-3"
    >
      {" "}
      {!isEdit || checked ? (
        <div className="p-1  ">
          {" "}
          <input
            type="checkbox"
            onChange={() => handleCheck(task.id)}
            className="mr-2"
            checked={task.isDone}
          />
          <div className="inline">
            {task.task}{" "}
            <span className="text-neutral-400 text-[0.7rem]">
              {dateDistance}{" "}
            </span>
          </div>
        </div>
      ) : (
        <div>
          <input
            value={updatedTask}
            autoFocus="true"
            className="outline-none p-1  w-full "
            onChange={(e) => setUpdatedTask(e.target.value)}
          />
        </div>
      )}
      {!checked && (
        <div className=" justify-between  flex items-center w-24">
          {" "}
          {!isEdit ? (
            <span className="shadow cursor-pointer p-3">
              {" "}
              <LuPencil onClick={() => setisEdit(true)} />
            </span>
          ) : (
            <span className="shadow cursor-pointer p-3 text-green-600">
              {" "}
              <IoMdCheckmark
                onClick={() => {
                  handleUpdate(task.id, updatedTask), setisEdit(false);
                }}
              />
            </span>
          )}
          <span
            onClick={handleDelete}
            className="text-red-600 cursor-pointer p-3 shadow"
          >
            {" "}
            <MdDelete />{" "}
          </span>
        </div>
      )}
    </motion.div>
  );
};
export default ToDoItem;
