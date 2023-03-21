import React, { useState, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
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
  const [updateInput, setUpdateInput] = useState<string>("");
  const [myTask, setMyTask] = useState<string>("");
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setAllTasks(JSON.parse(storedTasks));
    }
  }, []);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newtask) {
      console.log("TAREA VACIA");
    } else {
      addTask(newtask);
      setMyTask(newtask);
      setNewTask("");
      localStorage.setItem("tasks", JSON.stringify(allTasks));
    }
  };

  const addTask = (name: string) => {
    setIdCounter(idCounter + 1);
    setAllTasks([...allTasks, { name, done: false, id: idCounter }]);
  };

  const handleDelete = (id: number) => {
    const deleteTask = allTasks.filter((el) => el.id !== id);
    setAllTasks(deleteTask);

    localStorage.setItem("tasks", JSON.stringify(deleteTask));
  };

  const handleclickCheckbox = (id: number) => {
    const uploadTaskDone = allTasks.map((el) => {
      if (el.id === id) {
        return { ...el, done: !el.done };
      }
      return el;
    });
    setAllTasks(uploadTaskDone);
  };

  const handleUpdate = (value: string, id: number) => {
    const updatedTasks = allTasks.map((el) => {
      if (el.id === id) {
        return { ...el, name: value };
      }
      return el;
    });
    setAllTasks(updatedTasks);
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form">
          <input
            className="form_input"
            value={newtask}
            onChange={(e) => setNewTask(e.target.value)}
            type="text"
          />

          <button className="content_submit">
            <AiOutlinePlusCircle
              style={{ fontSize: "30px", cursor: "pointer" }}
            />
          </button>
        </div>

        <div className="form_content_task">
          {allTasks.map((el) => (
            <div className="form_content" key={el.id}>
              {
                <input
                  onClick={(e) => handleclickCheckbox(el.id)}
                  className="form_task_checkbox"
                  type="checkbox"
                />
              }
              <input
                onChange={(e) => handleUpdate(e.target.value, el.id)}
                type="text"
                value={el.name}
                className={`form_task_name ${el.done ? "done" : ""}`}
              />
              {/* <button onClick={() => handleUpdate(el.id)}>actualizar</button> */}

              <div className="form_task_contentButton_checkbox">
                <button
                  className="form_task_delete"
                  onClick={() => handleDelete(el.id)}
                >
                  <BsTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </form>
    </>
  );
}
