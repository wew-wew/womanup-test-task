import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase';
import { Task } from './dataTypes';

/**
 * 
 * @param file - файл для загрузки
 * @param task - объект задачи, к которой прикрепляется файл
 * @param updateTask - ссылка на функцию обновления задания
 */
export async function uploadFile(file: File, task: Task, updateTask: (id: string, taskData: Partial<Task>) => void) {
  const arrayBuffer = await Promise.resolve(file?.arrayBuffer());

  if (arrayBuffer) {
    const path = `/files/${task.id}/${file?.name}`;
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, arrayBuffer);

    uploadTask.on(
      'state_changed',
      snapshot => {
        // При необходимости можно обновлять прогресс
      },
      error => console.log('Ошибка при добавлении файла: ', error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          if (!task.attachedFiles.includes(path)) {
            updateTask(task.id, { ...task, attachedFiles: [...task.attachedFiles, path] });
          }
        });
      }
    );
  }
}
