// Initializes the `userpass` service on path `/userpass`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Userpass } from './userpass.class';
import createModel from '../../models/userpass.model';
import hooks from './userpass.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'userpass': Userpass & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/userpass', new Userpass(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('userpass');

  service.hooks(hooks);
}
