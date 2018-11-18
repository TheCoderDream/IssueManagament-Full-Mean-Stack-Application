const express = require('express');
const {body} = require('express-validator/check');

const router = express.Router();

const issueController = require('../controllers/issue');
const isAuth = require('../middleware/is-auth');


router.get('/', isAuth, issueController.getIssues);

router.post(
    '/',
    isAuth,
    [
        body('title').trim().isLength({min: 5}),
        body('description').isLength({min: 10}),
    ],
    issueController.postIssue);

router.get('/:issueId', isAuth, issueController.getIssue);

router.put('/:issueId', isAuth, issueController.updateIssue);

router.delete('/:issueId', isAuth, issueController.deleteIssue);

module.exports = router;
