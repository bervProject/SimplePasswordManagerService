// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model, ModelCtor, Optional } from "sequelize";
import { Application } from "../declarations";

export interface UserPassAttribute {
  id: string;
  email: string;
  password: string;
  description: string | null;
  siteUrl: string;
  category: string;
  createdBy: string;
  updatedBy: string | null;
}

export type UserPassCreationAttribute = Optional<UserPassAttribute, "id">;

export default function (
  app: Application,
): ModelCtor<Model<UserPassAttribute, UserPassCreationAttribute>> {
  const sequelizeClient: Sequelize = app.get("sequelizeClient");
  const userpass = sequelizeClient.define<
    Model<UserPassAttribute, UserPassCreationAttribute>
  >(
    "userpass",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        beforeCount(options: any): void {
          options.raw = true;
        },
      },
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (userpass as any).associate = function (models: any): void {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    userpass.belongsTo(models.users);
  };

  return userpass;
}
