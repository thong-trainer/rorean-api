const passport = require('passport');
const router = require('express-promise-router')();
const SchoolController = require('../controllers/school');
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: GET LIST OF RECORDS
Url: /api/v1/school/<p_index>/<p_limit>?access_token=<token>
Paramas: p_index as Number, p_limit as Number
Token: required
Method: GET
Example: /api/v1/school/0/10?access_token=123456789
*/
router.route('/:index/:limit').get(SchoolController.index);

/*
NOTE: GET A RECORD BY ID
Url: /api/v1/school/<p_id>?access_token=<token>
Paramas: p_id AS String
Token: required
Method: GET
Example: /api/v1/school/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/:id').get(SchoolController.getById);

/*
NOTE: UPDATE BY ID
Url: /api/v1/school/<p_id>?access_token=<token>
Paramas: p_id AS String
Token: required
Method: PUT
Example: /api/v1/school/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/:id').put(SchoolController.update);

/*
NOTE: ACTIVE RECORD BY ID
Url: /api/v1/school/active/<p_id>?access_token=<token>
Paramas: p_id AS String
Token: required
Method: PUT
Example: /api/v1/school/active/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/active/:id').put(SchoolController.active);

/*
NOTE: DESACTIVE RECORD BY ID
Url: /api/v1/school/desactive/<p_id>?access_token=<token>
Paramas: p_id AS String
Token: required
Method: DELETE
Example: /api/v1/school/desactive/5b485c868749b10c0f0edaa1?access_token=123456789
*/
router.route('/desactive/:id').delete(SchoolController.desactive);

/*
NOTE: INSERT A NEW RECORD
Url: /api/v1/school/register?access_token=<token>
Paramas: N/A
Token: required
Method: POST
Example: /api/v1/school/register?access_token=123456789
*/
router.route('/register').post(SchoolController.register);
/*
=====================================
NOTE POST EXAMPLE
=====================================
{
	"schoolName": "ANT Training",
	"category": "Computer Science",
	"email": "ant.training@gmail.com",
    "phone": {
        "office": "855-023334556",
        "support": "855-010233488",
        "mobile": "855-012223344"
    },
    "location": {
        "zipCode": 12000,
        "address": "#86B, st 313, Toulkok, Phnom Penh",
        "country": "Cambodia"
    },
    "image": {
        "profileUrl": "http://www.norton-u.com/images/logo/logo_only.png",
        "coverUrl": "http://fedoraproject.org/w/uploads/3/36/Norton.jpg"
    },
    "socialIds": [
        {
            "name": "Facebook",
            "url": "http://facebook.com/norton-u"
        },
        {
            "name": "Website",
            "url": "http://www.norton-u.com/"
        }
    ],
	"description": "ANT is professional programming school.",
	"createdBy": "5b3dd11ea3a3af261a98d3be"
}
=====================================
*/
module.exports = router;
