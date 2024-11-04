import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { ImCross } from "react-icons/im";
const App = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [selectedOption, setSelectedOption] = useState("");
  const [taskArr, setTaskArr] = useState([])
  const [categoryChange, setCategoryChange] = useState("")


  const showErrorToast = () => {
    toast.error("Invalid Input", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored"
    });
  };

  const showSuccessToast = () => {
    toast.success("Success! Your Task was added.", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  };

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleDesc = (e) => {
    setDesc(e.target.value)
  }

  const handleSelect = (e) => {
    setSelectedOption(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    if (!title || !desc || !selectedOption) {
      showErrorToast()
      return
    }

    const task = {
      id: Date.now(),
      title: title,
      desc: desc,
      category: selectedOption,
      isCompleted: false,
    }
    setTaskArr((prevTaskArr) => [...prevTaskArr, task])
    showSuccessToast()
    setTitle("")
    setDesc("")
    setSelectedOption("")
  }

  const handleEdit = (id) => {
    const index = taskArr.findIndex((t) => t.id === id)
    setTitle(taskArr[index].title)
    setDesc(taskArr[index].desc)
    setSelectedOption(taskArr[index].category)
    const editedArr = [...taskArr]
    editedArr.splice(index, 1)
    setTaskArr(editedArr)
  }
  const handleDelete = (id) => {
    const index = taskArr.findIndex((t) => t.id === id)
    const editedArr = [...taskArr]
    editedArr.splice(index, 1)
    setTaskArr(editedArr)
  }

  const handleComplete = (id) => {
    const index = taskArr.findIndex((t) => t.id === id)
    const editedArr = [...taskArr]
    editedArr[index].isCompleted = editedArr[index].isCompleted ? false : true
    setTaskArr(editedArr)
  }

  const handleCategoryChange = (e) => {
    setCategoryChange(e.target.value)
  }
  return (
    <>
      <ToastContainer />
      <div className='bg-red-200 rounded-lg w-[500px] min-h-[600px] m-auto mt-10 ring-4 ring-emerald-600 shadow-lg'>
        <form onSubmit={(e) => handleFormSubmit(e)} className='border-b-4 border-b-orange-400 flex flex-col gap-4 p-7 bg-gray-300 justify-center rounded-lg'>
          <input type="text" name="task" value={title} onChange={(e) => handleTitle(e)} className='p-3 rounded-lg bg-transparent ring-2 ring-orange-800 focus:outline-none  text-2xl placeholder:text-2xl placeholder:text-gray-900' placeholder='Enter Task...' />
          <textarea name="desc" value={desc} onChange={(e) => handleDesc(e)} className='bg-transparent ring-2 ring-orange-700 rounded-lg  p-3 min-h-[100px] resize-y max-h-[200px] focus:outline-none text-2xl placeholder:text-2xl placeholder:text-gray-900' placeholder='Enter Description....'></textarea>
          <select name="category" value={selectedOption} onChange={handleSelect} className='p-3 rounded-lg bg-transparent text-2xl ring-2 ring-blue-700 focus:outline-none '>
            <option className='text-black' value="" disabled>Select an Option</option>
            <option className='text-black' value="gaming">Gaming</option>
            <option className='text-black' value="cooking">Cooking</option>
            <option className='text-black' value="studies">Studies</option>
          </select>
          <button type="submit" className='p-3 bg-teal-400 text-black rounded-lg ring-1 ring-blue-600 text-xl font-semibold w-[300px] m-auto hover:bg-teal-500 active:scale-75 transition-all'>Add Task</button>
        </form>
        <select name="category" value={categoryChange} onChange={handleCategoryChange} className='p-2 m-3 w-[200px] rounded-lg bg-transparent text-xl ring-4 ring-blue-400 focus:outline-none '>
          <option className='text-black' value="">Show All</option>
          <option className='text-black' value="gaming">Gaming</option>
          <option className='text-black' value="cooking">Cooking</option>
          <option className='text-black' value="studies">Studies</option>
        </select>
        <ul className='rounded-lg p-3 flex flex-col gap-4 text-xl mb-7'>
          {
            (taskArr.filter((t) => (
              categoryChange ? t.category === categoryChange : true
            ))).map((t, index) => (
              <li key={index} className={` p-2 px-4 text-xl rounded-lg flex items-center justify-between ${t.isCompleted ? "bg-green-300 line-through" : "bg-blue-300"} `}>
                <div className='flex flex-col justify-center rounded-lg'>
                  <span className='flex gap-4'>Title: <p>{t.title}</p></span>
                  <span className='flex gap-4'>Description: <p>{t.desc}</p></span>
                  <span className='flex gap-4'>Category: <p>{t.category}</p></span>
                </div>
                <div className='flex justify-center flex-col items-center gap-5 text-2xl'>
                  <button onClick={() => handleEdit(t.id)}><FiEdit /></button>
                  <button onClick={() => handleDelete(t.id)}><MdDelete /></button>
                  <button onClick={() => handleComplete(t.id)}>{t.isCompleted ? <ImCross /> : <SiTicktick />}</button>
                </div>
              </li>
            ))
          }

        </ul>
      </div>

    </>
  )
}

export default App