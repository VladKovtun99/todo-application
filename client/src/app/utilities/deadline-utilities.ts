import {TodoModel} from '../models/todo.model';

export function isDeadlineNear(todo: TodoModel): boolean {
  if (!todo.deadline) return false;

  const deadline = new Date(todo.deadline);
  const today = new Date();

  deadline.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const timeDiff = deadline.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return daysDiff <= 3 && daysDiff > 0;
}

export function isDeadlinePast(todo: TodoModel): boolean {
  if (!todo.deadline) return false;

  const deadline = new Date(todo.deadline);
  const today = new Date();

  deadline.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return deadline < today && todo.status !== 3;
}

export function isDeadlineToday(todo: TodoModel): boolean {
  if (!todo.deadline) return false;

  const deadline = new Date(todo.deadline);
  const today = new Date();

  deadline.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return deadline.getTime() === today.getTime() && todo.status !== 3;
}
