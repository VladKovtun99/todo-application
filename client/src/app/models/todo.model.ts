import {StatusesEnum} from '../enums/StatusesEnum';

export interface TodoModel {
  id: number | null;
  title: string;
  status: StatusesEnum;
  description: string;
  deadline: Date;
}
