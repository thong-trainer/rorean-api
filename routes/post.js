const passport = require('passport');
const router = require('express-promise-router')();
const PostController = require('../controllers/post');
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: GET LIST OF RECORDS
Url: /api/v1/post/<p_school_id>?access_token=<token>
Paramas: p_school_id as String
Token: required
Method: GET
Example: /api/v1/post/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/:schoolId').get(PostController.index);

/*
NOTE: UPDATE BY ID
Url: /api/v1/post/<p_id>?access_token=<token>
Paramas: N/A
Token: required
Method: PUT
Example: /api/v1/post/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/:id').put(PostController.update);

/*
NOTE: ACTIVE RECORD BY ID
Url: /api/v1/post/active/<p_id>?access_token=<token>
Paramas: p_id as String
Token: required
Method: PUT
Example: /api/v1/post/active/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/active/:id').put(PostController.active);

/*
NOTE: DESACTIVE RECORD BY ID
Url: /api/v1/post/desactive/<p_id>?access_token=<token>
Paramas: p_id as String
Token: required
Method: DELETE
Example: /api/v1/post/desactive/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/desactive/:id').delete(PostController.desactive);

/*
NOTE: INSERT A NEW RECORD
Url: /api/v1/post?access_token=<token>
Paramas: N/A
Token: required
Method: POST
Example: /api/v1/post?access_token=123456789
*/
router.route('/').post(PostController.create);
/*
=====================================
NOTE POST EXAMPLE
=====================================
{
	"name": "post 1",
	"description": "Write something here",
	"createdBy": "5b3dd11ea3a3af261a98d3be",
	"schoolId": "5b485c868749b10c0f0edaa1"
}
=====================================
*/
module.exports = router;
