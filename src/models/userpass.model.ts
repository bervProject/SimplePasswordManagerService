// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from "sequelize";
import { Application } from "../declarations";
import { HookReturn } from "sequelize/types/lib/hooks";

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get("sequelizeClient");
  const userpass = sequelizeClient.define(
    "userpass",
    {
      email: {
        type: DataTypes.STRING(566),
        allowNull: false,
      },
      password: { type: DataTypes.STRING(4096), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      siteUrl: { type: DataTypes.STRING(2048), allowNull: false },
      category: { type: DataTypes.STRING(566), allowNull: false },
      createdBy: { type: DataTypes.STRING(1024), allowNull: false },
      updatedBy: {
        type: DataTypes.STRING(1024),
        allowNull: true,
      },
    },
    {
      hooks: {
        beforeCount(options: any): HookReturn {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (userpass as any).associate = function (models: any): void {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    userpass.belongsTo(models.users);
  };

  return userpass;
}
