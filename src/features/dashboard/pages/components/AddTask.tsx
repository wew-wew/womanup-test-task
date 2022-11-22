import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import dayjs from 'dayjs';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { Task } from '../../../utilities/dataTypes';
import { uploadFile } from '../../../utilities/utilities';

const AddTask = ({ addTaskLocally, updateTask }: { addTaskLocally: (task: Task) => void, updateTask: (id: string, taskData: Partial<Task>) => void }) => {
  const [expand, setExpand] = useState(false);
  const [title, setTitle] = useState('Название задачи');
  const [description, setDescription] = useState('Описание задачи.');
  const [targetDate, setTargetDate] = useState(dayjs().format('DD.MM.YY'));
  const [file, setFile] = useState<File>();

  /**Предотвращение перехода на новую страницу с последующим вызовом функции добавления новой задачи */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFormSubmit = (e: any) => {
    e.preventDefault();
    addTaskToFirebase();
  };

  /**Локальное сохранение файла*/
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  /**Добавление задачи в Firebase и сохранение локальной копии для отображения */
  const addTaskToFirebase = async () => {
    setExpand(false);
    try {
      const newTaskData = { title, description, targetDate, attachedFiles: [], isComplete: false };
      const docRef = await addDoc(collection(db, 'tasks'), newTaskData);

      const task = { ...newTaskData, id: docRef.id };
      addTaskLocally(task);

      if (file) {
        uploadFile(file, task, updateTask);
      }
    } catch (e) {
      console.error('Ошибка добавления новой задачи: ', e);
    }
  };

  /**Подверждение заполнения формы при нажатии клавиши Enter */
  const enterInputListener = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      onFormSubmit(e);
    }
  };

  /**Раскрытие формы добавление новой задачи */
  const onAddTaskExpand = () => {
    if (!expand) {
      setExpand(true);
    }
  };

  return expand ? (
    <form className="addTaskForm" onKeyDown={e => enterInputListener(e)}>
      <div className="taskHeader">Добавление новой задачи</div>
      <div className="newTaskFormHeader">
        <input
          className="formInput"
          placeholder="Название задачи"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div className="flexRowCenter">
          <div>
            Дата завершения:{' '}
            <input
              className="formInput dateField"
              placeholder="Дата"
              type="text"
              value={targetDate}
              onChange={e => setTargetDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <textarea
        className="formInput taskDescriptionItem"
        placeholder="Описание задачи"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div className="flexRowSpaceBetween">
        <button className="button" onClick={addTaskToFirebase}>
          Сохранить задачу
        </button>
        <label htmlFor="filePicker" className="button">
          Прикрепить файл
        </label>
        <input
          id="filePicker"
          style={{ visibility: 'hidden', width: 0, height: 0 }}
          type="file"
          onChange={onSelectFile}
        />
        <button className="button" onClick={() => setExpand(false)}>
          Отмена
        </button>
      </div>
    </form>
  ) : (
    <div className="addTaskButton" onClick={onAddTaskExpand}>
      <div className="flexRowCenter">
        <FaPlusCircle size={20} style={{ marginRight: '5px' }} /> Добавить новую задачу
      </div>
    </div>
  );
};

export default AddTask;
