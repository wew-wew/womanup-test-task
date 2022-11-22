import React from 'react';
import { Task } from '../../../utilities/dataTypes';
import { uploadFile } from '../../../utilities/utilities';

const FileUploadButton = ({ task, updateTask }: { task: Task, updateTask: (id: string, taskData: Partial<Task>) => void; }) => {
  /**Загрузка файла в Firebase */
  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      uploadFile(e.target.files[0], task, updateTask);
    }
  };

  return (
    <form className="flexRowSpaceBetween">
      <label htmlFor="filePicker" className="button">
        Прикрепить файл
      </label>
      <input id="filePicker" style={{ visibility: 'hidden' }} type="file" onChange={onUpload} />
    </form>
  );
};

export default FileUploadButton;
