import { IEntity } from '@core/db/interface/IEntity';

export interface ITask extends IEntity {
  email: string;
  text: string;
  userName: string;
  done: boolean;
}
