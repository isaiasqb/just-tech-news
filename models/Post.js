// import the connection to MySQL we stored in the connection.js file
const { Model, DataTypes } = require('sequelize');

// import Model and Datatypes from the sequelize package.
const sequelize = require('../config/connection')

// defining the Post model
class Post extends Model {}

Post.init(
  // FIRST PARAMETER - defining the Post schema
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {  //Validation that this url is a verified link.
        isURL:true
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: { //Establish the relationship between this Post and the User 
        model: 'user',
        key: 'id'
      }
    }
  },
    // SECOND PARAMETER - defining the metadata and naming conventions
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);


// export expression to make the Post model accessible to other parts of the application
module.exports = Post;