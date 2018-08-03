const passport = require('passport');
const router = require('express-promise-router')();
const LevelController = require('../controllers/level');
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: GET LIST OF RECORDS
Url: /api/v1/level/<p_school_id>?access_token=<token>
Paramas: p_school_id as String
Token: required
Method: GET
Example: /api/v1/level/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/:schoolId').get(LevelController.index);

/*
NOTE: UPDATE BY ID
Url: /api/v1/level/<p_id>?access_token=<token>
Paramas: N/A
Token: required
Method: PUT
Example: /api/v1/level/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/:id').put(LevelController.update);

/*
NOTE: ACTIVE RECORD BY ID
Url: /api/v1/level/active/<p_id>?access_token=<token>
Paramas: p_id as String
Token: required
Method: PUT
Example: /api/v1/level/active/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/active/:id').put(LevelController.active);

/*
NOTE: DESACTIVE RECORD BY ID
Url: /api/v1/level/desactive/<p_id>?access_token=<token>
Paramas: p_id as String
Token: required
Method: DELETE
Example: /api/v1/level/desactive/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/desactive/:id').delete(LevelController.desactive);

/*
NOTE: INSERT A NEW RECORD
Url: /api/v1/level?access_token=<token>
Paramas: N/A
Token: required
Method: POST
Example: /api/v1/level?access_token=123456789
*/
router.route('/').post(LevelController.create);
/*
=====================================
NOTE POST EXAMPLE
=====================================
{
	"name": "Level 1",
	"description": "Write something here",
	"createdBy": "5b3dd11ea3a3af261a98d3be",
	"schoolId": "5b485c868749b10c0f0edaa1"
}
=====================================
*/
module.exports = router;
