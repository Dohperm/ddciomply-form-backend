const express = require('express');
const router = express.Router()

const { submit, uploadFile, getAllForms, getFormById } = require('../controllers/registration')
const upload = require('../middlewares/multer')
// const validate = require('../middlewares/validate');
// const userSchema = require('../validator/registerSchema');


// router.post('/register', validate(userSchema), register);
router.post('/submit', upload.array('supportingDocuments', 5), submit);
router.post('/upload', upload.array('files', 10), uploadFile);
router.get('/', getAllForms);
router.get('/:id', getFormById);




module.exports = router;