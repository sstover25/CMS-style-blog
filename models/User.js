const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections");
const bcrypt = require("bcrypt");

// Creating the User model
class User extends Model {
  // checks the user's entered password against the database record
  checkPass(loginPass) {
    return bcrypt.compareSync(loginPass, this.password);
  }
}

// User table and configuration
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5],
      },
    },
  },
  {
    hooks: {
      // hash the user's password upon signup
      async signUpPassword(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // hash the user's password upon update
      async changePass(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports.User;
