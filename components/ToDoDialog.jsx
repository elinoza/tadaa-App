import { motion } from "framer-motion";

const ToDoDialog = ({ task, onKeyUp, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-3 bg-neutral-100 flex  w-7/12 h-64 items-center fixed justify-center shadow left-[50%]  top-[50%]  translate-x-[-50%] translate-y-[-50%]"
    >
      <input
        placeholder="Create new task"
        value={task}
        onChange={onChange}
        onKeyUp={onKeyUp}
        autoFocus="true"
        className="outline-none p-1 bg-stone-50  focus:bg-white shadow w-60 "
      />
    </motion.div>
  );
};
export default ToDoDialog;
