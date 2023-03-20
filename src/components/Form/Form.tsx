import React, { useState } from "react";
import "./Form.css";
interface ITtask {
  id: number;
  name: string;
  done: boolean;
}

export function Form(): JSX.Element {
  const [newtask, setNewTask] = useState<string>("");
  const [allTasks, setAllTasks] = useState<ITtask[]>([]);
  const [idCounter, setIdCounter] = useState<number>(1);
  const [getTaskDone, setgetTaskDone] = useState<object>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(newtask);
    setNewTask("");
  };

  const addTask = (name: string) => {
    setIdCounter(idCounter + 1);
    setAllTasks([...allTasks, { name, done: false, id: idCounter }]);
  };

  const handleDelete = (id: number) => {
    const deleteTask = allTasks.filter((el) => el.id !== id);
    setAllTasks(deleteTask);
  };

  const handleclickCheckbox = (id: number) => {
    const updatedTasks = allTasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setAllTasks(updatedTasks);
  };

  return (
    <>
      <button onClick={() => allTasks.map((el) => console.log(el.done))}>
        ALLTASKS
      </button>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form">
          <input
            className="form_input"
            value={newtask}
            onChange={(e) => setNewTask(e.target.value)}
            type="text"
          />
          <input type="submit" value="+" />
        </div>

        <div className="form_content_task">
          {allTasks.map((el) => (
            <div className="form_content" key={el.id}>
              <span className={`form_task_name ${el.done ? "done" : ""}`}>
                {el.name}
              </span>
              <div className="form_task_contentButton_checkbox">
                <button
                  className="form_task_delete"
                  onClick={() => handleDelete(el.id)}
                >
                  Delete
                </button>
                <input
                  onClick={(e) => handleclickCheckbox(el.id)}
                  className="form_task_checkbox"
                  type="checkbox"
                />
              </div>
            </div>
          ))}
        </div>
      </form>
    </>
  );
}
