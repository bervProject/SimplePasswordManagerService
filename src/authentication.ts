import { ServiceAddons, Params } from "@feathersjs/feathers";
import {
  AuthenticationService,
  JWTStrategy,
  AuthenticationResult,
} from "@feathersjs/authentication";
import { LocalStrategy } from "@feathersjs/authentication-local";
import {
  expressOauth,
  OAuthProfile,
  OAuthStrategy,
} from "@feathersjs/authentication-oauth";
import { Application } from "./declarations";
import logger from "./logger";

declare module "./declarations" {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}

class MyAuthenticationService extends AuthenticationService {
  async getPayload(authResult: AuthenticationResult, params: Params) {
    // Call original `getPayload` first
    const payload = await super.getPayload(authResult, params);
    const { user } = authResult;

    return Object.assign(payload, {
      userId: user.id,
      role: user.role,
      roles: user.role,
    });
  }
}

class GoogleStrategy extends OAuthStrategy {
  async getEntityData(profile: OAuthProfile, existing: any, params: Params) {
    // this will set 'googleId'
    params.provider = undefined;
    const baseData = await super.getEntityData(profile, existing, params);
    // this will grab the picture and email address of the Google profile
    return {
      ...baseData,
      name: profile.name,
      profilePicture: profile.picture,
      email: profile.email,
    };
  }

  async getEntityQuery(profile: OAuthProfile, params: Params) {
    let query = {
      $or: [
        { [`${this.name}Id`]: profile.sub || profile.id },
        { email: profile.email },
      ],
    };
    logger.info(`Querying ${JSON.stringify(query)}`);
    return query;
  }

  async createEntity(profile: OAuthProfile, params: Params) {
    // params.
    await super.createEntity(profile, params);
  }
}

export default (app: Application) => {
  const authentication = new MyAuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());
  authentication.register("google", new GoogleStrategy());

  app.use("/authentication", authentication);
  app.configure(expressOauth());
};
