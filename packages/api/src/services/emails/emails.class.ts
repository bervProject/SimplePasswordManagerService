import { Params } from "@feathersjs/feathers";
import { Service, MemoryServiceOptions } from "feathers-memory";
import Mail from "nodemailer/lib/mailer";
import { Application } from "../../declarations";

export class Emails extends Service {
  transporter: Mail;
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(
    options: Partial<MemoryServiceOptions>,
    app: Application,
    transport: Mail
  ) {
    super(options);
    this.transporter = transport;
  }

  async create(data: Mail.Options, params?: Params) {
    await this.transporter.sendMail(data);
    return await super.create(data, params);
  }

  async _create(data: Mail.Options, params?: Params) {
    await this.transporter.sendMail(data);
    return await super._create(data, params);
  }
}
