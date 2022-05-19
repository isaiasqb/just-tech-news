const User = require('./User');
const Post = require('./Post');

// create association between models User & Post
User.hasMany(Post, {
  foreignKey: 'user_id'    //user_id is the name of the property as defined in the Post table
});

Post.belongsTo(User, {
  foreignKey: 'user_id',   //user_id in the post model
});

module.exports = { User, Post };