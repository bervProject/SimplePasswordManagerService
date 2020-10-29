// Initializes the `message` service on path `/message`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { Messages } from "./message.class";
import createModel from "../../models/message.model";
import hooks from "./message.hooks";

declare module "../../declarations" {
  interface ServiceTypes {
    messages: Messages & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/messages", new Messages(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("messages");

  service.hooks(hooks);
}
