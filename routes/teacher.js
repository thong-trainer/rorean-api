const passport = require('passport');
const router = require('express')();
const TeacherController = require('../controllers/teacher');
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: GET LIST OF RECORDS
Url: /api/v1/teacher/<p_school_id>/<p_index>/<p_limit>?access_token=<token>
Paramas: p_school_id as String, p_index as Number, p_limit as Number
Token: required
Method: GET
Example: /api/v1/teacher/5b485c868749b10c0f0edaa1/0/10?access_token=123456789
*/
router.route('/:schoolId/:index/:limit').get(TeacherController.index);

/*
NOTE: GET RECORD BY ID
Url: /api/v1/teacher/<p_school_id>/<p_id>?access_token=<token>
Paramas: p_school_id as String, p_id as String (It is user id or teacher id)
Token: required
Method: GET
Example: /api/v1/teacher/5b485c868749b10c0f0edaa1/5b4d550227138d2168d09c00?access_token=123456789
*/
router.route('/:schoolId/:id').get(TeacherController.getById);

/*
NOTE: UPDATE BY ID
Url: /api/v1/teacher/<p_id>?access_token=<token>
Paramas: N/A
Token: required
Method: PUT
Example: /api/v1/teacher/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/:id').put(TeacherController.update);

/*
NOTE: ACTIVE RECORD BY ID
Url: /api/v1/teacher/active/<p_id>?access_token=<token>
Paramas: p_id AS String
Token: required
Method: PUT
Example: /api/v1/teacher/active/5b485c868749b10c0f0e3456?access_token=123456789
*/
router.route('/active/:id').put(TeacherController.active);

/*
NOTE: DESACTIVE RECORD BY ID
Url: /api/v1/teacher/desactive/<p_id>?access_token=<token>
Paramas: p_id AS String
Token: required
Method: DELETE
Example: /api/v1/teacher/desactive/5b485c868749b10c0f0e3456?access_token=123456789
*/
router.route('/desactive/:id').delete(TeacherController.desactive);

/*
NOTE: INSERT A NEW RECORD
Url: /api/v1/teacher?access_token=<token>
Paramas: N/A
Token: required
Method: POST
Example: /api/v1/teacher?access_token=123456789
*/
router.route('/').post(TeacherController.create);
/*
=====================================
NOTE POST EXAMPLE
=====================================
{
  "fullNameKH": "Ley Kamthong KH",
  "fullNameEN": "Ley Kamthong",
  "profileUrl": "person_placeholder",
	"profileUrl": "person_placeholder",
  "userId": "5b3dd11ea3a3af261a98d3be",
  "schoolId": "5b485c868749b10c0f0edaa1",
  "createdBy": "5b3dd11ea3a3af261a98d3be",
  "keywords": [
    "ley  kamthong kh",
    "ley kamthong en",
    "855-012220488"
  ]  
}
=====================================
*/
module.exports = router;
