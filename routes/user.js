const passport = require('passport');
const router = require('express-promise-router')();
const UserController = require('../controllers/user');
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: GET LIST OF RECORDS
Url: /api/v1/user/<p_index>/<p_limit>?access_token=<token>
Paramas: p_index as Number, p_limit as Number
Token: required
Method: GET
Example: /api/v1/user/1/10?access_token=123456789
*/
router.route('/:index/:limit').get(UserController.index);

/*
NOTE: GET A RECORD
Url: /api/v1/user?access_token=<token>&status=<query1>&value=<query2>
Query: query1 as String, query2 based on query1
Token: required
Method: GET
Example: /api/v1/user?access_token=123456789&status=telephone&value=855-069665533
*/
router.route('/').get(UserController.get);


module.exports = router;
