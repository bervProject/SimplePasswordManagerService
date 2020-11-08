import Sequelize from "sequelize";
import app from "../app";
const sequelize = app.get("sequelizeClient");
const models = sequelize.models;

// The export object must be a dictionary of model names -> models
// It must also include sequelize (instance) and Sequelize (constructor) properties
export default Object.assign(
  {
    Sequelize,
    sequelize,
  },
  models
);
