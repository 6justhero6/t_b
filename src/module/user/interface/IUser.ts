import { IEntity } from '@core/db/interface/IEntity';

export interface IUser extends IEntity {
  login: string;
  hashedPassword: string;
}
