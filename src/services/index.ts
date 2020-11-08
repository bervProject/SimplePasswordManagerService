import { Application } from "../declarations";
import users from "./users/users.service";
import userpass from "./userpass/userpass.service";
export default function (app: Application) {
  app.configure(users);
  app.configure(userpass);
}
