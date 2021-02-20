import { QueryInterface, DataTypes } from "sequelize";

/**
 * function that sequelize-cli runs if you want to add this migration to your database
 * */
export async function up(query: QueryInterface): Promise<void> {
  try {
    return query.createTable("users", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        comment: "Id of the instance",
      },
      name: {
        type: new DataTypes.STRING(1024),
        allowNull: false,
        comment: "Name of the user",
      },
      profilePicture: {
        type: new DataTypes.STRING(2048),
        allowNull: true,
      },
      googleId: {
        type: new DataTypes.STRING(4096),
        allowNull: true,
      },
      githubId: {
        type: new DataTypes.STRING(4096),
        allowNull: true,
      },
      email: {
        type: new DataTypes.STRING(),
        allowNull: false,
        unique: true,
      },
      password: {
        type: new DataTypes.STRING(1024),
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "Date of creation",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "Date of the last update",
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
    });
  } catch (e) {
    return Promise.reject(e);
  }
}

/**
 * function that sequelize-cli runs if you want to remove this migration from your database
 * */
export async function down(query: QueryInterface): Promise<void> {
  try {
    return query.dropTable("users");
  } catch (e) {
    return Promise.reject(e);
  }
}
