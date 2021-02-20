// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes } from "sequelize";
import { Application } from "../declarations";

export default function (app: Application) {
  const sequelizeClient: Sequelize = app.get("sequelizeClient");
  const users = sequelizeClient.define(
    "users",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      profilePicture: {
        type: DataTypes.STRING(2048),
        allowNull: true,
      },
      googleId: {
        type: DataTypes.STRING(4096),
        allowNull: true,
      },
      githubId: {
        type: DataTypes.STRING(4096),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deletedFlag: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line no-unused-vars
  (users as any).associate = function (models: any) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    users.hasMany(models.userpass);
  };

  return users;
}
