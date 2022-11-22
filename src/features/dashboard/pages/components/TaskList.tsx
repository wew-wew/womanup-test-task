import dayjs from 'dayjs';
import React from 'react';
import { Task } from '../../../utilities/dataTypes';
import TaskItem from './TaskItem';

const TaskList = ({
  tasks,
  updateTask,
  deleteTask,
}: {
  tasks: Task[];
  updateTask: (id: string, taskData: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}) => {
  /**Упорядоченный по дате и завершённости массив задач */
  const sortedTasks = tasks.sort((a, b) => {
    const aDate = dayjs(a.targetDate, 'DD.MM.YY');
    const bDate = dayjs(b.targetDate, 'DD.MM.YY');
    if (aDate.isSame(bDate)) {
      if(a.isComplete !== b.isComplete) {
        return a.isComplete ? -1 : 1;
      } else {
        return 0;
      }
    } else {
      return aDate.isBefore(bDate) ? 1 : -1;
    }
  });

  return (
    <div className="tasksContainer">
      {sortedTasks
        .map(task => (
          <TaskItem
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
    </div>
  );
};

export default TaskList;
