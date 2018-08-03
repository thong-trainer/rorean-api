const router = require('express-promise-router')();
const UserController = require('../controllers/user');

/*
NOTE: USER LOGIN
Url: /api/v1/user/login
Paramas: N/A
Token: required
Method: PUT
Example: /api/v1/auth/login
*/
router.route('/login').put(UserController.login);

/*
NOTE: INSERT A NEW RECORD
Url: /api/v1/user/register?access_token=<token>
Paramas: N/A
Token: required
Method: POST
Example: /api/v1/auth/register?access_token=123456789
*/
router.route('/register').post(UserController.register);
/*
=====================================
NOTE POST EXAMPLE
=====================================
{
	"username": "ley_kamthong",
  "gender": "Male",
	"telephone": "855-069665533",
	"password": "12345"
}
=====================================
*/
module.exports = router;
