import { Application } from '../declarations';
import users from './users/users.service';
import message from './message/message.service';
export default function (app: Application) {
  app.configure(users);
  app.configure(message);
};
