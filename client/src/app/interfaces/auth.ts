import { User } from './user';

export interface Auth {
  token: String;
  user: Partial<User>;
}
