import React,{useState,useEffect} from 'react'
import TaskList from './TaskList'
import { v4 as uuidv4 } from 'uuid';

function Taskform() {
    const emptyForm={task:"",priority:false, isDone:false}
    const [formData,setFormData]=useState(emptyForm)
    const [tasks,setTasks]=useState([])
    const [taskChangeCount,setTaskChangeCount]=useState(0)
    
    useEffect(() =>{
      if(taskChangeCount>0)
      {
        localStorage.setItem("tasks",JSON.stringify(tasks))

      }

     },[taskChangeCount])

     useEffect(() =>{
      const localStorageTasks = JSON.parse(localStorage.getItem("tasks"))
      setTasks(localStorageTasks ?? [])

     },[])




    function removeTask(uuid) {
      console.log(uuid);
      setTasks(prev=>prev.filter(item=>item.uuid!==uuid))
      setTaskChangeCount(prev=>prev+1)
    }
    function editTask(uuid) {
      console.log(uuid);
      const task = tasks.find(item=>item.uuid===uuid);
      console.log(task);
      setFormData({...task, isEdited:true});
      setTaskChangeCount(prev=>prev+1)
      
    }
    function doneTask(uuid){
      const taskIndex = tasks.findIndex(item=>item.uuid===uuid)
      const task=tasks[taskIndex]
      task.isDone=!task.isDone
      const newTasks=tasks.slice()
      newTasks[taskIndex]=task
      setTasks(newTasks)
      setTaskChangeCount(prev=>prev+1)

    


    }

    function handleInputChange(event)
    {
        setFormData(prev=>{
            return{
                ...prev,
                [event.target.name]: event.target.type=="checkbox"?
                event.target.checked:event.target.value
            }
        })
    }


    function handleFormSubmit(event) {
        event.preventDefault()
        if(formData.isEdited){
          const taskIndex=tasks.findIndex(item => item.uuid===formData.uuid)
          const newTasks=tasks.slice()
          newTasks[taskIndex] ={...formData}
          setTasks(newTasks)


        }

        else if(formData.task.length>3) {
            formData.uuid=uuidv4()
            setTasks(
                prev=>
                [...prev,formData]
            )
           
            
        }
        setTaskChangeCount(prev=>prev+1)
        setFormData(emptyForm)
        event.target.reset()
    }

  return (
    <div className='container'>
        <TaskList 
        tasks={tasks} 
        removeTask={removeTask} 
        editTask={editTask} 
        doneTask={doneTask}/>
        
        <form onSubmit={handleFormSubmit}>
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Task</label>
    <div className="col-sm-10">
      <input 
      onChange={handleInputChange}
      type="text"
      value={formData.task} 
      className="form-control" 
      id="inputEmail3" 
      name='Task'
      />
    </div>
  </div>
 
  
  <div className="row mb-3">
    <div className="col-sm-10 offset-sm-2">
      <div className="form-check">
        <input 
        onChange={handleInputChange}
        className="form-check-input" 
        type="checkbox" 
        checked={formData.priority}
        id="priority" 
        name='priority'
        />
        <label className="form-check-label" htmlFor="priority">
          Zorunlu ders
        </label>
      </div>
    </div>
  </div>
  <button type="submit" className="btn btn-primary">Dersi Al</button>
</form>


    </div>
  )
}

export default Taskform