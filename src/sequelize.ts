import { Sequelize } from "sequelize";
import logger from "./logger";
import { Application } from "./declarations";

export default function (app: Application) {
  const connectionString = process.env.DATABASE_URL || app.get("postgres");
  const sequelize = new Sequelize(connectionString, {
    dialect: "postgres",
    logging: false,
    define: {
      freezeTableName: true,
    },
  });
  const oldSetup = app.setup;

  app.set("sequelizeClient", sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach((name) => {
      if ("associate" in models[name]) {
        (models[name] as any).associate(models);
      }
    });

    // Sync to the database
    sequelize.sync().catch((err: any) => {
      logger.info(JSON.stringify(err));
    });

    return result;
  };
}
