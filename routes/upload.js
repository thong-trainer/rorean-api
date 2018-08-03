// const passport = require('passport');
const router = require('express-promise-router')();
const UploadController = require('../controllers/upload');
// router.use(passport.authenticate('bearer', { session: false}));



/*
NOTE: INSERT A NEW RECORD
Url: /api/v1/level?access_token=<token>
Paramas: N/A
Token: required
Method: POST
Example: /api/v1/level?access_token=123456789
*/
router.route('/image').post(UploadController.uploadImage);

module.exports = router;
