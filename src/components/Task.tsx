import { Trash } from "phosphor-react";
import styles from './Task.module.css';
import {ITask} from "./ToDoList";

interface TaskProps {
  task:ITask;
  onDelete: (taskContent: string) => void;
  onComplete: ({content, checked}: {content:string, checked: boolean}) => void;
  isChecked: boolean;
}

export function Task ({task, onDelete, onComplete, isChecked}: TaskProps) {

  const selectStyles = isChecked ? styles.checked : styles.container;
  
  function handleChecked () {
    console.log('teste');
    onComplete({content: task.content, checked: !task.isChecked});
  }

  function handleDeleteTask() {
    onDelete(task.content)
  }

  return(
    <div className={selectStyles}>
      <input onChange={handleChecked} checked={isChecked} type="checkbox" />
      <span>{task.content}</span>
      <button onClick={handleDeleteTask}><Trash weight='bold' size={14}/></button>
    </div>
  );
}