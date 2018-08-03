const passport = require('passport');
const router = require('express-promise-router')();
const SubjectController = require('../controllers/subject');
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: GET LIST OF RECORDS
Url: /api/v1/subject/<p_school_id>/<p_index>/<p_limit>?access_token=<token>
Paramas: p_school_id as String, p_index as Number, p_limit as Number
Token: required
Method: GET
Example: /api/v1/subject/5b485c868749b10c0f0edaa1/0/10?access_token=123456789
*/
router.route('/:schoolId/:index/:limit').get(SubjectController.index);

router.route('/:id').get(SubjectController.getById);

/*
NOTE: UPDATE BY ID
Url: /api/v1/subject/<p_id>?access_token=<token>
Paramas: N/A
Token: required
Method: PUT
Example: /api/v1/subject/5b485c868749b10c0f0e3456?access_token=123456789
*/
router.route('/:id').put(SubjectController.update);

/*
NOTE: ACTIVE RECORD BY ID
Url: /api/v1/subject/active/<p_id>?access_token=<token>
Paramas: p_id as String
Token: required
Method: PUT
Example: /api/v1/subject/active/5b485c868749b10c0f0e3456?access_token=123456789
*/
router.route('/active/:id').put(SubjectController.active);

/*
NOTE: DESACTIVE RECORD BY ID
Url: /api/v1/subject/desactive/<p_id>?access_token=<token>
Paramas: p_id as String
Token: required
Method: DELETE
Example: /api/v1/subject/desactive/5b485c868749b10c0f0e3456?access_token=123456789
*/
router.route('/desactive/:id').delete(SubjectController.desactive);

/*
NOTE: INSERT A NEW RECORD
Url: /api/v1/subject?access_token=<token>
Paramas: N/A
Token: required
Method: POST
Example: /api/v1/subject?access_token=123456789
*/
router.route('/').post(SubjectController.create);

/*
NOTE: INSERT A NEW RECORD
Url: /api/v1/subject/<p_subject_id>/lesson?access_token=<token>
Paramas: p_subject_id as String
Token: required
Method: POST
Example: /api/v1/subject/5b485c868749b10c0f0e3456/lesson?access_token=123456789
*/
router.route('/:subjectId/lesson').post(SubjectController.insertLesson);

/*
NOTE: UPDATE A RECORD
Url: /api/v1/subject/<p_subject_id>/lesson>?access_token=<token>
Paramas: p_subject_id as String
Token: required
Method: PUT
Example: /api/v1/subject/5b485c868749b10c0f0e3456/lesson?access_token=123456789
*/
router.route('/:subjectId/lesson').put(SubjectController.updateLesson);

/*
NOTE: REMOVE A RECORD
Url: /api/v1/subject/<p_subject_id>/lesson>?access_token=<token>
Paramas: p_subject_id as String
Token: required
Method: DELETE
Example: /api/v1/subject/5b485c868749b10c0f0e3456/lesson?access_token=123456789
*/
router.route('/:subjectId/lesson/:lessonId').delete(SubjectController.removeLesson);

/*
=====================================
NOTE POST LESSON EXAMPLE
=====================================
{
	"_id": "5b56c5fa2284ed17ba95d94a",
	"name": "Introduction",
	"documentUrl": "855-069665533"
}
=====================================
*/

/*
=====================================
NOTE POST SUBJECT EXAMPLE
=====================================
{
	"title": "C Programming",
	"subtitle1": "Mon - Fri: 1Month 24Days (1h 30min per day)",
	"subtitle2": "Sat - Sun: 3Month 21Days (2h per day)",
	"duration": 60,
	"price": 59,
	"description": "This course is for students of the Faculty of Computer Science, Computer Science or Computer Engineering Year 1 or 2 and want to take the Programming skills.",
	"requirement": "can use some internet and e-mail",
	"lessions": [
		{
			"name": "Introduction",
			"documentUrl": "https://www.tutorialspoint.com/cprogramming/index.htm"
		},
		{
			"name": "Variables & Data Types",
			"documentUrl": "https://www.tutorialspoint.com/cprogramming/c_variables.htm"
		},
		{
			"name": "Operators & Control Statements",
			"documentUrl": "https://www.tutorialspoint.com/cprogramming/c_loops.htm"
		},
		{
			"name": "Arrays & Loops",
			"documentUrl": "https://www.tutorialspoint.com/cprogramming/c_operators.htm"
		},
		{
			"name": "Classes & Functions",
			"documentUrl": "https://www.tutorialspoint.com/cprogramming/c_functions.htm"
		}
	],
	"levelId": "5b4c9e90ced4f119357057c6",
	"departmentId": "5b4cac1842ad2d1b5e4e5202",
	"schoolId": "5b485c868749b10c0f0edaa1",
	"createdBy": "5b3dd11ea3a3af261a98d3be"
}
=====================================
*/
module.exports = router;
