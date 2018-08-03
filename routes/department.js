const passport = require('passport');
const router = require('express-promise-router')();
const DepartmentController = require('../controllers/department');
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: GET LIST OF RECORDS
Url: /api/v1/department/<p_school_id>?access_token=<token>
Paramas: p_school_id AS String
Token: required
Method: GET
Example: /api/v1/department/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/:schoolId').get(DepartmentController.index);

router.route('/id/:id').get(DepartmentController.getById);

/*
NOTE: UPDATE BY ID
Url: /api/v1/department/<p_id>?access_token=<token>
Paramas: N/A
Token: required
Method: PUT
Example: /api/v1/department/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/:id').put(DepartmentController.update);

/*
NOTE: ACTIVE RECORD BY ID
Url: /api/v1/department/active/<p_id>?access_token=<token>
Paramas: p_id AS String
Token: required
Method: PUT
Example: /api/v1/department/active/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/active/:id').put(DepartmentController.active);

/*
NOTE: DESACTIVE RECORD BY ID
Url: /api/v1/department/desactive/<p_id>?access_token=<token>
Paramas: p_id AS String
Token: required
Method: DELETE
Example: /api/v1/department/desactive/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/desactive/:id').delete(DepartmentController.desactive);

/*
NOTE: INSERT A NEW RECORD
Url: /api/v1/department?access_token=<token>
Paramas: N/A
Token: required
Method: POST
Example: /api/v1/department?access_token=123456789
*/
router.route('/').post(DepartmentController.create);
/*
=====================================
NOTE POST EXAMPLE
=====================================
{
	"name": "Computer Science",
	"description": "Write something here",
	"createdBy": "5b3dd11ea3a3af261a98d3be",
	"schoolId": "5b485c868749b10c0f0edaa1"
}
=====================================
*/
module.exports = router;
