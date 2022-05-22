/* This file will contain all of the user-facing routes, 
such as the homepage and login page.*/
const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage', {
    id: 1,
    post_url: 'https://handlebarsjs.com/guide/',
    title: 'Handlebars Docs',
    created_at: new Date(),
    vote_cout: 10,
    comments: [{}, {}],
    user: {
      username: 'test_user'
    }
  }); //the .handlebars extension is implied\
});

module.exports = router;
