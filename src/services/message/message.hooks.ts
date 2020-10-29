import * as feathersAuthentication from "@feathersjs/authentication";
import hook from "feathers-advance-hook";
import { HookContext } from "@feathersjs/feathers";
const { authenticate } = feathersAuthentication.hooks;
const userAuditHook = hook.userAuditHook;

export default {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [
      userAuditHook(),
      (context: HookContext) => {
        let user = context.params.user;
        context.data.userId = user.id;
        return context;
      },
    ],
    update: [userAuditHook()],
    patch: [userAuditHook()],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
