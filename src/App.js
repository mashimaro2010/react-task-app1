import './App.css';
import Header from './components/Header';
import AddForm from './components/AddForm';
import Item from './components/Item';
import { useState } from 'react';

function App() {
  const [tasks,setTasks]=useState([
    {id:1,title:"แก้ Bug โปรแกรม"},
    {id:2,title:"คู่มือการใช้งานโปรแกรม"},
  ])
  const [title,setTitle]=useState("")
  const [editId,setEditId]=useState("null");
  function deleteTask(id){
    const result=tasks.filter(item=>item.id !==id)
    setTasks(result);
  }
  function editTask(id){
    //1
    setEditId(id)
    const editTask=tasks.find((item)=>item.id===id)
    setTitle(editTask.title)
  }
  function saveTask(e){
    e.preventDefault();
    if(!title){
      alert("กรุณาป้อนข้อมูลด้วยครับ")
    }else if(editId){
      //อัพเดตข้อมูล      
      const updateTask=tasks.map((item)=>{
        //รายการใดมีรหัสตรงกับรหัสแก้ไข
        if(item.id===editId){
          return {...item,title:title}
        }
        return item;
      })
      setTasks(updateTask)
      setEditId(null)
      setTitle("")
    } else{
      //เพิ่มรายการใหม่
      const newTask={
        id:Math.floor(Math.random()*1000),
        title:title
      }
      setTasks([...tasks,newTask])
      setTitle("")
    }
  }
  return (
    <div className="App">
      <Header/>
      <div className='container'>
        <AddForm title={title} setTitle={setTitle} saveTask={saveTask} editId={editId}/>
        <section>
          {
          tasks.map((data)=>(
            <Item key={data.id} data={data} deleteTask={deleteTask} editTask={editTask}/>
          ))
          }
        </section>
      </div>
    </div>
  );
}

export default App;