// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, ModelCtor, Model, Optional } from "sequelize";
import { Application } from "../declarations";

export interface IUserAttribute {
  id: string;
  name: string;
  profilePicture: string | null;
  googleId: string | null;
  githubId: string | null;
  email: string;
  password: string;
  role: string;
  createdBy: string;
  updatedBy: string | null;
  deletedFlag: boolean;
  deletedAt: Date;
}

export type IUserAttributeCreation = Optional<IUserAttribute, "id">;

export default function (
  app: Application,
): ModelCtor<Model<IUserAttribute, IUserAttributeCreation>> {
  const sequelizeClient: Sequelize = app.get("sequelizeClient");
  const users = sequelizeClient.define<
    Model<IUserAttribute, IUserAttributeCreation>
  >(
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        beforeCount(options: any): void {
          options.raw = true;
        },
      },
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (users as any).associate = function (models: any) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    users.hasMany(models.userpass);
  };

  return users;
}
