import React from 'react';
import { Task } from '../../../utilities/dataTypes';
import { FaFileDownload as DownloadIcon } from 'react-icons/fa';
import { storage } from '../../../../firebase';
import { getDownloadURL, ref } from 'firebase/storage';

const AttachedFiles = ({ task }: { task: Task }) => {
  /**Скачивание файла
   * @param file - относительный путь к файлу внутри хранилища
   */
  const onDownload = (file: string) => {
    getDownloadURL(ref(storage, file))
      .then(url => {
        const link = document.createElement('a');
        if (link.download !== undefined) {
          link.setAttribute('href', url);
          link.setAttribute('target', '_blank');
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      })
      .catch(error => {
        console.log('Ошибка при загрузке файла: ', error);
      });
  };

  return task.attachedFiles.length !== 0 ? (
    <>
      <div className="taskDescriptionItem">Прикреплённые файлы:</div>
      {task.attachedFiles.map(file => (
        <div key={file} className="file" onClick={() => onDownload(file)} >
          <DownloadIcon />
          {file.split('/')[3]}
        </div>
      ))}
    </>
  ) : (
    <></>
  );
};

export default AttachedFiles;