const passport = require('passport');
const router = require('express-promise-router')();
const StudentController = require('../controllers/student');
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: GET LIST OF RECORDS
Url: /api/v1/student/<p_school_id>/<p_index>/<p_limit>?access_token=<token>
Paramas: p_school_id as String, p_index as Number, p_limit as Number
Token: required
Method: GET
Example: /api/v1/student/5b485c868749b10c0f0edaa1/0/10?access_token=123456789
*/
router.route('/:schoolId/:index/:limit').get(StudentController.index);

/*
NOTE: GET RECORD BY ID
Url: /api/v1/student/<p_school_id/<p_id>?access_token=<token>
Paramas: p_school_id as String, p_id as String (It is user id or student id)
Token: required
Method: GET
Example: /api/v1/student/5b485c868749b10c0f0edaa1/5b4d550227138d2168d09c00?access_token=123456789
*/
router.route('/:schoolId/:id').get(StudentController.getById);

/*
NOTE: GET RECORD BY ID
Url: /api/v1/student/>?access_token=<token>&ids=<q_array_ids>
Paramas: ids as String (it's split by comma ',')
Token: required
Method: GET
Example: /api/v1/student?access_token=123456789&array_ids=5b4d550227138d2168d09c00,5b54676f6a1ff115eb1753e6
*/
router.route('/').get(StudentController.getList);

/*
NOTE: GET LIST OF RECORDS
Url: /api/v1/student/<p_school_id>/<p_index>/<p_limit>/<p_search>?access_token=<token>
Paramas: p_school_id as String, p_index as Number, p_limit as Number, p_search as String
Token: required
Method: GET
Example: /api/v1/student/5b485c868749b10c0f0edaa1/0/10/kamthong?access_token=123456789
*/
router.route('/:schoolId/:index/:limit/:search').get(StudentController.search);

/*
NOTE: UPDATE BY ID
Url: /api/v1/student/<p_id>?access_token=<token>
Paramas: N/A
Token: required
Method: PUT
Example: /api/v1/student/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/:id').put(StudentController.update);

/*
NOTE: ACTIVE RECORD BY ID
Url: /api/v1/student/active/<p_id>?access_token=<token>
Paramas: p_id as String
Token: required
Method: PUT
Example: /api/v1/student/active/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/active/:id').put(StudentController.active);

/*
NOTE: DESACTIVE RECORD BY ID
Url: /api/v1/student/desactive/<p_id>?access_token=<token>
Paramas: p_id as String
Token: required
Method: DELETE
Example: /api/v1/student/desactive/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/desactive/:id').delete(StudentController.desactive);

/*
NOTE: INSERT A NEW RECORD
Url: /api/v1/student?access_token=<token>
Paramas: N/A
Token: required
Method: POST
Example: /api/v1/student?access_token=123456789
*/
router.route('/').post(StudentController.create);

/*
=====================================
NOTE POST EXAMPLE
=====================================
{
	"fullNameKH": "Ley Kamthong KH",
	"fullNameEN": "Ley Kamthong",
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
