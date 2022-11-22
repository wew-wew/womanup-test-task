/**
 * @field id идентификатор задачи
 * @field title заголовок
 * @field description описание
 * @field tfieldetDate дата завершения
 * @field attachedFiles список относительных путей к прикреплённым файлам
 * @field isComplete завершена ли задача
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  attachedFiles: string[];
  isComplete: boolean;
}