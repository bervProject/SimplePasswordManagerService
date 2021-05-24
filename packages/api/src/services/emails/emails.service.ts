// Initializes the `emails` service on path `/emails`
import { ServiceAddons } from "@feathersjs/feathers";
import * as aws from "@aws-sdk/client-ses";
import nodemailer from "nodemailer";
import { Application } from "../../declarations";
import { Emails } from "./emails.class";
import hooks from "./emails.hooks";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emails: Emails & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get("paginate"),
  };
  const ses = new aws.SESClient({
    apiVersion: "2010-12-01",
    region: app.get("sesregion") || "us-east-1",
  });
  const transporter = nodemailer.createTransport({
    SES: { ses, aws },
  });
  // Initialize our service with any options it requires
  app.use("/emails", new Emails(options, app, transporter));

  // Get our initialized service so that we can register hooks
  const service = app.service("emails");

  service.hooks(hooks);
}
