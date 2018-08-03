const passport = require('passport');
const router = require('express-promise-router')();
const ClassroomController = require('../controllers/classroom');
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: GET LIST OF RECORDS
Url: /api/v1/classroom/<p_school_id>/<p_index>/<p_limit>?access_token=<token>
Paramas: p_school_id AS String, p_index as Number, p_limit as Number
Token: required
Method: GET
Example: /api/v1/classroom/5b485c868749b10c0f0edaa1/0/10?access_token=123456789
*/
router.route('/:schoolId/:index/:limit').get(ClassroomController.index);

router.route('/:schoolId/:id').get(ClassroomController.getList);

router.route('/:id').get(ClassroomController.getById);

/*
NOTE: UPDATE BY ID
Url: /api/v1/classroom/<p_id>?access_token=<token>
Paramas: N/A
Token: required
Method: PUT
Example: /api/v1/classroom/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/:id').put(ClassroomController.update);

/*
NOTE: ACTIVE RECORD BY ID
Url: /api/v1/classroom/active/<p_id>?access_token=<token>
Paramas: p_id AS String
Token: required
Method: PUT
Example: /api/v1/classroom/active/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/active/:id').put(ClassroomController.active);

/*
NOTE: DESACTIVE RECORD BY ID
Url: /api/v1/classroom/desactive/<p_id>?access_token=<token>
Paramas: p_id AS String
Token: required
Method: DELETE
Example: /api/v1/classroom/desactive/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/desactive/:id').delete(ClassroomController.desactive);

/*
NOTE: INSERT A NEW RECORD
Url: /api/v1/classroom?access_token=<token>
Paramas: N/A
Token: required
Method: POST
Example: /api/v1/classroom?access_token=123456789
*/
router.route('/').post(ClassroomController.create);


/*
=====================================
NOTE POST CLASSROOM EXAMPLE
=====================================
{
	"name": "optional",
	"schedule": "Mon - Fri",
	"startHour": "13:00:00",
	"endHour": "15:00:00",
  "subjectId": "5b485c868749b10c0f0edaa1",
  "teachBy": "",
  "schoolId": "",
  "roomId": "",
  "status": "opening",
  "description": "optional",
  "startedDate": "01/07/2017",
  "createdBy": "5b3dd11ea3a3af261a98d3be"
}
=====================================
*/
module.exports = router;
