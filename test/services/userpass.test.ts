import app from '../../src/app';

describe('\'userpass\' service', () => {
  it('registered the service', () => {
    const service = app.service('userpass');
    expect(service).toBeTruthy();
  });
});
