import React, { useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { CiSquarePlus } from "react-icons/ci";
import { getDatabase, push , ref, set } from "firebase/database";
const TodoList = () => {
  let [task, setTask] = useState("");
  let [inputerror, setInputerror] = useState("");
  let [inputBox, setInputbox] = useState("");

  let TaskInput = (input) => {
    setTask(input.target.value);
    setInputerror("");
    setInputbox(input);
  };

  let TaskSubmit = () => {
    if (!task) {
      setInputerror("Invalid input. Please, input any data");
    } else {
      const db = getDatabase();
      set(push(ref(db, "To-Do List/")), {
        taskName: task,
      })
        .then(() => {
          alert("Task send successfull");
        })
        .catch(() => {
          alert("Task sent is not successfull");
        });

      inputBox.target.value = "";
    }

    // console.log(inputbox.target.value);
    // inputbox.target.value = '';
  };

  return (
    <div className="grid place-items-center h-[100vh] bg-[#1e272e]">
      <div className="py-5 px-10 bg-[#A59D84] rounded-md ">
        <h2 className="flex items-center font-bold gap-x-4 text-[40px] text-[#1e272e] ">
          <span>To-Do List</span> <FaRegPenToSquare />
        </h2>
        <div className="w-[700px] flex mt-2 ">
          <input
            type="text"
            className="p-2 text-[#1e272e] w-[90%] outline-none font-semibold text-xl "
            onChange={TaskInput}
          />
          <button
            onClick={TaskSubmit}
            type="button"
            className="py-2 bg-[#fff] w-[10%] text-[#1e272e] text-[50px] text-center  "
          >
            <CiSquarePlus className="m-auto" />
          </button>
        </div>
        <h4 className="mt-1 font-semibold text-[#ffffff] tracking-[3px] ">
          {inputerror}
        </h4>
      </div>
    </div>
  );
};

export default TodoList;
