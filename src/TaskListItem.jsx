import React from "react";

function TaskListItem({ item, editTask, removeTask, doneTask }) {
  return (
    <>
      <li className={`list-group-item ${item.isDone && "bg-success bg-gradient"}`}
        key={item.uuid}>
        {item.priority && <span 
            className="badge text-bg-secondary me-2">Zorunlu Ders </span>}
        {item.task}
        <div className="btn-group float-end" role="group">
        <button onClick={() => doneTask(item.uuid)}
            className="btn btn-sm btn-success float-end">Kaydet</button>

          <button onClick={() => editTask(item.uuid)}
            className="btn btn-sm btn-info float-end">Güncelle </button>

          <button onClick={() => removeTask(item.uuid)} 
            className="btn btn-sm btn-danger float-end">Sil </button>
        </div>
      </li>
    </>
    
  )
}

export default TaskListItem;
