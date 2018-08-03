const passport = require('passport');
const router = require('express-promise-router')();
const RoomController = require('../controllers/room');
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: GET LIST OF RECORDS
Url: /api/v1/room/<p_school_id>?access_token=<token>
Paramas: p_school_id as String
Token: required
Method: GET
Example: /api/v1/room/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/:schoolId').get(RoomController.index);

/*
NOTE: UPDATE BY ID
Url: /api/v1/room/<p_id>?access_token=<token>
Paramas: N/A
Token: required
Method: PUT
Example: /api/v1/room/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/:id').put(RoomController.update);

/*
NOTE: ACTIVE RECORD BY ID
Url: /api/v1/room/active/<p_id>?access_token=<token>
Paramas: p_id as String
Token: required
Method: PUT
Example: /api/v1/room/active/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/active/:id').put(RoomController.active);

/*
NOTE: DESACTIVE RECORD BY ID
Url: /api/v1/room/desactive/<p_id>?access_token=<token>
Paramas: p_id as String
Token: required
Method: DELETE
Example: /api/v1/room/desactive/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/desactive/:id').delete(RoomController.desactive);

/*
NOTE: INSERT A NEW RECORD
Url: /api/v1/room?access_token=<token>
Paramas: N/A
Token: required
Method: POST
Example: /api/v1/room?access_token=123456789
*/
router.route('/').post(RoomController.create);
/*
=====================================
NOTE POST EXAMPLE
=====================================
{
	"name": "Room 201",
	"description": "Write something here",
	"createdBy": "5b3dd11ea3a3af261a98d3be",
	"schoolId": "5b485c868749b10c0f0edaa1"
}
=====================================
*/
module.exports = router;
