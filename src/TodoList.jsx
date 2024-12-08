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
      <div className="lg:py-5 py-2 lg:px-10 px-5 bg-[#A59D84] rounded-md ">
        <h2 className="flex items-center font-bold gap-x-4 lg:text-[40px] text-[20px] text-[#1e272e] ">
          <span>To-Do List</span> <FaRegPenToSquare />
        </h2>
        <div className="lg:w-[700px] w-fit flex mt-2 ">
          <input
            type="text"
            className="p-2 text-[#636769] w-[90%] outline-none font-semibold lg:text-xl text-sm"
            onChange={TaskInput}
          />
          <button
            onClick={TaskSubmit}
            type="button"
            className="py-2 bg-[#fff] w-[10%] text-[#1e272e] lg:text-[50px] text-[20px] text-center  "
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
