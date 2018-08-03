const passport = require('passport');
const router = require('express-promise-router')();
const CommentController = require('../controllers/comment');
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: GET LIST OF RECORDS
Url: /api/v1/comment/<p_school_id>/<p_index>/<p_limit>?access_token=<token>
Paramas: p_school_id as String, p_index as Number, p_limit as Number
Token: required
Method: GET
Example: /api/v1/comment/5b485c868749b10c0f0edaa1/0/10?access_token=123456789
*/
router.route('/:discussionId/:index/:limit').get(CommentController.index);

/*
NOTE: UPDATE BY ID
Url: /api/v1/comment/<p_id>?access_token=<token>
Paramas: N/A
Token: required
Method: PUT
Example: /api/v1/comment/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/:id').put(CommentController.update);

/*
NOTE: ACTIVE RECORD BY ID
Url: /api/v1/comment/active/<p_id>?access_token=<token>
Paramas: p_id as String
Token: required
Method: PUT
Example: /api/v1/comment/active/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/active/:id').put(CommentController.active);

/*
NOTE: DESACTIVE RECORD BY ID
Url: /api/v1/comment/desactive/<p_id>?access_token=<token>
Paramas: p_id as String
Token: required
Method: DELETE
Example: /api/v1/comment/desactive/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/desactive/:id').delete(CommentController.desactive);

/*
NOTE: INSERT A NEW RECORD
Url: /api/v1/comment?access_token=<token>
Paramas: N/A
Token: required
Method: POST
Example: /api/v1/comment?access_token=123456789
*/
router.route('/').post(CommentController.create);
/*
=====================================
NOTE POST EXAMPLE
=====================================
{
	"name": "comment 1",
	"description": "Write something here",
	"createdBy": "5b3dd11ea3a3af261a98d3be",
	"schoolId": "5b485c868749b10c0f0edaa1"
}
=====================================
*/
module.exports = router;
