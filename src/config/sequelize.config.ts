/**
 * This file is only here to collect all database environments and give them back
 * for the migration process of the sequelize-cli
 */

import app from "../app";
const env = process.env.NODE_ENV || "development";
const dialect = "postgres"; // Or your dialect name

module.exports = {
  [env]: {
    dialect,
    url: app.get(dialect),
    migrationStorageTableName: "_migrations",
  },
};
