var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const register = require('../controllers/login.controller');

// router.get('/register', register.signup);
// router.get('/list', register.signuplist);
router.post('/register', register.signup_create);
router.post('/login', register.login);
router.post ('/addData', verifyToken , register.create_item);
router.get('/itemList', verifyToken, register.getItems);
router.put('/editItem/:id', verifyToken, function(req, res){
  register.editItemById
});

// router.post ('/data', verifyToken , register.create_user);
// router.get('/register/:id', register.getbyid);
// router.put('/register/:id', register.updateuser);
// router.delete('/register/:id', register.deleteuser);
// router.post('/feeds', register.feedscreate);
// router.get('/feeds/:name', register.getfeeds);
// router.post('/followers', register.followers);kill -2 `pgrep mongo`

function verifyToken(req, res, next) {
    // Get auth header value
    console.log('header ' + JSON.stringify(req.headers))
    const bearerHeader = req.headers.authorization;
    // Check if bearer is undefined
    console.log ('bearerHeader ' + bearerHeader)
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      console.log(bearer)
      // Get token from array
      const bearerToken = bearer[1];
      console.log(bearerToken)
      // Set the token
      req.token = bearerToken;

      console.log('bearer ' + bearer);
      console.log('bearerToken ' + bearerToken);
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }


module.exports = router;