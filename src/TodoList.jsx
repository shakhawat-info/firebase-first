import React, { useEffect, useRef, useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { CiSquarePlus } from "react-icons/ci";
import { getDatabase, push , ref, set , onValue } from "firebase/database";
const TodoList = () => {
  let [task, setTask] = useState("");
  let [inputerror, setInputerror] = useState("");
  const db = getDatabase();
  let [allData , setAllData] = useState([]);
console.log(allData);

  let TaskInput = (input) => {
    setTask(input.target.value);
    setInputerror("");
  };

  let TaskSubmit = () => {
    if (!task) {
      setInputerror("Invalid input. Please, input any data");
    } else {
      
      set(push(ref(db, "To-Do List/")), {
        taskName: task,
      })
        .then(() => {
          alert("Task send successfull");
          setTask('')
        })
        .catch(() => {
          alert("Task sent is not successfull");
        });
    }

    // console.log(inputbox.target.value);
    // inputbox.target.value = '';
  };

  useEffect(()=>{
    const toDoListRef = ref(db, "To-Do List/");
    onValue(toDoListRef, (dataItems) => {
    const data = dataItems.val();
    let DataArr = [];
    setAllData(DataArr);
    
    dataItems.forEach((item)=>{
      DataArr.push(item.val());
      // console.log(DataArr);
    })

    // console.log(data);
    
    // updateStarCount(postElement, data);
});
  },[])


  return (
    <div className="grid place-items-center h-[100vh] bg-[#1e272e]">
      <div className="lg:py-5 py-2 lg:px-10 px-5 bg-[#A59D84] rounded-md w-[90%] lg:w-1/2">
        <h2 className="flex items-center font-bold gap-x-4 lg:text-[40px] text-[20px] text-[#1e272e] ">
          <span>To-Do List</span> <FaRegPenToSquare />
        </h2>
        <div className=" flex mt-2 ">
          <input
            type="text"
            className="px-2 py-1 text-[#636769] w-[90%] outline-none font-semibold lg:text-xl text-sm"
            onChange={TaskInput}
            // value={task}
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
        <div className="flex flex-col">
          {allData.map((dataItem , index)=>{
            return ( 
              <div>
                <span className="font-numberFont text-[30px] ">{index + 1}</span>
                
                {dataItem.taskName}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
