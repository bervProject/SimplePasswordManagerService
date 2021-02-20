import { Params } from "@feathersjs/feathers";
import { Service, MemoryServiceOptions } from "feathers-memory";
import Mail from "nodemailer/lib/mailer";
import { Application } from "../../declarations";

export class Emails extends Service {
  transporter: Mail;
  constructor(
    options: Partial<MemoryServiceOptions>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app: Application,
    transport: Mail,
  ) {
    super(options);
    this.transporter = transport;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(data: Mail.Options, params?: Params): Promise<any> {
    await this.transporter.sendMail(data);
    return await super.create(data, params);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async _create(data: Mail.Options, params?: Params): Promise<any> {
    await this.transporter.sendMail(data);
    return await super._create(data, params);
  }
}
