import * as feathersAuthentication from "@feathersjs/authentication";
import * as local from "@feathersjs/authentication-local";
import { HookContext } from "@feathersjs/feathers";
// Don't remove this comment. It's needed to format import lines nicely.
import hook from "feathers-advance-hook";
import { disallow, iff, preventChanges, required } from "feathers-hooks-common";

const { authenticate } = feathersAuthentication.hooks;
const userAuditHook = hook.userAuditHook;
const { hashPassword, protect } = local.hooks;

const hashWhenAvailable = (context: HookContext) => {
  return !!context.data.password;
};

export default {
  before: {
    all: [],
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [
      required("name", "email", "password"),
      hashPassword("password"),
      userAuditHook(),
    ],
    update: [disallow()],
    patch: [
      preventChanges(false, "email", "role"),
      iff(hashWhenAvailable, hashPassword("password")),
      authenticate("jwt"),
      userAuditHook(),
    ],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect("password"),
    ],
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
