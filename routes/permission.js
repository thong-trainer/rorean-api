const passport = require('passport');
const router = require('express-promise-router')();
const PermissionController = require('../controllers/permission');
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: GET LIST OF RECORDS
Url: /api/v1/permission/<p_school_id>?access_token=<token>
Paramas: p_school_id AS String
Token: required
Method: GET
Example: /api/v1/permission/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/:schoolId').get(PermissionController.index);

/*
NOTE: GET A RECORD
Url: /api/v1/permission/user/<p_user_id>?access_token=<token>
Paramas: p_user_id AS String
Token: required
Method: GET
Example: /api/v1/permission/user/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/user/:userId').get(PermissionController.getItem);

/*
NOTE: UPDATE BY ID
Url: /api/v1/permission/<p_id>?access_token=<token>
Paramas: N/A
Token: required
Method: PUT
Example: /api/v1/permission/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/:id').put(PermissionController.update);

/*
NOTE: ACTIVE RECORD BY ID
Url: /api/v1/permission/active/<p_id>?access_token=<token>
Paramas: p_id AS String
Token: required
Method: PUT
Example: /api/v1/permission/active/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/active/:id').put(PermissionController.active);

/*
NOTE: DESACTIVE RECORD BY ID
Url: /api/v1/permission/desactive/<p_id>?access_token=<token>
Paramas: p_id AS String
Token: required
Method: DELETE
Example: /api/v1/permission/desactive/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/desactive/:id').delete(PermissionController.desactive);

/*
NOTE: INSERT A NEW RECORD
Url: /api/v1/permission?access_token=<token>
Paramas: N/A
Token: required
Method: POST
Example: /api/v1/permission?access_token=123456789
*/
router.route('/').post(PermissionController.create);
/*
=====================================
NOTE POST EXAMPLE
=====================================
{
	"userId": "5b3dd11ea3a3af261a98d3be",
	"schoolId": "5b485c868749b10c0f0edaa1",
	"role": "admin",
	"createdBy": "5b3dd11ea3a3af261a98d3be"
}
=====================================
*/
module.exports = router;
