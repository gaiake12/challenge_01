import { PlusCircle, ClipboardText } from "phosphor-react";
import styles from './ToDoList.module.css'
import { Task } from "./Task";
import { useState, FormEvent, ChangeEvent, InvalidEvent } from "react";

export interface ITask {
  content: string;
  id: string;
  isChecked: boolean;
}

export function ToDoList() {
  const [taskList, setTaskList] = useState<ITask[]>([]);

  
  const [taskText, setTaskText] = useState('');

  const counter = taskList.length
  const counterCompleted = taskList.reduce((counter,task) => {
    if (task.isChecked){
      return counter + 1
    }

    return counter
  }, 0)

  function handleCompleteTask({content, checked}: {content: string, checked: boolean}){
    const newList = taskList.map(task => {
      if (content === task.content) {
        return {...task, isChecked: checked}
      } else {
        return {...task};
      }
    });

    setTaskList(newList)
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    setTaskList([...taskList, {content:taskText, id: taskText, isChecked: false}]);

    setTaskText('');
  }

  function handleChangeTaskText(event:ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    event.target.setCustomValidity('');

    setTaskText(event.target.value);
  }

  function handleInvalidTaskText(event:InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  function handleDeleteTask(content: string) {
    const taskListWithoutDeletedOne = taskList.filter(task => task.content !== content);

    setTaskList(taskListWithoutDeletedOne);
  }

  return(
    <>
    <form onSubmit={handleCreateTask} className={styles.header}>
      <input 
      onInvalid={handleInvalidTaskText} 
      onChange={handleChangeTaskText} 
      placeholder="Adicione uma nova tarefa" 
      type="text" 
      value={taskText}
      required 
      />
      <button type='submit'>Criar<PlusCircle size={20} weight="bold"/></button>
    </form>

    <div className={styles.container}>
      <div className={styles.headerToDoList}>
        <div>
          <span>Tarefas criadas</span>
          <span className={styles.counter}>{counter}</span>
        </div>

        <div>
          <span>Concluídas</span>
          <span className={styles.counter}>{counterCompleted}</span>
        </div>
      </div>
    </div>

    <div className={styles.containerToDoList}>
      <div className={styles.toDoList}>
        {
          taskList.length === 0 ? (
            <>
            <ClipboardText size={80} color='gray'/>
            <strong>Você ainda não tem tarefa cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
            </>
          ) :
          taskList.map(task => <Task key={task.id} onComplete={handleCompleteTask} onDelete={handleDeleteTask} task={task} isChecked={task.isChecked} />)
        }

          
      </div>

      
    </div>
    </>
  );
}