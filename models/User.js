const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
  // USE bcrypt.compareSync method to run on instance data (per user) to check password
  checkPAssword(loginPw) { //loginPw === will equal req.body.password (the one entered by the user when loging in
    return bcrypt.compareSync(loginPw, this.password)
  }
}

// define table columns and configuration
User.init(
  { // TABLE COLUMN DEFINITIONS GO HERE
    // define an id column
    id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true
    },
    // define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
     // define an email column
     email: {
      type: DataTypes.STRING,
      allowNull: false,
      // there cannot be any duplicate email values in this table
      unique: true,
      // if allowNull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true
      }
    },
    // define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least four characters long
        len: [4]
      }
    }
  }, //end of first object fromm .init()

  {
    hooks:{
      // set up beforeCreate lifecycle "hook" functionality  
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10)
          return newUserData
        },
      // set up beforeUpdate lifecycle "hook" functionality - When users UPDATE their password info
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
        }
      },
    
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
    sequelize, // pass in our imported sequelize connection (the direct connection to our database)
    timestamps: false,      // don't automatically create createdAt/updatedAt timestamp fields
    freezeTableName: true,  // don't pluralize name of database table
    underscored: true,      // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    modelName: 'user'       // make it so our model name stays lowercase in the database
  }
);

module.exports = User;