import React, { useEffect, useState } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { Task } from '../../utilities/dataTypes';

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  /**Получение списка задач из Firebase */
  const fetchTasks = async () => {
    const tasksCol = collection(db, 'tasks');
    const tasksSnapshot = await getDocs(tasksCol);
    const tasksList = tasksSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Task));
    setTasks(tasksList);
  };

  /**Локальное добавление задачи */
  const addTaskLocally = (task: Task) => {
    setTasks([...tasks, task]);
  };

  /**Удаление задачи
   * @param id - идентификатор задачи
   */
  const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, 'tasks', id));
    setTasks(tasks.filter(item => item.id !== id));
  };

  /**Изменение задачи
   * @param id - идентификатор задачи
   * @param taskData - полный или частичный список параметров изменённой задачи
   */
  const updateTask = async (id: string, taskData: Partial<Task>) => {
    await updateDoc(doc(db, 'tasks', id), taskData);
    const index = tasks.findIndex(item => item.id === id);
    const updatedTask: Task = { ...tasks[index], ... taskData };
    setTasks([...tasks.filter(item => item.id !== id), updatedTask]);
  };

  return (
    <div>
      <AddTask addTaskLocally={addTaskLocally} updateTask={updateTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
};

export default Dashboard;
