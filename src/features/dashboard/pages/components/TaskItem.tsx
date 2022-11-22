import React, { useState } from 'react';
import {
  FaEdit as EditIcon,
  FaRegCheckCircle as CompleteIcon,
  FaRegCircle as IncompleteIcon,
  FaTimesCircle as DeleteIcon,
  FaArrowCircleDown as ExpandIcon,
  FaArrowCircleUp as CollapseIcon,
} from 'react-icons/fa';
import dayjs from 'dayjs';
import { Task } from '../../../utilities/dataTypes';
import FileUploadButton from './FileUploadButton';
import AttachedFiles from './AttachedFiles';

const TaskItem = ({
  task,
  updateTask,
  deleteTask,
}: {
  task: Task;
  updateTask: (id: string, taskData: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}) => {
  const [editMode, setEditMode] = useState(false);
  const [expand, setExpand] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [targetDate, setTargetDate] = useState(task.targetDate);

  const CompletionIcon = () => {
    return task.isComplete ? (
      <CompleteIcon className="completeIcon" size={20} onClick={changeCompletionStatus} />
    ) : (
      <IncompleteIcon className="icon marginRight5" size={20} onClick={changeCompletionStatus} />
    );
  };

  const ExpandCollapseIcon = () => {
    return expand ? (
      <CollapseIcon size={20} className="expandCollapseIcon icon marginRight5" onClick={() => setExpand(false)} />
    ) : (
      <ExpandIcon size={20} className="expandCollapseIcon icon marginRight5" onClick={() => setExpand(true)} />
    );
  };

  /**Переключение режима редактирования задачи */
  const SwitchEditModeIcon = () => {
    if (editMode) {
      onEditTask();
    } else {
      setEditMode(true);
      setExpand(true);
    }
  };

  const EditDeleteIcons = () => {
    return (
      <div className="flexRowCenter">
        <EditIcon className="icon marginRight5" size={20} onClick={SwitchEditModeIcon} />
        <DeleteIcon className="icon" size={20} onClick={onDeleteClick} />
      </div>
    );
  };

  /**Удаление задачи */
  const onDeleteClick = () => {
    deleteTask(task.id);
  };

  /**Сохранение отредактированной задачи */
  const onEditTask = () => {
    setEditMode(false);
    const editedTask: Task = {
      id: task.id,
      title,
      description,
      targetDate,
      attachedFiles: task.attachedFiles,
      isComplete: task.isComplete,
    };
    updateTask(task.id, editedTask);
  };

  /**Проверка на истечение даты завершения */
  const dateExpired = () => {
    return dayjs().isAfter(dayjs(task.targetDate, 'DD.MM.YY'));
  };

  /**Подтверждение редактирования задачи нажатием клавиши Enter */
  const enterInputListener = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      onEditTask();
    }
  };

  /**Изменение статуса выполнения задачи */
  const changeCompletionStatus = () => {
    updateTask(task.id, { ...task, isComplete: !task.isComplete });
  };

  return (
    <>
      {editMode ? (
        <form className="taskItem" onSubmit={onEditTask} onKeyDown={event => enterInputListener(event)}>
          <div className="taskHeader">
            <div className="alignItemsCenter">
              <CompletionIcon />
              <input
                className="formInput"
                placeholder="Название задачи"
                type="text"
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
            </div>
            <div className="flexRowCenter">
              <div>
                <input
                  className="formInput dateField"
                  placeholder="Дата"
                  type="text"
                  value={targetDate}
                  onChange={event => setTargetDate(event.target.value)}
                />
              </div>
              <EditDeleteIcons />
            </div>
          </div>
          <textarea
            className="formInput taskDescriptionItem"
            placeholder="Описание задачи"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <AttachedFiles task={task} />
        </form>
      ) : (
        <div
          className="taskItem"
          onDoubleClick={() => {
            setEditMode(true);
            setExpand(true);
          }}
        >
          <div className="taskHeader">
            <div className="alignItemsCenter">
              <CompletionIcon />
              <ExpandCollapseIcon />
              {task.title}
            </div>
            <div className="flexRowCenter">
              <div className={'marginRight5' + (dateExpired() && !task.isComplete ? ' dateExpired' : '')}>{task.targetDate}</div>
              <EditDeleteIcons />
            </div>
          </div>
          {expand ? (
            <>
              <div className="taskDescriptionItem">{task.description}</div>
              <AttachedFiles task={task} />
              <FileUploadButton task={task} updateTask={updateTask} />
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default TaskItem;
