import { Application } from "../declarations";
import users from "./users/users.service";
import userpass from "./userpass/userpass.service";
import emails from "./emails/emails.service";
export default function (app: Application): void {
  app.configure(users);
  app.configure(userpass);
  app.configure(emails);
}
