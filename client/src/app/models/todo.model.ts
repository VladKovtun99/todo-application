import {StatusesEnum} from '../enums/StatusesEnum';

export interface TodoModel {  id: number;
  title: string;
  status: StatusesEnum;
  description: string;
}
