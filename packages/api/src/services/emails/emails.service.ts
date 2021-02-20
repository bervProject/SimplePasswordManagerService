// Initializes the `emails` service on path `/emails`
import { ServiceAddons } from "@feathersjs/feathers";
import aws from "aws-sdk";
import nodemailer from "nodemailer";
import { Application } from "../../declarations";
import { Emails } from "./emails.class";
import hooks from "./emails.hooks";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    emails: Emails & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  aws.config.update({ region: "us-east-1" });
  const options = {
    paginate: app.get("paginate"),
  };

  let transporter = nodemailer.createTransport({
    SES: new aws.SES(),
  });
  // Initialize our service with any options it requires
  app.use("/emails", new Emails(options, app, transporter));

  // Get our initialized service so that we can register hooks
  const service = app.service("emails");

  service.hooks(hooks);
}
